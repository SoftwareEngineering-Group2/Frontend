import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';

const Settings = () =>{
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>
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
