import React, {createContext, useState, useEffect} from 'react';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AuthContext = createContext({});

export default function AuthProvider({children}) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    loadData();
  }, []);
  async function loadData() {
    const token = await AsyncStorage.getItem('@token');
    if (token) {
      console.log('token existe');
      const response = await api
        .get('/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .catch(() => {
          setUser(null);
        });

      api.defaults.headers['Authorization'] = `Bearer ${token}`;
      setUser(response.data);
      console.log('usuario setado');
      console.log(response.data);
    }
  }
  async function login(email, senha) {
    try {
      const response = await api.post('/user/login', {
        email: 'xarles.com',
        senha: '12345',
      });
      console.log(response);
      const {id, nome, email, isPremium, token} = response.data;

      const data = {
        id,
        nome,
        email,
        isPremium,
        token,
      };
      api.defaults.headers['Authorization'] = `Bearer ${token}`;
      setUser(data);
      await AsyncStorage.setItem('@token', token);
    } catch (e) {
      console.log('Erro ao logar: ' + e);
    }
  }
  return (
    <AuthContext.Provider value={{user, signed: !!user, login}}>
      {children}
    </AuthContext.Provider>
  );
}
