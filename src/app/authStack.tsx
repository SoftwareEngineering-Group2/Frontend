import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import WelcomeScreen from '../screens/start';
import SignInScreen from '../screens/login';
import SignOutScreen from '../screens/signup';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="start" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="login" component={SignInScreen} />
        <Stack.Screen name="signup" component={SignOutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}