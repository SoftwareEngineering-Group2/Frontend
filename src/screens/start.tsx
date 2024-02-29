// Import necessary modules
import React from 'react';
import { StyleSheet, Image, View, Pressable, Text, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { NavigationProp } from '@react-navigation/native';

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
        <Image source={require('../../assets/images/start.png')} style={styles.backgroundImage} resizeMode="cover" />
        <View style={styles.overlay}>
          <Text style={styles.overlayTextMain}>Welcome to your smart home</Text>
          <Text style={styles.overlayTextSub}>One App for All Your Smart Devices</Text>
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.description}>
        Take full control of your home's devices. Lights, security, and more, all in one place.
        </Text>
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
  );
};

export default Start;

// Define window dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Define styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: windowWidth > 768 ? 20 : 0, // Add horizontal padding only for larger screens
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 40, // Add more bottom margin for spacing
    left: 0,
    right: 0,
    alignItems: 'center',
    marginBottom: 40, // Add spacing between picture and text
  },
  overlayTextMain: {
    fontSize: windowWidth > 768 ? 48 : 36, // Adjust font size based on screen width
    fontWeight: 'bold',
    color: '#007bff', // Change text color to white
    marginBottom: 20, // Add more bottom margin for spacing
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  overlayTextSub: {
    fontSize: windowWidth > 768 ? 30 : 24, // Adjust font size based on screen width
    color: '#007bff', // Change text color to a lighter shade of blue or a color that complements your image
    marginBottom: 20, // Add more bottom margin for spacing
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  textContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40, // Increase bottom padding for more spacing
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 40, // Add margin to separate text from the image
  },
  description: {
    marginBottom: 40, // Increase bottom margin for more spacing
    fontSize: windowWidth > 768 ? 24 : 18, // Adjust font size based on screen width
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff', // Change button color
    borderRadius: 4,
    paddingVertical: 16, // Increase vertical padding for more spacing
    paddingHorizontal: 24,
    marginBottom: 24, // Increase bottom margin for more spacing
    width: windowWidth > 768 ? '50%' : '80%', // Adjust button width based on screen width
    maxWidth: 200, // Set maximum width for the button
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});
