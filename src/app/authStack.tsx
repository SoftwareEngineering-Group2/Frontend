import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import WelcomeScreen from '../screens/Start/start';
import SignInScreen from '../screens/Login/login';
import SignOutScreen from '../screens/SignUp/signup';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="start" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={SignInScreen} options={{ headerTitleStyle: { color: "#007bff" } }}/>
        <Stack.Screen name="Signup" component={SignOutScreen} options={{ headerTitleStyle: { color: "#007bff" } }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}