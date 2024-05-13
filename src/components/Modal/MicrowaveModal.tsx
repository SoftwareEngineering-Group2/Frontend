import React, { useState, useEffect } from 'react';
import { View, Modal, Button, Switch, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Device } from '../../screens/Home/Home';
import styles from './ModalStyle'
import { updateDeviceState } from '../../api/deviceService';
import { Ionicons } from '@expo/vector-icons';
import { mapDisplayName } from '../../screens/Home/Home';

interface ModalProps {
  modalVisible: boolean;
  toggleModal: () => void;
  deviceInfo: Device | null;
}


const ModalComponent: React.FC<ModalProps> = ({ modalVisible, toggleModal, deviceInfo }) => {
  const [isEnabled, setIsEnabled] = useState(deviceInfo?.status);

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
              <View style={styles.items}>
                <Text style={styles.modalText}>{mapDisplayName(deviceInfo.name)}</Text>
                <Text style={styles.modalText}>Status: <Text style={isEnabled ? styles.onText : styles.offText}>{isEnabled ? 'On' : 'Off'}</Text></Text>
                
              </View>          
            </>
          )}
          <Switch
                  trackColor={{ false: '#767577', true: '#4c97ff' }}
                  thumbColor={isEnabled ? '#f5dd4b' : '#f44336'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                  style={styles.switch}
                />
        </View>
        </TouchableWithoutFeedback>
      </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModalComponent;