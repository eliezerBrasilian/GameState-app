import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {colors} from '../../assets/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {strings} from '../../assets/strings';
import {useContext, useState, useEffect} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import {launchImageLibrary} from 'react-native-image-picker';
import api from '../../services/api';
import {SkypeIndicator} from 'react-native-indicators';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
function Body() {
  const {user, signOut, userPhoto} = useContext(AuthContext);
  const [username, setUsername] = useState(user.username);
  const [profilePhoto, setProfilePhoto] = useState(userPhoto);
  const [isLoadingPhoto, setLoadingPhoto] = useState(true);
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

  function handleSignOut() {
    signOut();
  }

  async function getProfilePhoto() {
    await api
      .get(`user/${user.id}/profile/photo`)
      .then(r => {
        console.log(r.data.profilePhoto[0].profile_photo);
        setProfilePhoto(r.data.profilePhoto[0].profile_photo);
        AsyncStorage.setItem(
          '@profilePhoto',
          r.data.profilePhoto[0].profile_photo,
        ).then(() => {
          setLoadingPhoto(false);
        });
      })
      .catch(e => {
        console.log(
          'SRC/PAGES/HOME/PROFILE/PROFILE/BODY/getProfilePhoto() - erro:' +
            e.response,
        );
        setLoadingPhoto(false);
      });
  }
  const options = {
    title: 'Selecione uma imagem',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

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

        const formData = new FormData();
        formData.append('capa', {
          uri: imagePath,
          type: 'image/jpeg',
          name: 'img-' + Date.now(),
        });
        formData.append('user_id', user.id);
        setLoadingPhoto(true);
        await api
          .post('/user/profile/photo', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(r => {
            console.log(r.data);
            getProfilePhoto();
          })
          .catch(e => {
            console.log(
              'SRC/PAGES/HOME/PROFILE/BODY/LAUNCHLIBRARY() - erro:' +
                e.response.data,
            );
            setLoadingPhoto(false);
          });
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
          <Image style={s.img} source={{uri: profilePhoto}} />
        </LinearGradient>
      )}

      <TouchableOpacity onPress={launchLibrary} style={s.btnChangePhoto}>
        <Text style={[s.btnText, {color: colors.btn_editar, fontSize: 17}]}>
          {strings.change_photo}
        </Text>
      </TouchableOpacity>

      <View style={s.belowArea}>
        <Text style={s.label}>{strings.username_label}</Text>
        <View style={s.inputArea}>
          <TextInput
            style={s.input}
            value={username}
            onChangeText={t => setUsername(t)}
          />
          <Icon name="pencil" size={20} color={colors.btn_editar} />
        </View>
        <TouchableOpacity style={s.btnDestroyAds}>
          <Text style={[s.btnText, {color: '#000', fontSize: 18}]}>
            {strings.destroy_ads}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignOut}
          style={[
            s.btnDestroyAds,
            {
              backgroundColor: 'transparent',
              borderColor: colors.game_title,
              borderWidth: 2,
              paddingVertical: 10,
            },
          ]}>
          <Text style={[s.btnText, {color: '#fff', fontSize: 17}]}>
            {strings.sair}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    marginTop: 40,
    alignItems: 'center',
  },
  img: {
    height: 202,
    width: 202,
    borderRadius: 101,
  },
  btnChangePhoto: {
    marginTop: 20,
    borderColor: colors.btn_editar,
    borderStyle: 'solid',
    borderWidth: 2,
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 9,
  },
  belowArea: {marginTop: 50, width: '100%'},

  label: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '700',
  },
  inputArea: {
    borderColor: colors.btn_editar,
    borderStyle: 'solid',
    borderWidth: 2,
    paddingHorizontal: 10,
    borderRadius: 9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    color: '#fff',
    flex: 1,
    fontSize: 19,
    height: 40,
  },
  icon: {
    height: 20,
    width: 30,
  },
  btnText: {
    fontWeight: '700',
  },
  btnDestroyAds: {
    backgroundColor: colors.btn_editar,
    marginTop: 15,
    paddingHorizontal: 50,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9,
  },
});
export default Body;
