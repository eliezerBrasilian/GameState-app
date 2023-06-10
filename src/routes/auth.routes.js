import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../pages/Login';

const Stack = createNativeStackNavigator();
//importando tbm o stack navigator

//importar as paginas SignIn e SignUp pra stacka-las

//criando uma constante para referenciar a stck

export default function AuthRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}
