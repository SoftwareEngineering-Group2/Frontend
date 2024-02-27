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

const SignUp = () => {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const auth = FIREBASE_AUTH; 

  const singUp = async () =>{
    setLoading(true);
    if(password === confirmPassword){
      try{
        const response = await createUserWithEmailAndPassword(auth, email, password);
        console.log(response)
        alert("Check your emails")
      }catch (error: any){
        console.log(error);
        alert('Sign in failed: ' + error.message);
      }finally{
        setLoading(false)
      }
    }else{
      alert("Passwords does not match!")
    }
  }

  const handleLoginPress = () => {
    router.push('/login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Smart House</Text>
      <TouchableOpacity style={styles.backButton} onPress={() => router.push("/start")} >
        <Icon name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.form}>
      <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        /> 
        <TextInput
          style={styles.input}
          placeholder="Confiem Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />      
        <TouchableOpacity style={styles.button} onPress={singUp}>
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