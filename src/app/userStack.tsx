import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/Home';
import CustomHeader from './Navigation'

const Stack = createNativeStackNavigator();

export default function UserStack() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ header: props => <CustomHeader {...props} /> }} // Use the custom header component
      />
      {/* <Stack.Screen 
        name="Profile" 
        component={HomeScreen} 
        options={{ header: props => <CustomHeader {...props} /> }} // Use the custom header component
      />
      <Stack.Screen 
        name="Settings" 
        component={HomeScreen} 
        options={{ header: props => <CustomHeader {...props} /> }} // Use the custom header component
      /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}