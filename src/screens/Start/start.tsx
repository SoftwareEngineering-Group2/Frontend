// Import necessary modules
import React from 'react';
import { StyleSheet, Image, View, Pressable, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { NavigationProp } from '@react-navigation/native';
import styles from './startStyle'

// Define the functional component
const Start = ({ navigation }: { navigation: NavigationProp<any, any> })=>{

  // Function to handle navigation to the login page
  const handleLoginPress = () => {
    navigation.navigate('login');
  };

  // Function to handle navigation to the sign up page
  const handleCreateAccount = () => {
    navigation.navigate('signup');
  };

  // Return the JSX layout
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>     
        <Text style={styles.overlayTextMain}>Welcome to your smart home</Text>
        <Image source={require('../../../assets/images/smart-home.png')} style={styles.backgroundImage} resizeMode="cover" />
        <Text style={styles.overlayTextSub}>One App for All Your Smart Devices</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.description}>
        Take full control of your home's devices. Lights, security, and more, all in one place.
        </Text >
        <View style={styles.buttons}>
        {/* Button to navigate to the login page */}
        <Pressable style={styles.button} onPress={handleLoginPress}>
          <Text style={styles.buttonText}>Log In</Text>
        </Pressable>
        {/* Button to navigate to the sign up page */}
        <Pressable style={styles.button} onPress={handleCreateAccount}>
          <Text style={styles.buttonText}>Create Account</Text>
        </Pressable>
        </View>
        
      </View>
    </View>
  );
};

export default Start;


