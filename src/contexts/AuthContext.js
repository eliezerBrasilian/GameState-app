import React, {createContext, useState, useEffect} from 'react';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {strings} from '../assets/strings';
export const AuthContext = createContext({});

export default function AuthProvider({children}) {
  const [user, setUser] = useState(null);
  const [updateInfo, setUpdateInfo] = useState(false);
  const [isPopUpVisible, setPopUpVisible] = useState(false);
  const [isLoadingAuth, setLoadingAuth] = useState(false);
  const [errDescription, setErrDescription] = useState('');
  useEffect(() => {
    loadData();
  }, []);

  function signOut() {
    AsyncStorage.clear()
      .then(() => {
        setUser(null);
        console.log('saiu');
      })
      .catch(e => {
        console.log(e);
      });
  }

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
  async function login(email, password) {
    setLoadingAuth(true);
    let respStatus = 0;
    await api
      .post('/user/login', {
        email: email,
        senha: password,
      })
      .then(response => {
        setLoadingAuth(false);

        const {id, nome, email, isPremium, token, username} = response.data;
        const data = {
          id,
          nome,
          email,
          isPremium,
          token,
          username,
        };
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
        setUser(data);
        AsyncStorage.setItem('@token', token);
        AsyncStorage.setItem('@userData', JSON.stringify(data));
        respStatus = 200;
      })
      .catch(e => {
        console.log(e.response.data);
        const {status} = e.response;
        setLoadingAuth(false);
        respStatus = status;
      });
    return respStatus;
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
        isPopUpVisible,
        setPopUpVisible,
        isLoadingAuth,
        setLoadingAuth,
        signOut,
        errDescription,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
