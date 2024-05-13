import React, { useState, useEffect } from 'react';
import { View, Modal, Button, Switch, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
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

  useEffect(() => {
    // Update the switch state based on device status
    setIsEnabled(deviceInfo?.status);
  }, [deviceInfo]);

  const toggleSwitch = async () => {
    try {
      // Toggle the local state
      setIsEnabled(previousState => !previousState);

      // Call API to update device state
      const newState = { state: !isEnabled }; // Toggle the state correctly
      await updateDeviceState(deviceInfo?.name, newState);
      //callback
    } catch (error) {
      console.error('Error updating device state:', error);
      // Handle error states here
    }
  };

  const makeEspresso = async () => {
    console.log('Making Espresso');
    setIsMakingCoffee(true);
    setCoffeeTypeBeingMade('Espresso');
    await setCoffeeMachineType('Espresso');
    setTimeout(() => {
      setIsMakingCoffee(false);
      setCoffeeTypeBeingMade('');
    }, 5000);
  };
  
  const makeLatte = async () => {
    console.log('Making Latte');
    setIsMakingCoffee(true);
    setCoffeeTypeBeingMade('Latte');
    await setCoffeeMachineType('Latte');
    setTimeout(() => {
      setIsMakingCoffee(false);
      setCoffeeTypeBeingMade('');
    }, 5000); 
  };
  
  const makeAmericano = async () => {
    console.log('Making Americano');
    setIsMakingCoffee(true);
    setCoffeeTypeBeingMade('Americano');
    await setCoffeeMachineType('Americano');
    setTimeout(() => {
      setIsMakingCoffee(false);
      setCoffeeTypeBeingMade('');
    }, 5000);
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
        <TouchableWithoutFeedback onPress={() => {}}>
        <View style={styles.modalView}>
          {deviceInfo && (
            <>
              <TouchableOpacity onPress={toggleModal} style = {styles.closebutton}>
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
          </View>
        )}
        <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 20 }}>
          <TouchableOpacity onPress={makeEspresso} style={styles.mediaControlButton} disabled={!isEnabled || isMakingCoffee}>
            <Text style={styles.closeButtonText}>Espresso</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={makeLatte} style={styles.mediaControlButton} disabled={!isEnabled || isMakingCoffee}>
            <Text style={styles.closeButtonText}>Latte</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={makeAmericano} style={styles.mediaControlButton} disabled={!isEnabled || isMakingCoffee}>
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