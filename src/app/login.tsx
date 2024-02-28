import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const auth = FIREBASE_AUTH; 

  const signIn = async () =>{
    setLoading(true);
    try{
      const response = await signInWithEmailAndPassword(auth, email, password)
      console.log(response)
      router.push('/home');
    }catch (error: any){
      console.log(error);
      alert('Sign in failed: ' + error.message);
    }finally{
      setLoading(false)
    }
  }

  const router = useRouter();

  const handleCreateAccount = () => {
    router.push('/signup');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.push("/start")}>
        <Icon name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.title}>Welcome back</Text>
      <TextInput
        value={email}
        style={styles.input}
        placeholder="Email"
        autoCapitalize='none'
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        value={password}
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />

      { loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
      <>
        <TouchableOpacity style={styles.button} onPress={signIn}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signUpButton} onPress={handleCreateAccount}>
          <Text style={styles.signUpButtonText}>New user? Sign Up</Text>
        </TouchableOpacity>
      </>
      )}  
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