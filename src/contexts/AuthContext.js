import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
export const AuthContext = createContext({});

export default function AuthProvider({children}) {
  const [user, setUser] = useState(null);
  const [userPhoto, setUserPhoto] = useState('');
  const [username, setUsername] = useState('');
  const [updateInfo, setUpdateInfo] = useState(false);
  const [isPopUpVisible, setPopUpVisible] = useState(false);
  const [isLoadingAuth, setLoadingAuth] = useState(false);
  const [isLoadingApp, setLoadingApp] = useState(true);
  useEffect(() => {
    loadData();
  }, []);
  async function loadData() {
    try {
      const ud = await AsyncStorage.getItem('@userData');
      const userData = JSON.parse(ud);
      setUser(userData);
      setUsername(userData.username);
      console.log('auth: ' + userData.username);
      setLoadingApp(false);
    } catch (error) {
      console.log(`error - AuthContext - loadData(): ${error}`);
    }
  }
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

  async function registerOnFirestore(user_id, name, email, username) {
    try {
      await firestore().collection('users').doc(user_id).set({
        isAdmin: false,
        isPremium: false,
        username: username,
        name: name,
        email: email,
        createdAt: new Date().getTime(),
        profilePhoto: null,
      });
      console.log('user created');
      return true;
    } catch (error) {
      console.log('error on creating user - registerOnFirestore: ' + error);
      return false;
    }
  }
  async function signUp(name, email, password, username) {
    setLoadingAuth(true);

    try {
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const isUserCreated = registerOnFirestore(
        response.user.uid,
        name,
        email,
        username,
      );
      return isUserCreated ? 200 : 500;
      //return 200;
    } catch (error) {
      if (error.code == 'auth/invalid-email') return 400;
      else if (error.code == 'auth/weak-password') return 411;
      else if (error.code === 'auth/email-already-in-use') return 406;
      else console.log(error.code);
    } finally {
      setLoadingAuth(false);
    }
  }

  function writeUserData(data) {
    const {profilePhoto} = data;

    setUserPhoto(data.profilePhoto);
    setUsername(data.username);
    AsyncStorage.setItem('@profilePhoto', profilePhoto);
    AsyncStorage.setItem('@userData', JSON.stringify(data));
    // loadData();
    setUser(data);
  }
  async function getUserDataFromFirestore(user_id) {
    try {
      const response = await firestore().collection('users').doc(user_id).get();
      console.log(response.data().username);
      const data = {
        user_id: user_id,
        name: response.data().name,
        isAdmin: response.data().isAdmin,
        isPremium: response.data().isPremium,
        username: response.data().username,
        email: response.data().email,
        profilePhoto: response.data().profilePhoto,
      };
      return data;
    } catch (error) {
      return null;
    }
  }
  async function login(email, password) {
    setLoadingAuth(true);

    try {
      const response = await auth().signInWithEmailAndPassword(email, password);
      const userId = response.user.uid;
      const userData = await getUserDataFromFirestore(userId);

      writeUserData(userData);
    } catch (error) {
      if (error.code == 'auth/invalid-email') return 400;
      else if (error.code == 'auth/user-not-found') return 404;
      else if (error.code == 'auth/wrong-password') return 406;
      else if (error.code == 'auth/too-many-requests') return 504;
      console.log(error.code);
    } finally {
      setLoadingAuth(false);
    }
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        signed: !!user,
        isLoadingApp,
        setLoadingApp,
        login,
        signUp,
        updateInfo,
        setUpdateInfo,
        isPopUpVisible,
        setPopUpVisible,
        isLoadingAuth,
        setLoadingAuth,
        signOut,
        userPhoto,
        setUserPhoto,
        username,
        setUsername,
        getUserDataFromFirestore,
        writeUserData,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
