import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons'; 
import { FIREBASE_AUTH } from '../../../FirebaseConfig';
import styles from './navigationStyle'

const NavBar = ({ navigation }) => {
  const handleMenuItemPress = (menuItem) => {
    console.log('Menu item pressed:', menuItem);
    if (menuItem === 'Profile') {
      navigation.navigate('Profile');
    } else if (menuItem === 'Home') {
      navigation.navigate('Home');
    } else if (menuItem === 'Settings') {
      navigation.navigate('Settings');
    } 
  };

  const handleSignOut= () => {
    FIREBASE_AUTH.signOut()
  }

  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity onPress={() => handleMenuItemPress('Home')} style={styles.menuItem}>
        <Ionicons name="home-outline" size={24} color="#007bff" />
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleMenuItemPress('Profile')} style={styles.menuItem}>
        <AntDesign name="user" size={24} color="#007bff" />
        <Text>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleMenuItemPress('Settings')} style={styles.menuItem}>
        <Ionicons name="settings-outline" size={24} color="#007bff" />
        <Text>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignOut} style={styles.menuItem}>
        <Ionicons name="log-out-outline" size={28} color="#007bff" /> 
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};



export default NavBar;
