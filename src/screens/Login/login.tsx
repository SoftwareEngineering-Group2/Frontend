import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../../FirebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import styles from './loginStyle'
import {Alert} from '../../components/Alert/Alert'
import {variants} from '../../components/Alert/variants'

const Login = ({ navigation }: { navigation: NavigationProp<any, any> }) => {
  
  const [value, setValue] = useState({
    email: '',
    password: '',
    error: ''
  });

  const [loading, setLoading] = useState(false);
  const [greeting, setGreeting] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  
  useEffect(() => {
    const getCurrentTime = () => {
      const currentTime = new Date().getHours();
      let newGreeting = '';
      if (currentTime < 12) {
        newGreeting = 'Good morning';
      } else if (currentTime < 18) {
        newGreeting = 'Good afternoon';
      } else {
        newGreeting = 'Good evening';
      }
      setGreeting(newGreeting);
    };

    getCurrentTime();

    const interval = setInterval(getCurrentTime, 1000 * 60 * 60);

    return () => clearInterval(interval);
  }, []);

  async function signIn() {
    if (value.email === '' || value.password === '') {
      setAlert({variants: 0, show: true})
      setValue({
        ...value,
        error: 'Email and password are mandatory.'
      });
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(FIREBASE_AUTH, value.email, value.password);
      setAlert({variants: 2, show: true});
    } catch (error) {
      // Handle Firebase authentication errors
      const errorMessage = (error as any).message;
      setValue({
        ...value,
        error: errorMessage
      });
    } finally {
      setLoading(false);
    }
  }

  const handleCreateAccount = () => {
    navigation.navigate('Signup');
  };

  const [alert, setAlert] = useState({variants: 0, show: false});

return (
  <View style={styles.container}>
    <View style={styles.titleContainer}>
      <Text style={[styles.welcomeText, styles.shadow]}>
        {greeting}
      </Text>
      <Text style={[styles.text, styles.shadow]}>
        &amp;
      </Text>
      <Text style={[styles.text, styles.shadow]}>
        Welcome back
      </Text>
    </View>
    <View style={styles.card}>
      <Text style={styles.errorMessage}>{value.error}</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="mail" size={24} color="#007bff" style={styles.icon} />
        <TextInput
          value={value.email}
          style={styles.input}
          placeholder="Email"
          autoCapitalize='none'
          onChangeText={(text) => setValue({ ...value, email: text })}
        />
      </View>
      <View style={[styles.inputContainer,]}>
        <Ionicons name="lock-closed" size={24} color="#007bff" style={styles.icon} />
        <TextInput
          value={value.password}
          style={[styles.input,]}
          placeholder="Password"
          secureTextEntry={!passwordVisible}
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
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={signIn}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
      )}
    </View>
    <TouchableOpacity onPress={handleCreateAccount} style={styles.signUpText}>
      <Text style={styles.signUpText}>
        New user? <Text style={styles.signUpLinkText}>Sign Up</Text>
      </Text>
    </TouchableOpacity>
    {alert.show && (
      <Alert 
        variant={variants[alert.variants]} 
      />
    )}
  </View>
);
}

export default Login;

