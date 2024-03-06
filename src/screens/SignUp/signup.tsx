import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../../FirebaseConfig';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo
import styles from './signUpStyle'

const SignUp = ({ navigation }: { navigation: NavigationProp<any, any> }) => {
  const [value, setValue] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    error: ''
  });

  async function signUp() {
    if (value.password !== value.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.'
      });
      return;
    }

    try {
      await createUserWithEmailAndPassword(FIREBASE_AUTH, value.email, value.password);
      navigation.navigate('login');
    } catch (error) {
      console.error('Error signing up:', error);
      // Handle error
    }
  }

  const handleLoginPress = () => {
    navigation.navigate('login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.card}>
        <View style={styles.inputContainer}>
          <Ionicons name="mail" size={24} color="#007bff" style={styles.icon} />
          <TextInput
            style={[styles.input, styles.inputText]} // Added styles.inputText
            placeholder="Email"
            keyboardType="email-address"
            value={value.email}
            onChangeText={(text) => setValue({ ...value, email: text })}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed" size={24} color="#007bff" style={styles.icon} />
          <TextInput
            style={[styles.input, styles.inputText]} // Added styles.inputText
            placeholder="Password"
            secureTextEntry={true}
            value={value.password}
            onChangeText={(text) => setValue({ ...value, password: text })}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed" size={24} color="#007bff" style={styles.icon} />
          <TextInput
            style={[styles.input, styles.inputText]} // Added styles.inputText
            placeholder="Confirm Password"
            secureTextEntry={true}
            value={value.confirmPassword}
            onChangeText={(text) => setValue({ ...value, confirmPassword: text })}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={signUp}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleLoginPress}>
        <Text style={[styles.signUpText, {fontSize: 18}]}> {/* Increased font size */}
          Already have an account? <Text style={styles.signUpLinkText}>Log in</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};



export default SignUp;
