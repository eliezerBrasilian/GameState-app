import React from 'react';
import {StatusBar} from 'react-native';
import axios from 'axios';
import {NavigationContainer} from '@react-navigation/native';
import AuthProvider from './src/contexts/AuthContext';
import Routes from './src/routes';
function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="black" barStyle={'light-content'} />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}

export default App;
