import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Import icons from expo
import { NavigationProp } from '@react-navigation/native';

const Settings = ({ navigation }: { navigation: NavigationProp<any, any> }) =>{
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleMenuItemPress = (menuItem: string) => {
    console.log('Menu item pressed:', menuItem);
    if (menuItem === 'Profile') {
      navigation.navigate('profile');
    } else if (menuItem === 'Home') {
      navigation.navigate('Home');
    } else if (menuItem === 'Settings') {
      navigation.navigate('settings');
    } else {
      toggleMenu();
    }
  };

  const handleSignOut = () => {
    // Handle sign out logic here
    navigation.navigate('/start');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>
      <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
        <AntDesign name="menuunfold" size={24} color="black" />
      </TouchableOpacity>
      <Modal
        visible={showMenu}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleMenu}
      >
        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={() => handleMenuItemPress('Home')} style={styles.menuItem}>
            <AntDesign name="home" size={24} color="black" />
            <Text>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleMenuItemPress('Profile')} style={styles.menuItem}>
            <AntDesign name="user" size={24} color="black" />
            <Text>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSignOut} style={styles.menuItem}>
            <AntDesign name="logout" size={24} color="black" />
            <Text>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {/* Render settings information */}
      <View style={styles.settingsContainer}>
        <Text style={styles.settingItem}>Notification</Text>
        <Text style={styles.settingItem}>Language</Text>
        <Text style={styles.settingItem}>Privacy</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    position: 'relative',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  menuButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  menuContainer: {
    marginTop: 60,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  settingsContainer: {
    marginTop: 20,
    alignSelf: 'stretch',
  },
  settingItem: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default Settings;
