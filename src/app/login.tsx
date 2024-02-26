import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';


export default function login() {

  const router = useRouter();

  const handleCreateAccount = () => {
    router.push('/signup');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()} >
      <Icon name="arrow-back" size={24} color="white" /> {/* Adjust icon name, size, and color */}
      </TouchableOpacity>
      <Text style={styles.title}>Welcome back</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"

      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signUpButton} onPress={handleCreateAccount}>
        <Text style={styles.signUpButtonText}>New user? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  backButton: {
    backgroundColor: '#4CAF50',
    flex: 1,
    position: 'absolute',
    top: 20, // Adjust this value to position the button vertically
    left: 20, // Adjust this value to position the button horizontally
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  signUpButton: {
    alignSelf: 'center',
  },
  signUpButtonText: {
    color: '#4CAF50',
    fontSize: 16,
  },
});