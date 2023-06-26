import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnBoarding from '../pages/OnBoarding';
import Login from '../pages/Login';

const Stack = createNativeStackNavigator();

export default function AuthRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}
