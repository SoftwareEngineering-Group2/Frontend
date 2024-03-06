import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Animated, TextInput, NativeEventEmitter, NativeSyntheticEvent, Dimensions, Image } from 'react-native';
import { NativeScrollEvent } from 'react-native';
import { useAuthentication } from '../../hooks/useAuth';
import { getAllDevices, getDeviceImage } from '../../api/deviceService';
import styles from './HomeStyle'

interface Device {
  id: number;
  name: string;
  status: string;
  imageUrl: string;
}

const Home = () => {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await getAllDevices();
        const apiDevices = response.allDevices;

        const mappedDevices: Device[] = await Promise.all(
          apiDevices.map(async (apiDevice: { id: string; deviceName: string; deviceState: string }) => {
            let status: string;
            if (apiDevice.deviceName === 'door' || apiDevice.deviceName === 'window') {
              status = apiDevice.deviceState === 'true' ? 'Open' : 'Closed';
            } else {
              status = apiDevice.deviceState === 'true' ? 'On' : 'Off';
            }
            const imageUrl = await getDeviceImage(apiDevice.deviceName);


            return {
              id: Number(apiDevice.id),
              name: apiDevice.deviceName,
              status: status,
              imageUrl: imageUrl,
            };
          })
        );

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
          <Image
            source={{ uri: device.imageUrl }}
            style={[styles.image, { aspectRatio: 1 }]} // Add aspectRatio to maintain image aspect ratio
            resizeMode='contain' // Change resizeMode to 'contain'
          />
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


