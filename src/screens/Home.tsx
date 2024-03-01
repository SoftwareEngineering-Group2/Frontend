import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Animated, TextInput, NativeEventEmitter,NativeSyntheticEvent, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Import icons from expo
import { NativeScrollEvent } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { useAuthentication } from '../hooks/useAuth';

// Mock data (to be replaced with API data)
const devices = [
  { id: 1, name: 'Device 1', status: 'On' },
  { id: 2, name: 'Device 2', status: 'Off' },
  { id: 3, name: 'Device 3', status: 'On' },
  { id: 4, name: 'Device 4', status: 'Off' },
  { id: 5, name: 'Device 5', status: 'On' },
  { id: 6, name: 'Device 6', status: 'On' },
  { id: 7, name: 'Device 7', status: 'Off' },
];

const Home = ({ navigation }: { navigation: NavigationProp<any, any> }) => {
  const { user } = useAuthentication();

  // Detect screen width
  const windowWidth = Dimensions.get('window').width;

  // Calculate number of columns based on screen width
  const numColumns = windowWidth > 600 ? 2 : 1;

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

  const handleSignOut= () => {
    FIREBASE_AUTH.signOut()
    navigation.navigate("/start")
  }

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
          {devices.map((device) => (
            <View key={device.id} style={[styles.card, { width: `${90 / numColumns}%` }]}>
              <View style={styles.imagePlaceholder} />
              <Text style={styles.name}>{device.name}</Text>
              <Text>Status: {device.status}</Text>
              <TouchableOpacity onPress={handleControlUnitPress} style={styles.controlUnitButton}>
                <Text style={styles.controlUnitText}>Control Unit</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <Modal
          visible={showMenu}
          transparent={true}
          animationType="fade"
          onRequestClose={toggleMenu}
        >
          <View style={styles.menuContainer}>
            <TouchableOpacity onPress={() => handleMenuItemPress('Home')} style={styles.menuItem}>
              <AntDesign name="home" size={24} color="black" />
              <Text>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleMenuItemPress('Profile')} style={styles.menuItem}>
              <AntDesign name="user" size={24} color="black" />
              <Text>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleMenuItemPress('Settings')} style={styles.menuItem}>
              <AntDesign name="setting" size={24} color="black" />
              <Text>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSignOut} style={styles.menuItem}>
              <AntDesign name="logout" size={24} color="black" /> {/* Added icon for Sign Out */}
              <Text>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </Modal>
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
    width: '70%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});


















