import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Import AntDesign from @expo/vector-icons
import { FIREBASE_AUTH } from '../../FirebaseConfig';

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
    navigation.navigate("/start")
  }


  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity onPress={() => handleMenuItemPress('Home')} style={styles.menuItem}>
        <AntDesign name="home" size={24} color="black" />
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleMenuItemPress('Profile')} style={styles.menuItem}>
        <AntDesign name="user" size={24} color="black" />
        <Text>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleMenuItemPress('Settings')} style={styles.menuItem}>
        <AntDesign name="setting" size={24} color="black" />
        <Text>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignOut} style={styles.menuItem}>
        <AntDesign name="logout" size={24} color="black" /> 
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    height: 60,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default NavBar;
