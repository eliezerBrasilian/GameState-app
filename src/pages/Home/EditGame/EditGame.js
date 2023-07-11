import {ScrollView, TouchableOpacity, Text, Image, Alert} from 'react-native';
import {useState, useEffect, useContext} from 'react';
import {AuthContext} from '../../../contexts/AuthContext';
import {AppContext} from '../../../contexts/AppContext';
import api from '../../../services/api';
import Icon from 'react-native-vector-icons/AntDesign';
import PhotoIcon from 'react-native-vector-icons/MaterialIcons';
import {strings} from '../../../assets/strings';
import {SelectList} from 'react-native-dropdown-select-list';
import {launchImageLibrary} from 'react-native-image-picker';
import {useRoute} from '@react-navigation/native';
import EditInput from '../../../assets/components/EditInput';
import {InputView, Label} from '../../../assets/components/EditInput';
import Head from '../../Profile/Header';
import {Footer, Header, MainView, s, Body, Title} from './style';
export default function EditGame() {
  const route = useRoute();
  const {user, updateInfo, setUpdateInfo} = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [gameId] = useState(route.params.gameId);
  const [gameCover, setCover] = useState(route.params.gameCover);
  const [gameName, setGameName] = useState(route.params.gameName);
  const [gameFinishedDate, setGameFinishedDate] = useState(
    route.params.gameFinishedDate,
  );
  const [consoleId, setConsoleId] = useState(route.params.consoleId);

  const [selected, setSelected] = useState(String(consoleId));

  useEffect(() => {
    console.log(consoleId);
    loadConsoles();
  }, []);
  const options = {
    title: 'Selecione uma imagem',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  async function editGame() {
    const formData = new FormData();
    formData.append('capa', {
      uri: gameCover,
      type: 'image/jpeg',
      name: 'img-' + Date.now(),
    });
    formData.append('id_usuario', user.id);
    formData.append('id_game', gameId);
    formData.append('id_console', Number(selected));
    formData.append('nome', gameName);
    formData.append('finisheddate', gameFinishedDate);
    await api
      .post('edit/game', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(r => {
        console.log(r.data);
        setUpdateInfo(!updateInfo);
        Alert.alert(strings.game_updated);
      })
      .catch(async e => {
        console.log(`${e} - pages/EditGame/editGame()`);
        await api
          .post('edit/game', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${user.token}`,
            },
          })
          .then(r => {
            console.log(r.data);
            setUpdateInfo(!updateInfo);
            Alert.alert(strings.game_updated);
          })
          .catch(e => {
            console.log(`${e} - pages/EditGame/editGame()`);
          });
      });
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

        setCover(imagePath);
      }
    });
  }

  async function loadConsoles() {
    await api
      .get('/consoles')
      .then(r => {
        // console.log(r.data.consoles);
        //   setConsoles(r.data.consoles);

        let newArray = r.data.consoles.map(item => {
          console.log(item);
          return {key: item.id, value: item.nome};
        });
        //Set Data Variable
        setData(newArray);
      })
      .catch(e => {
        console.log(e);
      });
  }

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#000'}}>
      <MainView>
        <Head marginTop={10} title={'Editando ' + gameName} />
        <Body>
          <Image source={{uri: gameCover}} style={s.gameCoverImg} />
          <TouchableOpacity
            onPress={launchLibrary}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
              columnGap: 15,
            }}>
            <Label>{strings.edit_cover}</Label>
            {gameCover !== '' ? (
              <Image
                source={{uri: gameCover}}
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 7,
                  borderColor: '#fff',
                  borderWidth: 1,
                }}
              />
            ) : (
              <PhotoIcon name="insert-photo" size={50} color="red" />
            )}
          </TouchableOpacity>

          <EditInput
            label={strings.game_name_label}
            placeholderText={strings.game_name_placeholder}
            placeholderTextColor="#fff"
            value={gameName}
            setValue={setGameName}
          />

          <InputView>
            <Label>{strings.plataform_label}</Label>
            <SelectList
              //   onSelect={() => alert(selected)}
              placeholder="Selecionar"
              setSelected={setSelected}
              fontFamily="lato"
              data={data}
              search={false}
              boxStyles={{borderRadius: 7, backgroundColor: '#000'}}
              inputStyles={{
                color: '#fff',
              }}
              dropdownTextStyles={{color: '#fff'}}
              arrowicon={<Icon name="down" color="#fff" size={20} />}
            />
            <EditInput
              label={strings.finished_date_label}
              placeholderText={strings.finished_date_placeholder}
              placeholderTextColor="#fff"
              value={gameFinishedDate}
              setValue={setGameFinishedDate}
            />
          </InputView>

          <TouchableOpacity onPress={editGame} style={[s.btn, {marginTop: 15}]}>
            <Text style={[s.btnText, {fontSize: 20}]}>{strings.save_edit}</Text>
          </TouchableOpacity>
        </Body>
      </MainView>
    </ScrollView>
  );
}
