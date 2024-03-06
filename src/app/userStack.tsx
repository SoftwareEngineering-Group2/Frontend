import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/Home/Home';
import NavBar from '../components/Navigation/Navigation'
import Settings from '../screens/Settings/settings';
import profile from '../screens/Profile/profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function UserStack() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator tabBar={props => <NavBar {...props} />} >
        <Tab.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
        <Tab.Screen name="Profile" component={profile} options={{headerShown: false}}/>
        <Tab.Screen name="Settings" component={Settings} options={{headerShown: false}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}