import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

const Profile = ({ navigation }: { navigation: NavigationProp<any, any> }) => {
  // Dummy profile information
  const profileInfo = {
    name: 'John Doe',
    age: 30,
    occupation: 'Software Engineer',
    location: 'New York, USA',
    interests: ['Reading', 'Traveling', 'Photography'],
  };

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
      <Text style={styles.heading}>Profile</Text>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Name:</Text>
        <Text>{profileInfo.name}</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Age:</Text>
        <Text>{profileInfo.age}</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Occupation:</Text>
        <Text>{profileInfo.occupation}</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Location:</Text>
        <Text>{profileInfo.location}</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Interests:</Text>
        {profileInfo.interests.map((interest, index) => (
          <Text key={index}>{interest}</Text>
        ))}
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
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
  },
});

export default Profile;
