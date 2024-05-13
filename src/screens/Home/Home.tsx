import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, TouchableWithoutFeedback, Dimensions, Image } from 'react-native';
import { useAuthentication } from '../../hooks/useAuth';
import { Platform } from 'react-native';
import { getAllDevices, getDeviceImage, updateMicrowaveOven } from '../../api/deviceService';
import styles from './HomeStyle'
import Modal from '../../components/Modal/Modal';
import MediaPlayerModal from '../../components/Modal/MediaPlayerModal';
import CoffeeMachineModal from '../../components/Modal/CoffeeMachineModal';
import MicrowaveModal from '../../components/Modal/MicrowaveModal';
import Speech from '../../components/SpeechToText/Speech';
import SpeechWeb from '../../components/SpeechToText/SpeechWeb';
import handleSpeech from './handleSpeech';
import { useToken } from '../../api/getToken';
import httpClient from "../../api/httpClient";
import { useSocket } from '../../api/useSocket'
import { getUsername } from '@/src/api/deviceService';
import { FIREBASE_AUTH } from '../../../FirebaseConfig';

const Home = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const token = useToken();
  const { user } = useAuthentication();
  const allDevices = useSocket();
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    if (token) {
      httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

  const toggleModal = async (device: Device) => {
    setSelectedDevice(device);
    setModalVisible(true);
  };


  useEffect(() => {
    if (token || allDevices) {
      const fetchData = async () => {
        await fetchDevices(setDevices);
      };

      fetchData();
    }

    // Call the function to fetch data and handle speech
  }, [modalVisible, spokenText, token, allDevices])


  useEffect(() => {
    async function fetchData() {
      try {
        const user = FIREBASE_AUTH.currentUser;
        if (user) {
          const uid = user.uid;
          const response = await getUsername(uid);
          setFirstName(response.firstName);
        } else {
          console.error('User is not authenticated.');
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);


  const windowWidth = Dimensions.get('window').width;


  const numColumns = windowWidth > 600 ? 2 : 1;

  const cardWidth = 1075 / numColumns;

  const handleSearch = (text: string) => {
    setSearchQuery(text);

    console.log('Search Query:', text);
  };

  const filteredDevices = devices.filter(device =>
    device.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle the spoken text
  const handleSpokenText = async (text: string) => {

    await handleSpeech(text, setSpokenText)
    setSpokenText(text);
  };

  // Function to render either Speech component or another component based on platform
  const renderDynamicComponent = () => {
    if (Platform.OS === 'web') {
      // Render the alternative component for web
      return <SpeechWeb spokenText={handleSpokenText} />;
    } else {
      // Render the Speech component for mobile platforms
      return <Speech spokenText={handleSpokenText} />;
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      scrollEventThrottle={16}
    >
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome {firstName}</Text>
        <Text style={styles.heading}>Connected Devices</Text>
        {renderDynamicComponent()}
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
              <Text style={[styles.name, { fontWeight: 'bold', fontSize: 20 }]}>{mapDisplayName(device.name)}</Text>
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
          selectedDevice.id === 10 ? (
            <MediaPlayerModal
              modalVisible={modalVisible}
              toggleModal={() => setModalVisible(!modalVisible)}
              deviceInfo={selectedDevice}
            />
          ) : selectedDevice.id === 8 ? (
            <CoffeeMachineModal
              modalVisible={modalVisible}
              toggleModal={() => setModalVisible(!modalVisible)}
              deviceInfo={selectedDevice}
            />
          ) : selectedDevice.id === 7 ? (
            <MicrowaveModal
              modalVisible={modalVisible}
              toggleModal={() => setModalVisible(!modalVisible)}
              deviceInfo={selectedDevice}
            />
          ) : (
            <Modal
              modalVisible={modalVisible}
              toggleModal={() => setModalVisible(!modalVisible)}
              deviceInfo={selectedDevice}
            />
          )
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
    const user = FIREBASE_AUTH.currentUser;
    if(user){
    const uid = user.uid;
    const response = await getAllDevices(uid);
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
  }
  } catch (error) {
    console.error('Error fetching devices:', error);
  }
};

export const mapDisplayName = (deviceName: string) => {
  switch (deviceName) {
    case 'whiteLed':
      return 'White Lamp';
    case 'yellowLed':
      return 'Yellow Lamp';
    case 'door':
      return 'Door';
    case 'window':
      return 'Window';
    case 'buzzer':
      return 'Buzzer';
    case 'fan':
      return 'Fan';
    case 'gasSensor':
      return 'Gas Sensor';
    case 'microOven':
      return 'Microwave Oven';
    case 'coffeeMachine':
      return 'Coffee Machine';
    case 'mediaPlayer':
      return 'Media Player';
    default:
      return deviceName; // Return the same name if no mapping is found
  }
};


