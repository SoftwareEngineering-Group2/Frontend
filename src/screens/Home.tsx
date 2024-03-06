import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated, TextInput, NativeSyntheticEvent, Dimensions, Image } from 'react-native';
import { NativeScrollEvent } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { useAuthentication } from '../hooks/useAuth';
import { getAllDevices, getDeviceImage } from '../api/deviceService';

interface Device {
  id: number;
  name: string;
  status: string;
  imageUrl: string; // Added imageUrl property
}

const Home = ({ navigation }: { navigation: NavigationProp<any, any> }) => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await getAllDevices();
        const apiDevices = response.allDevices;

        const mappedDevices: Device[] = apiDevices.map((apiDevice: { id: string; deviceName: string; deviceState: string }) => {
          let status: string;
          if (apiDevice.deviceName === 'door' || apiDevice.deviceName === 'window') {
            status = apiDevice.deviceState === 'true' ? 'Open' : 'Closed';
          } else {
            status = apiDevice.deviceState === 'true' ? 'On' : 'Off';
          }

          const imageUrl = getDeviceImage(apiDevice.deviceName); // Fetch the image URL
          console.log('Image URL:', imageUrl);

          return {
            id: Number(apiDevice.id),
            name: apiDevice.deviceName,
            status: status,
            imageUrl: imageUrl, // Assign the fetched image URL
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
  const numColumns = windowWidth > 600 ? 2 : 1;
  const cardWidth = 1075 / numColumns;

  const handleControlUnitPress = () => {
    // Functionality for controlling unit
    console.log('Control Unit pressed');
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    // Handle scroll event
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    // Perform search/filtering functionality here
    console.log('Search Query:', text);
  };

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
        <Text style={styles.heading}>Devices</Text>
        <TextInput
          style={[styles.searchBar]}
          placeholder="Search Devices"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <View style={styles.cardsContainer}>
          {filteredDevices.map(device => (
            <View key={device.id} style={[styles.card, { width: cardWidth }]}>
              <Image source={{ uri: device.imageUrl }} style={styles.deviceImage} /> {/* Image component */}
              <Text style={styles.name}>{device.name}</Text>
              <Text>Status: {device.status}</Text>
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
  deviceImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 10,
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
