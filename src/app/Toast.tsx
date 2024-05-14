import React, { useEffect, useRef } from 'react';
import commonStyles from './Toaststyle';
import { Animated, Text, StyleSheet, View } from 'react-native';

const Toast = ({ message }: { message: string }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const shake = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      // Shake animation
      Animated.sequence([
        Animated.timing(shake, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shake, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shake, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shake, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shake, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start(() => {
        // Fade out
        setTimeout(() => {
          Animated.timing(opacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start();
        }, 8500);
      });
    });

    // Clear the timer if the component unmounts
    return () => {
      shake.setValue(0);  // Reset shake animation
    };
  }, [opacity, shake]);

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
    <Animated.View style={[commonStyles.toast, { backgroundColor, borderColor, opacity, transform: [{ translateX: shake }] }]}>
      <Text style={commonStyles.text}>{message}</Text>
    </Animated.View>
  );
};

export default Toast;
