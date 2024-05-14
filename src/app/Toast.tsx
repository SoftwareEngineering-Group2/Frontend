import React from 'react';
import './Toaststyle';
import { View, Text, StyleSheet } from 'react-native';

const Toast = ({ message }: { message: string }) => {
    console.log("Toast component rendered with message:", message);
    return (
    <View style={styles.toast}>
      <Text style={styles.text}>{message}</Text>
    </View>
    );
};

const styles = StyleSheet.create({
    toast: {
      position: 'absolute',
      bottom: 20,
      left: '50%',
      transform: [{ translateX: -100 }], // Adjust to center horizontally
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      padding: 10,
      borderRadius: 5,
      zIndex: 1000,
      width: 200,
      alignItems: 'center',
    },
    text: {
      color: '#fff',
    },
  });
  
export default Toast;
