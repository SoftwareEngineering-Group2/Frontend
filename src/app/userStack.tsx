import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/Home';
import NavBar from './Navigation'
import Settings from '../screens/settings';
import profile from '../screens/profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function UserStack() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        tabBar={props => <NavBar {...props} />} // Use your custom navigation component as the tabBar
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
        <Tab.Screen name="Profile" component={profile} options={{headerShown: false}}/>
        <Tab.Screen name="Settings" component={Settings} options={{headerShown: false}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}