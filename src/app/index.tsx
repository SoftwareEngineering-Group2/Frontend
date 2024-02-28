import { View, Text } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import start from './start';
import login from './login';

const Stack = createNativeStackNavigator();

export default function index(){
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName='start'>
        <Stack.Screen name='start' component={start} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


/* const index = () => {
  return <Redirect href="/start" />;
} */