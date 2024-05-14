import React from 'react';
import commonStyles from './Toaststyle';
import { View, Text, StyleSheet } from 'react-native';

const Toast = ({ message }: { message: string }) => {
  let borderColor;
  let backgroundColor;

  // Example conditional logic for determining color based on the message
  if (message.includes('Warning')) {
    borderColor = 'red';
    backgroundColor = 'rgba(255, 0, 0, 0.4)'; // Red with 40% transparency
  } else {
    borderColor = 'yellow';
    backgroundColor = 'rgba(255, 255, 0, 0.3)'; // Yellow with 30% transparency
  }

  return (
    <View style={[commonStyles.toast, { backgroundColor, borderColor }]}>
      <Text style={commonStyles.text}>{message}</Text>
    </View>
  );
};

export default Toast;
