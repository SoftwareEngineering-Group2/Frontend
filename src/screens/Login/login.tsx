import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../../FirebaseConfig';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo
import styles from './loginStyle'

const Login = ({ navigation }: { navigation: NavigationProp<any, any> }) => {
  
  const [value, setValue] = useState({
    email: '',
    password: '',
    error: ''
  });

  const [loading, setLoading] = useState(false);
  const [greeting, setGreeting] = useState('');

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
      setValue({
        ...value,
        error: 'Email and password are mandatory.'
      });
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(FIREBASE_AUTH, value.email, value.password);
    } catch (error) {
      setValue({
        ...value,
        /* error: error.message, */
      });
    } finally {
      setLoading(false);
    }
  }

  const handleCreateAccount = () => {
    navigation.navigate('signup');
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={[styles.welcomeText, { textShadowColor: 'rgba(0, 0, 0, 0.5)', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 5 }]}>
          {greeting}
        </Text>
        <Text style={{ fontSize: 24, textShadowColor: 'rgba(0, 0, 0, 0.5)', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 5, marginBottom: 10 }}>
          &amp;
        </Text>
        <Text style={{ fontSize: 24, textShadowColor: 'rgba(0, 0, 0, 0.5)', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 5, marginBottom: 10 }}>
          Welcome back
        </Text>
      </View>
      <View style={styles.card}>
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
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed" size={24} color="#007bff" style={styles.icon} />
          <TextInput
            value={value.password}
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => setValue({ ...value, password: text })}
          />
        </View>
        { loading ? (
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
    </View> 
  );
}

export default Login;

