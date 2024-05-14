import React, { useState, useEffect } from 'react';
import { View, Modal, Switch, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Slider from '@react-native-community/slider';
import { Device } from '../../screens/Home/Home';
import styles from './ModalStyle';
import { updateDeviceState } from '../../api/deviceService';
import { Ionicons } from '@expo/vector-icons';
import { mapDisplayName } from '../../screens/Home/Home';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

interface ModalProps {
  modalVisible: boolean;
  toggleModal: () => void;
  deviceInfo: Device | null;
}

const ModalComponent: React.FC<ModalProps> = ({ modalVisible, toggleModal, deviceInfo }) => {
  const [isEnabled, setIsEnabled] = useState(deviceInfo?.status);
  const [key, setKey] = useState(0); // To reset the timer
  const [timerDuration, setTimerDuration] = useState<number>(10); // Default timer duration
  const [isPlaying, setIsPlaying] = useState<boolean>(false); // Control whether the timer is playing
  const [selectedWatt, setSelectedWatt] = useState<number | null>(null); // To track the selected watt button

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
    } catch (error) {
      console.error('Error updating device state:', error);
    }
  };

  const handleTimerComplete = () => {
    console.log('Timer completed');
    setIsPlaying(false); // Ensure timer stops after completion
  };

  const handleStartStopTimer = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setKey(prevKey => prevKey + 1);
      setIsPlaying(true);
    }
  };

  const setTimerToValue = (value: number) => {
    setTimerDuration(value);
    setSelectedWatt(value); // Track the selected watt button
    setIsPlaying(false); // Stop the timer if running
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
                  <TouchableOpacity onPress={toggleModal} style={styles.closebutton}>
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
              <Text style={styles.sliderLabel}>Set Timer Duration: {timerDuration} seconds</Text>
              <Slider
                style={styles.slider}
                minimumValue={5}
                maximumValue={300}
                step={1}
                value={timerDuration}
                onValueChange={value => setTimerDuration(value)}
                minimumTrackTintColor="#007bff"
                maximumTrackTintColor="#000000"
                thumbTintColor="#007bff"
                disabled={isPlaying} // Disable slider when the timer is running
              />
              <View style={styles.wattButtonsContainer}>
                <TouchableOpacity
                  style={[
                    styles.wattButton,
                    selectedWatt === 20 && styles.selectedWattButton,
                  ]}
                  onPress={() => setTimerToValue(20)}
                >
                  <Text style={styles.buttonText}>500 Watt</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.wattButton,
                    selectedWatt === 40 && styles.selectedWattButton,
                  ]}
                  onPress={() => setTimerToValue(40)}
                >
                  <Text style={styles.buttonText}>700 Watt</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.wattButton,
                    selectedWatt === 60 && styles.selectedWattButton,
                  ]}
                  onPress={() => setTimerToValue(60)}
                >
                  <Text style={styles.buttonText}>900 Watt</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.button} onPress={handleStartStopTimer}>
                <Text style={styles.buttonText}>{isPlaying ? 'Stop Timer' : 'Start Timer'}</Text>
              </TouchableOpacity>
              <CountdownCircleTimer
                key={key}
                isPlaying={isPlaying}
                duration={timerDuration}
                colors={['#007bff', '#F7B801', '#A30000', '#A30000']}
                colorsTime={[10, 7, 4, 0]}
                onComplete={() => {
                  handleTimerComplete();
                  return { shouldRepeat: false, delay: 1 };
                }}
              >
                {({ remainingTime }) => (
                  <Text>{remainingTime}</Text>
                )}
              </CountdownCircleTimer>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModalComponent;
