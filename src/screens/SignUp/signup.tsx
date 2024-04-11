import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../../FirebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import styles from './signUpStyle';
import httpClient from "../../api/httpClient";
import { updateUsernames } from '@/src/api/deviceService';
import { useToken } from '../../api/getToken';

const SignUp = ({ navigation }: { navigation: NavigationProp<any, any> }) => {
  const [value, setValue] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    error: '' 
  });
  const token = useToken();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  useEffect(() => {
    if (token) {
      httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]); 

  async function signUp() {
    if (value.password !== value.confirmPassword) {
      setValue({ ...value, error: "Passwords do not match!" });
      return;
    }

    if (value.email === '' || value.password === '' || value.firstName === '' || value.lastName === '') {
      setValue({ ...value, error: 'All fields are mandatory.' });
      return;
    }

    try {
      await createUserWithEmailAndPassword(FIREBASE_AUTH, value.email, value.password);
      const user = FIREBASE_AUTH.currentUser;
      if (user) {
        const uid = user.uid;
        const response = await updateUsernames(uid, value.firstName, value.lastName);
      } else {
        console.error('User is not authenticated.');
        return;
      }
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error signing up:', error);
      const errorMessage = (error as Error).message;
      setValue({ ...value, error: errorMessage });
    }
  }

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.card}>
        {value.error ? <Text style={styles.errorMessage}>{value.error}</Text> : null}
        <View style={styles.inputContainer}>
          <Ionicons name="person" size={24} color="#007bff" style={styles.icon} />
          <TextInput
            style={[styles.input, styles.inputText]}
            placeholder="First Name"
            value={value.firstName}
            onChangeText={(text) => setValue({ ...value, firstName: text })}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="person" size={24} color="#007bff" style={styles.icon} />
          <TextInput
            style={[styles.input, styles.inputText]}
            placeholder="Last Name"
            value={value.lastName}
            onChangeText={(text) => setValue({ ...value, lastName: text })}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="mail" size={24} color="#007bff" style={styles.icon} />
          <TextInput
            style={[styles.input, styles.inputText]}
            placeholder="Email"
            keyboardType="email-address"
            value={value.email}
            onChangeText={(text) => setValue({ ...value, email: text })}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed" size={24} color="#007bff" style={styles.icon} />
          <TextInput
            style={[styles.input, styles.inputText]}
            placeholder="Password"
            secureTextEntry={!passwordVisible}
            value={value.password}
            onChangeText={(text) => setValue({ ...value, password: text })}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
          <Ionicons
            name={passwordVisible ? "eye" : "eye-off"}
            size={24}
            color="#007bff"
          />
        </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed" size={24} color="#007bff" style={styles.icon} />
          <TextInput
            style={[styles.input, styles.inputText]}
            placeholder="Confirm Password"
            secureTextEntry={!passwordVisible}
            value={value.confirmPassword}
            onChangeText={(text) => setValue({ ...value, confirmPassword: text })}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
          <Ionicons
            name={passwordVisible ? "eye" : "eye-off"}
            size={24}
            color="#007bff"
          />
        </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={signUp}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleLoginPress}>
        <Text style={[styles.signUpText, {fontSize: 18}]}>
          Already have an account? <Text style={styles.signUpLinkText}>Log in</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
