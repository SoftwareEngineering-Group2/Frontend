import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from '../screens/Home';
import Settings from '../screens/settings';
import profile from '../screens/profile';

const Stack = createNativeStackNavigator();

export default function UserStack() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="profile" component={profile} />
        <Stack.Screen name="settings" component={Settings} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}