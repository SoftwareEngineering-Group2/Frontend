import React from 'react';
import { StyleSheet, Image, View, Pressable, Text, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

export default function start() {
  const router = useRouter();

  const handleLoginPress = () => {
    router.push('/login');
  };

  const handleCreateAccount = () => {
    router.push('/signup');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/images/start.png')} style={styles.backgroundImage} resizeMode="cover" />
        <View style={styles.overlay}>
          <Text style={styles.overlayTextMain}>Welcome to your smart home</Text>
          <Text style={styles.overlayTextSub}>A single app for all your smart devices</Text>
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.description}>
          Control everything in your home connect. Lights, X ,X, security and more.
        </Text>
        <Pressable style={styles.button} onPress={handleLoginPress}>
          <Text style={styles.buttonText}>Log In</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleCreateAccount}>
          <Text style={styles.buttonText}>Create Account</Text>
        </Pressable>
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF', // Change background color to white
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
    color: '#fff', // Change text color to white
    marginBottom: 20, // Add more bottom margin for spacing
    textAlign: 'center',
  },
  overlayTextSub: {
    fontSize: windowWidth > 768 ? 30 : 24, // Adjust font size based on screen width
    color: '#fff', // Change text color to a lighter shade of blue or a color that complements your image
    marginBottom: 20, // Add more bottom margin for spacing
    textAlign: 'center',
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
    backgroundColor: '#4CAFEB', // Change button color
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







