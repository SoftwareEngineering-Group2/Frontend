import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const SignUp = ({ navigation }: RouterProps) => {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 44,
    marginBottom: 20,
    color: '#007bff',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: '100%',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    flex: 1,
    borderRadius: 5,
  },
  inputText: { // Added inputText style
    fontSize: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.2)', // Added text shadow
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  icon: {
    marginRight: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  signUpText: {
    fontSize: 20,
    color: '#333',
    marginBottom: 10,
  },
  signUpLinkText: {
    color: '#007bff',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});

export default SignUp;
