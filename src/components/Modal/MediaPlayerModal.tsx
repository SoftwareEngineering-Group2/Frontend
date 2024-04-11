import React, { useState, useEffect } from 'react';
import { View, Modal, Button, Switch, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Device } from '../../screens/Home/Home';
import styles from './ModalStyle'
import { updateDeviceState } from '../../api/deviceService';
import { Ionicons } from '@expo/vector-icons';

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

  // Placeholder functions for media player actions
  const handlePlay = () => console.log('Play action');
  const handleSkip = () => console.log('Skip action');
  const handleStop = () => console.log('Stop action');

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={toggleModal}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {deviceInfo && (
            <>
              <Text style={styles.modalText}>{deviceInfo.name}</Text>
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
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
            <TouchableOpacity onPress={handlePlay} style={styles.mediaControlButton} disabled={!isEnabled}>
              <Ionicons name="play" size={24} color={isEnabled ? "#007bff" : "#aaa"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleStop} style={styles.mediaControlButton} disabled={!isEnabled}>
              <Ionicons name="stop" size={24} color={isEnabled ? "#007bff" : "#aaa"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSkip} style={styles.mediaControlButton} disabled={!isEnabled}>
              <Ionicons name="play-skip-forward" size={24} color={isEnabled ? "#007bff" : "#aaa"} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={toggleModal} style={{ marginTop: 20 }}>
            <Text style={styles.controlUnitText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalComponent;