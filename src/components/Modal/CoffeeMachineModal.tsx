import React, { useState, useEffect } from 'react';
import { View, Modal, Switch, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Device } from '../../screens/Home/Home';
import styles from './ModalStyle'
import { updateDeviceState, setCoffeeMachineType } from '../../api/deviceService';
import { Ionicons } from '@expo/vector-icons';
import { mapDisplayName } from '../../screens/Home/Home';

interface ModalProps {
  modalVisible: boolean;
  toggleModal: () => void;
  deviceInfo: Device | null;
}

const ModalComponent: React.FC<ModalProps> = ({ modalVisible, toggleModal, deviceInfo }) => {
  const [isEnabled, setIsEnabled] = useState(deviceInfo?.status);
  const [isMakingCoffee, setIsMakingCoffee] = useState(false);
  const [coffeeTypeBeingMade, setCoffeeTypeBeingMade] = useState('');
  const [timer, setTimer] = useState(0);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    // Update the switch state based on device status
    setIsEnabled(deviceInfo?.status);
  }, [deviceInfo]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isMakingCoffee && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => {
          const newTimer = prevTimer - 1;
          setProgress((newTimer / 10) * 100); // Update progress
          return newTimer;
        });
      }, 1000);
    } else if (timer === 0 && isMakingCoffee) {
      setIsMakingCoffee(false);
      setCoffeeTypeBeingMade('');
      setProgress(100); // Reset progress
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isMakingCoffee, timer]);

  const toggleSwitch = async () => {
    try {
      // Toggle the local state
      setIsEnabled(previousState => !previousState);
     // const newState = { state: !isEnabled }; 
      // Call API to update device state
      // Toggle the state correctly
      //await updateDeviceState(deviceInfo?.name, newState);
      //callback
    } catch (error) {
      console.error('Error updating device state:', error);
      // Handle error states here
    }
  };

  

  const startMakingCoffee = async (type: string) => {
    console.log(`Making ${type}`);

    await updateDeviceState(deviceInfo?.name, { state: true } );
    await setCoffeeMachineType(type);
    setIsMakingCoffee(true);
    setCoffeeTypeBeingMade(type);
    setTimer(10); // Set timer to 5 seconds
    setProgress(100); // Reset progress
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={toggleModal}
    >
      <TouchableWithoutFeedback onPress={toggleModal}>
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback onPress={() => { }}>
            <View style={styles.modalView}>
              {deviceInfo && (
                <>
                  <TouchableOpacity onPress={toggleModal} style={styles.closebutton}>
                    <Ionicons name="close-circle-outline" size={24} color="#007bff" />
                  </TouchableOpacity>
                  <Text style={styles.modalText}>{mapDisplayName(deviceInfo.name)}</Text>
                  <Text style={styles.modalText}>Status: <Text style={isEnabled ? styles.onText : styles.offText}>{isEnabled ? 'On' : 'Off'}</Text></Text>
                </>
              )}
              <Switch
                trackColor={{ false: '#767577', true: '#4c97ff' }}
                thumbColor={isEnabled ? '#f5dd4b' : '#f44336'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
              {isMakingCoffee && (
                <View style={styles.feedbackContainer}>
                  <Text style={styles.feedbackText}>Making {coffeeTypeBeingMade}, enjoy!</Text>
                  <View style={styles.progressBarContainer}>
                    <View style={[styles.progressBar, { width: `${progress}%` }]} />
                  </View>
                </View>
              )}
              <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 20, }}>
                <TouchableOpacity onPress={() => startMakingCoffee('Espresso')} style={styles.mediaControlButton} disabled={!isEnabled || isMakingCoffee}>
                  <Text style={styles.closeButtonText}>Espresso</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => startMakingCoffee('Latte')} style={styles.mediaControlButton} disabled={!isEnabled || isMakingCoffee}>
                  <Text style={styles.closeButtonText}>Latte</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => startMakingCoffee('Americano')} style={styles.mediaControlButton} disabled={!isEnabled || isMakingCoffee}>
                  <Text style={styles.closeButtonText}>Americano</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModalComponent;
