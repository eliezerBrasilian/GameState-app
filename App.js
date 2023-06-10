import React from 'react';
import {Button, View} from 'react-native';
import axios from 'axios';
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
  async function login() {
    await axios
      .post('http://192.168.100.31:80/user/login', {
        email: 'xarles.com',
        senha: '12345',
      })
      .then(resp => {
        console.log('sucesso');
        console.log(resp.data);
      })
      .catch(e => {
        console.log('error: ' + JSON.stringify(e.status));
      });
  }
  return (
    <View>
      <Button onPress={cadastrar} title="Cadastrar" />
      <Button onPress={login} title="login" />
    </View>
  );
}

export default App;
