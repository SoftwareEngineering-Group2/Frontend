import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { NavigationProp } from '@react-navigation/native';


const SignUp = ({ navigation }: { navigation: NavigationProp<any, any> }) => {

  const [value, setValue] = React.useState({
    email: '',
    password: '',
    confirmPassword: '',
    error: ''
  })

  async function signUp() {
    if(value.password === value.confirmPassword){
      if (value.email === '' || value.password === '') {
        setValue({
          ...value,
          error: 'Email and password are mandatory.'
        })
        return;
      }
    }else{
      alert("Passwords does not match!!!")
    }
    

    try {
      await createUserWithEmailAndPassword(FIREBASE_AUTH, value.email, value.password);
      navigation.navigate('Sign In');
    } catch (error) {
      setValue({
        ...value,
        /* error: error.message, */
      })
    }
  }

  const handleLoginPress = () => {
    navigation.navigate('login');
  }; 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Smart House</Text>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("/start")} >
        <Icon name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.form}>
      <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={value.email}
          onChangeText={(text) => setValue({ ...value, email: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={value.password}
          onChangeText={(text) => setValue({ ...value, password: text })}
        /> 
        <TextInput
          style={styles.input}
          placeholder="Confiem Password"
          secureTextEntry
          value={value.confirmPassword}
          onChangeText={(text) => setValue({ ...value, confirmPassword: text })}
        />      
        <TouchableOpacity style={styles.button} onPress={signUp}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleLoginPress}>
        <Text style={styles.link}>Already have an account? Log in</Text>
      </TouchableOpacity>
    </View> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 32,
  },
  form: {
    marginTop: 32,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 16,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 32,
    alignSelf: 'center',
  },
  backButton: {
    backgroundColor: '#4CAF50',
     flex: 1,
    position: 'absolute',
    top: 20, // Adjust this value to position the button vertically
    left: 20, // Adjust this value to position the button horizontally
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 24,
  },
});

export default SignUp;