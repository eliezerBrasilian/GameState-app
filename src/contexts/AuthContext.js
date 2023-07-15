import React, {createContext, useState, useEffect} from 'react';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AuthContext = createContext({});

export default function AuthProvider({children}) {
  const [user, setUser] = useState(null);
  const [userPhoto, setUserPhoto] = useState('');
  const [username, setUsername] = useState('');
  const [updateInfo, setUpdateInfo] = useState(false);
  const [isPopUpVisible, setPopUpVisible] = useState(false);
  const [isLoadingAuth, setLoadingAuth] = useState(false);
  const [errDescription, setErrDescription] = useState('');
  useEffect(() => {
    setLoadingAuth(true);
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

  async function loadData() {
    const token = await AsyncStorage.getItem('@token');
    const ud = await AsyncStorage.getItem('@userData');
    const pPhoto = await AsyncStorage.getItem('@profilePhoto');
    const username = await AsyncStorage.getItem('@username');
    if (username) {
      console.log('USERNAME: ' + username);
      setUsername(username);
    }
    if (pPhoto) {
      setUserPhoto(pPhoto);
    }
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
        setLoadingAuth(false);
      } catch (e) {
        console.log('sem internet');
        setLoadingAuth(false);
      }
    }
  }
  async function signUp(name, email, password, username) {
    try {
      const response = await api.post('/user', {
        name,
        email,
        password,
        username,
      });
      console.log(response.status);
      return response.status;
    } catch (error) {
      console.log(error.response.data);
      return response.status;
    }
  }
  async function login(email, password) {
    setLoadingAuth(true);
    let respStatus = 0;
    await api
      .post('/user/login', {
        email,
        password,
      })
      .then(response => {
        setLoadingAuth(false);
        console.log(response.data);
        const {id, name, email, isPremium, token, username, profilePhoto} =
          response.data;
        const data = {
          id,
          name,
          email,
          isPremium,
          token,
          username,
          profilePhoto,
        };

        setUserPhoto(profilePhoto);
        setUsername(username);
        AsyncStorage.setItem('@profilePhoto', profilePhoto);
        AsyncStorage.setItem('@username', username);
        AsyncStorage.setItem('username', username);
        AsyncStorage.setItem('@token', token);
        AsyncStorage.setItem('@userData', JSON.stringify(data));
        respStatus = 200;
        loadData();
        setUser(data);
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
        signUp,
        updateInfo,
        setUpdateInfo,
        isPopUpVisible,
        setPopUpVisible,
        isLoadingAuth,
        setLoadingAuth,
        signOut,
        errDescription,
        userPhoto,
        setUserPhoto,
        username,
        setUsername,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
