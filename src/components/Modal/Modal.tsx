import React from 'react';
import { View, Modal, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Device } from '../../screens/Home/Home';

interface ModalProps {
  modalVisible: boolean;
  toggleModal: () => void;
  deviceInfo: Device | null;
}


const ModalComponent: React.FC<ModalProps> = ({ modalVisible, toggleModal, deviceInfo }) => {
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
              <Text style={styles.modalText}>Status: {deviceInfo.status}</Text>
              {/* Add other device information here as needed */}
            </>
          )}
          <TouchableOpacity onPress={toggleModal}>
            <Text style={styles.controlUnitText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  controlUnitText: {
    fontSize: 18,
    color: 'blue',
  },
});

export default ModalComponent;
