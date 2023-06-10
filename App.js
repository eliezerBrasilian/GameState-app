import React from 'react';
import {Button, View} from 'react-native';
import axios from 'axios';
import {NavigationContainer} from '@react-navigation/native';
import AuthProvider from './src/contexts/AuthContext';
import Routes from './src/routes';
function App() {
  let usuario = {
    email: 'gameteste@game.com',
    nome: 'Jonas',
    senha: '828292',
  };
  async function cadastrar() {
    await axios
      .post('http://192.168.100.31:80/user', usuario)
      .then(resp => {
        //resp.response.data
        //ou resp.data
        console.log('sucesso', +resp.response.data);
      })
      .catch(e => {
        console.log('error: ' + JSON.stringify(e.status));
      });
  }

  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}

export default App;
