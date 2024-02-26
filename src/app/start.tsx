import React from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Text } from 'react-native';
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
      <Image source={require('../../assets/images/start.png')} style={styles.backgroundImage} />
      <View style={styles.contentContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={handleLoginPress}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={handleCreateAccount}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    width: 390,
    height: 480,
    resizeMode: 'cover',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});