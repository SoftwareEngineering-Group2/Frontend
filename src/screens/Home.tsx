import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Animated, TextInput, NativeEventEmitter, NativeSyntheticEvent, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Import icons from expo
import { NativeScrollEvent } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { useAuthentication } from '../hooks/useAuth';
import { getAllDevices } from '../api/deviceService';


interface Device {
  id: number;
  name: string;
  status: string;
}

const Home = ({ navigation }: { navigation: NavigationProp<any, any> }) => {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await getAllDevices();
        const apiDevices = response.allDevices;

        const mappedDevices: Device[] =
          apiDevices.map((apiDevice: { id: string; deviceName: string; deviceState: string }) => {

            let status: string;
            if (apiDevice.deviceName === 'door' || apiDevice.deviceName === 'window') {
              status = apiDevice.deviceState === 'true' ? 'Open' : 'Closed';
            } else {
              status = apiDevice.deviceState === 'true' ? 'On' : 'Off';
            }

            return {
              id: Number(apiDevice.id),
              name: apiDevice.deviceName,
              status: status,
            };
          });

        setDevices(mappedDevices);
      } catch (error) {
        console.error('Error fetching devices:', error);
      }
    };

    fetchDevices();
  }, []);

  const { user } = useAuthentication();

  // Detect screen width
  const windowWidth = Dimensions.get('window').width;

  // Calculate number of columns based on screen width
  const numColumns = windowWidth > 600 ? 2 : 1;

  const cardWidth = 1075 / numColumns;

  const [showMenu, setShowMenu] = useState(false);
  const [scrollY] = useState(new Animated.Value(0));
  const [searchQuery, setSearchQuery] = useState('');

  const handleControlUnitPress = () => {
    // Functionality for controlling unit
    console.log('Control Unit pressed');
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleMenuItemPress = (menuItem: string) => {
    console.log('Menu item pressed:', menuItem);
    if (menuItem === 'Profile') {
      navigation.navigate('profile');
    } else if (menuItem === 'Home') {
      navigation.navigate('Home');
    } else if (menuItem === 'Settings') {
      navigation.navigate('settings');
    } else {
      toggleMenu();
    }
  };


  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    scrollY.setValue(offsetY);
  };

  const menuTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [20, -80],
    extrapolate: 'clamp',
  });

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    // Perform search/filtering functionality here
    console.log('Search Query:', text);
  };

  const handleSignOut = () => {
    FIREBASE_AUTH.signOut()
    navigation.navigate("/start")
  }

  const filteredDevices = devices.filter(device =>
    device.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      onScroll={handleScroll}
      scrollEventThrottle={16}
    >
      <View style={styles.container}>
        <Text>Welcome {user?.email}!</Text>
        <Animated.View style={[styles.menuButton, { transform: [{ translateY: menuTranslateY }] }]}>
          <TouchableOpacity onPress={toggleMenu}>
            <AntDesign name="menuunfold" size={24} color="black" />
          </TouchableOpacity>
        </Animated.View>
        <Text style={styles.heading}>Devices</Text>
        <TextInput
          style={[styles.searchBar]}
          placeholder="Search Devices"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <View style={styles.cardsContainer}>
          {filteredDevices.map(devices => (
            <View key={devices.id} style={[styles.card, { width: cardWidth }]}>
              <View style={styles.imagePlaceholder} />
              <Text style={styles.name}>{devices.name}</Text>
              <Text>Status: {devices.status}</Text>
              <TouchableOpacity onPress={handleControlUnitPress} style={styles.controlUnitButton}>
                <Text style={styles.controlUnitText}>Control Unit</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>       
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    position: 'relative',
    width: '100%', // or use flexGrow: 1
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '60%'
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#ccc',
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  controlUnitButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  controlUnitText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  menuButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 5,
    zIndex: 1,
    position: 'absolute',
    top: 65,
    left: 40,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  searchBar: {
    width: '40%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});


















