import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import styles from './settingsStyle'

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



export default Settings;
