import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import {colors} from '../../../assets/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {strings} from '../../../assets/strings';
import {useContext, useState, useEffect, useMemo, useRef} from 'react';
import {AuthContext} from '../../../contexts/AuthContext';
import {launchImageLibrary} from 'react-native-image-picker';
import {SkypeIndicator} from 'react-native-indicators';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {s} from './style';
import * as Animatable from 'react-native-animatable';
function Body() {
  const {user, signOut, getUserDataFromFirestore, writeUserData} =
    useContext(AuthContext);
  const [profilePhoto, setProfilePhoto] = useState(user.profilePhoto);
  const [username, setUsername] = useState(user.username);
  const [usernameCopy, setUsernameCopy] = useState(user.username);
  const [isShowingAlterButton, setShowingAlterButton] = useState(false);
  const [isLoadingPhoto, setLoadingPhoto] = useState(true);
  const touchableOpacityRef = useRef(null);

  useEffect(() => {
    const startAnimation = () => {
      touchableOpacityRef.current?.animate(
        {
          0: {scale: 0.8, translateY: 100},
          0.5: {scale: 1.1, translateY: 0},
          1: {scale: 1.0, translateY: 1},
        },
        2000,
      ); // Duração da animação: 1000 milissegundos (1 segundo)
    };
    const animationTimeout = setTimeout(startAnimation, 300); // Atraso de 1 segundo (1000 milissegundos)
    return () => clearTimeout(animationTimeout);
  }, []);

  useEffect(() => {
    async function getImageFromStorage() {
      try {
        const photo = await AsyncStorage.getItem('@profilePhoto');
        setProfilePhoto(photo);
        setLoadingPhoto(false);
        // setUpdateInfo(true);
      } catch (e) {
        console.log('HOME - HEADER - ERROR ON BRING IMAGE');
        setLoadingPhoto(false);
      }
    }
    getImageFromStorage();
  }, []);

  useMemo(() => {
    if (username != usernameCopy) {
      setShowingAlterButton(true);
    }
  }, [username]);
  function handleSignOut() {
    signOut();
  }

  const options = {
    title: strings.select_image,
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  async function updateUsernameOnFirestore() {
    if (username !== '') {
      await firestore()
        .collection('users')
        .doc(user.user_id)
        .update({
          username: username,
        })
        .then(async r => {
          console.log('sucesso');
          const userData = await getUserDataFromFirestore(user.user_id);
          await writeUserData(userData);
        })
        .catch(e => {
          console.log('erro: ' + error);
        });
    }
  }
  async function updatePhotoOnFirestore(imageURL) {
    await firestore()
      .collection('users')
      .doc(user.user_id)
      .update({
        profilePhoto: imageURL,
      })
      .then(async r => {
        ToastAndroid.show(strings.username_was_alterd, ToastAndroid.SHORT);
        try {
          await AsyncStorage.setItem('@profilePhoto', imageURL);
          console.log('imagem salva na memoria');
        } catch (error) {
          console.log('erro ao salvar na memoria');
        }
      })
      .catch(e => {
        console.log('erro: ' + error);
        //ToastAndroid.show(strings.username_was_alterd, ToastAndroid.SHORT);
      });
  }

  async function savingPhoto(photo) {
    const miliseconds = String(Date.now());
    try {
      const storageRef = await storage()
        .ref('users/profile_photo')
        .child(miliseconds);
      console.log(storageRef);

      await storageRef.putFile(photo);
      const imageURL = await storageRef.getDownloadURL();
      console.log('caminho: ' + imageURL);

      await updatePhotoOnFirestore(imageURL);
    } catch (error) {
      console.log('erro: ' + error);
      // Alert.alert('Aconteceu algum erro ao adicionar o game!');
    }
  }

  async function launchLibrary() {
    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('Seleção de imagem cancelada');
      } else if (response.error) {
        console.log('Erro: ', response.error);
      } else {
        // Caminho do arquivo selecionado
        const ra = response.assets;
        const imagePath = ra[0].uri;
        setProfilePhoto(imagePath);
        savingPhoto(imagePath);
      }
    });
  }

  return (
    <View style={s.container}>
      {isLoadingPhoto ? (
        <SkypeIndicator style={s.img} color="#fff" />
      ) : (
        <LinearGradient
          colors={['#4EF2F6', '#09168C', '#F8095A']}
          style={{
            borderRadius: 105,
            height: 210,
            width: 210,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {profilePhoto == null ? (
            <Image
              style={{
                height: 200,
                width: 200,
                borderRadius: 101,
                marginTop: 5,
              }}
              source={require('../../../assets/img/user_profile.png')}
            />
          ) : (
            <Image style={s.img} source={{uri: profilePhoto}} />
          )}
        </LinearGradient>
      )}

      <TouchableOpacity onPress={launchLibrary} style={s.btnChangePhoto}>
        <Text style={[s.btnText, {color: colors.btn_editar, fontSize: 17}]}>
          {strings.change_photo}
        </Text>
      </TouchableOpacity>

      <View style={s.belowArea}>
        <Text style={s.label}>{strings.username_label}</Text>
        <View style={{flexDirection: 'row', width: '100%', columnGap: 10}}>
          <View style={s.inputArea}>
            <TextInput
              style={s.input}
              value={username}
              onChangeText={t => setUsername(t)}
            />
            <Icon name="pencil" size={20} color={colors.btn_editar} />
          </View>
          {isShowingAlterButton && (
            <TouchableOpacity
              onPress={updateUsernameOnFirestore}
              style={s.saveUsernameBtn}>
              <Text style={s.saveUsernameText}>{strings.alter_username}</Text>
            </TouchableOpacity>
          )}
        </View>
        <Animatable.View ref={touchableOpacityRef}>
          <TouchableOpacity style={s.btnDestroyAds}>
            <Text style={[s.btnText, {color: '#000', fontSize: 18}]}>
              {strings.destroy_ads}
            </Text>
            <Image
              source={require('../../../assets/img/premium_.png')}
              style={{height: 45, width: 45}}
            />
          </TouchableOpacity>
        </Animatable.View>

        <TouchableOpacity
          onPress={handleSignOut}
          style={[
            s.btnDestroyAds,
            {
              backgroundColor: colors.game_title,
              paddingVertical: 10,
            },
          ]}>
          <Text style={[s.btnText, {color: '#000', fontSize: 17}]}>
            {strings.sair}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Body;
