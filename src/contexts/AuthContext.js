import React, {createContext, useState, useEffect} from 'react';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AuthContext = createContext({});

export default function AuthProvider({children}) {
  const [user, setUser] = useState(null);
  const [updateInfo, setUpdateInfo] = useState(false);
  const [isGamesEmpty, setGameEmpty] = useState(false);
  const [isPopUpVisible, setPopUpVisible] = useState(false);
  useEffect(() => {
    loadData();
  }, []);

  async function saveGame(game) {
    const response = await api.post('/game', game);
    console.log(response.data);
    console.log(response.data.success);
  }
  async function loadData() {
    const token = await AsyncStorage.getItem('@token');
    const ud = await AsyncStorage.getItem('@userData');
    if (ud) {
      console.log('usuario ja existe');
      setUser(JSON.parse(ud));
    }
    if (token) {
      console.log('token existe');
      try {
        const response = await api.get('/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
        setUser(response.data);
        console.log('usuario setado');
        console.log(response.data);
      } catch (e) {
        console.log('sem internet');
      }
    }
  }
  async function login(email, senha) {
    console.log('clicou em login');
    try {
      const response = await api.post('/user/login', {
        email: 'xarles.com',
        senha: '12345',
      });

      console.log(response.data);
      const {id, nome, email, isPremium, token, username} = response.data;
      console.log(username);
      const data = {
        id,
        nome,
        email,
        isPremium,
        token,
        username,
      };
      if (response.data != undefined) {
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
        setUser(data);
        await AsyncStorage.setItem('@token', token);
        await AsyncStorage.setItem('@userData', JSON.stringify(data));
      }
    } catch (e) {
      console.log('Erro ao logar: ' + e);
    }
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        signed: !!user,
        login,
        saveGame,
        updateInfo,
        setUpdateInfo,
        isGamesEmpty,
        setGameEmpty,
        isPopUpVisible,
        setPopUpVisible,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
