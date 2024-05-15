import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import WelcomeScreen from '../screens/Start/start';
import SignInScreen from '../screens/Login/login';
import SignOutScreen from '../screens/SignUp/signup';
import { Platform } from 'react-native';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  // Determine the header color based on the platform
  const headerTextColor = Platform.OS === 'ios' || Platform.OS === 'android' ? '#007bff' : '#fff';
  const headerTintColor = Platform.OS === 'ios' || Platform.OS === 'android' ? '#007bff' : '#fff';

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="start" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={SignInScreen} options={{
          headerTransparent: true,
          headerTitleStyle: { color: headerTextColor },
          headerTintColor: headerTintColor,
        }}/>
        <Stack.Screen name="Signup" component={SignOutScreen} options={{ 
          headerTransparent: true,
          headerTitleStyle: { color: headerTextColor },
          headerTintColor: headerTintColor,
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}