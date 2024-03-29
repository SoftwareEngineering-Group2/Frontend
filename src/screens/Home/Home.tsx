import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated, TextInput, NativeEventEmitter, NativeSyntheticEvent, Dimensions, Image, Button } from 'react-native';
import { useAuthentication } from '../../hooks/useAuth';
import { getAllDevices, getDeviceImage, updateCoffeeMachine, updateMicrowaveOven } from '../../api/deviceService';
import styles from './HomeStyle'
import Modal from '../../components/Modal/Modal';

const Home = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = async (device: Device) => {
    setSelectedDevice(device);
    setModalVisible(true);
  };

  useEffect(() => {
  
    fetchDevices(setDevices);
  }, [modalVisible]);

  const { user } = useAuthentication();

  // Detect screen width
  const windowWidth = Dimensions.get('window').width;

  // Calculate number of columns based on screen width
  const numColumns = windowWidth > 600 ? 2 : 1;

  const cardWidth = 1075 / numColumns;

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
      scrollEventThrottle={16}
    >
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome {user?.email ? user.email.split('@')[0] : ''}</Text>
        <Text style={styles.heading}>Connected Devices</Text>
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
                style={[styles.image, { aspectRatio: 1 }]}
                resizeMode='contain'
              />
              <Text style={[styles.name, { fontWeight: 'bold', fontSize: 20 }]}>{device.name}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ marginRight: 5, fontSize: 18 }}>Status:</Text>
                {device.status ? (
                  <Text style={{ color: 'green', fontWeight: 'bold', fontSize: 18 }}>On</Text>
                ) : (
                  <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 18 }}>Off</Text>
                )}
              </View>
              <TouchableOpacity onPress={() => toggleModal(device)} style={styles.controlUnitButton}>
                <Text style={styles.controlUnitText}>Control Unit</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        {selectedDevice && (
          <Modal
            modalVisible={modalVisible}
            toggleModal={() => setModalVisible(!modalVisible)}
            deviceInfo={selectedDevice}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default Home;

export interface Device {
  id: number;
  name: string;
  status: boolean;
  imageUrl: string;
}
const fetchDevices = async (setDevices: React.Dispatch<React.SetStateAction<Device[]>>) => {
  try {
    const response = await getAllDevices();
    const apiDevices = response.allDevices;

    const mappedDevices: Device[] = await Promise.all(
      apiDevices.map(async (apiDevice: { id: string; deviceName: string; deviceState: boolean }) => {
        let status: boolean;
        status = apiDevice.deviceState
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


