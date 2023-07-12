import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnBoarding from '../pages/OnBoarding';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
const Stack = createNativeStackNavigator();

export default function AuthRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}
