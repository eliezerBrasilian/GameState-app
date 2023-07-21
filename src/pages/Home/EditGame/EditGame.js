import {ScrollView, TouchableOpacity, Text, Image, Alert} from 'react-native';
import {useState, useContext, useMemo} from 'react';
import {AuthContext} from '../../../contexts/AuthContext';
import Icon from 'react-native-vector-icons/AntDesign';
import PhotoIcon from 'react-native-vector-icons/MaterialIcons';
import {strings} from '../../../assets/strings';
import {SelectList} from 'react-native-dropdown-select-list';
import {launchImageLibrary} from 'react-native-image-picker';
import {useRoute} from '@react-navigation/native';
import EditInput from '../../../assets/components/EditInput';
import {InputView, Label} from '../../../assets/components/EditInput';
import Head from '../../Profile/Header';
import {MainView, s, Body} from './style';
import {PacmanIndicator} from 'react-native-indicators';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
export default function EditGame() {
  const route = useRoute();
  const {user, updateInfo, setUpdateInfo} = useContext(AuthContext);
  const [data] = useState([
    {key: 1, value: 'XBOX'},
    {key: 2, value: 'XBOX 360'},
    {key: 3, value: 'XBOX ONE'},
    {key: 4, value: 'PlayStation 1'},
    {key: 5, value: 'PlayStation 2'},
    {key: 6, value: 'PlayStation 3'},
    {key: 7, value: 'PlayStation 4'},
    {key: 8, value: 'PlayStation 5'},
    {key: 9, value: 'PPPSSPP'},
    {key: 10, value: 'GBA'},
    {key: 11, value: 'SNES'},
    {key: 12, value: 'GAMEBOY COLOR'},
    {key: 13, value: 'MAME'},
    {key: 14, value: 'MEGA DRIVE'},
    {key: 15, value: 'STEAM'},
    {key: 16, value: 'XBOX CLOUD'},
  ]);
  const [gameId] = useState(route.params.gameId);
  const [gameCover, setCover] = useState(route.params.gameCover);
  const [copyOfGameCover, setCopyOfGameCover] = useState(gameCover);
  const [gameName, setGameName] = useState(route.params.gameName);
  const [gameDescription, setGameDescription] = useState(
    route.params.gameDescription,
  );
  const [gameFinishedDate, setGameFinishedDate] = useState(
    route.params.gameFinishedDate,
  );
  const [isLoadingOnSaving, setLoadingOnSaving] = useState(false);
  const [consoleId, setConsoleId] = useState(route.params.consoleId);
  const [consoleName, setConsoleName] = useState('');
  const [selected, setSelected] = useState(String(consoleId));

  useMemo(() => {
    if (consoleId == 1) {
      setConsoleName('XBOX');
    } else if (consoleId == 2) {
      setConsoleName('XBOX 360');
    } else if (consoleId == 3) {
      setConsoleName('XBOX ONE');
    } else if (consoleId == 4) {
      setConsoleName('PlayStation 1');
    } else if (consoleId == 5) {
      setConsoleName('PlayStation 2');
    } else if (consoleId == 6) {
      setConsoleName('PlayStation 3');
    } else if (consoleId == 7) {
      setConsoleName('PlayStation 4');
    } else if (consoleId == 8) {
      setConsoleName('PlayStation 5');
    } else if (consoleId == 9) {
      setConsoleName('PPPSSPP');
    } else if (consoleId == 10) {
      setConsoleName('GBA');
    } else if (consoleId == 11) {
      setConsoleName('SNES');
    } else if (consoleId == 12) {
      setConsoleName('GAMEBOY COLOR');
    } else if (consoleId == 13) {
      setConsoleName('MAME');
    } else if (consoleId == 14) {
      setConsoleName('MEGA DRIVE');
    } else if (consoleId == 15) {
      setConsoleName('STEAM');
    } else if (consoleId == 16) {
      setConsoleName('XBOX CLOUD');
    }
  }, []);

  const options = {
    title: strings.select_image,
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  async function editGameOnFirestore(caminho, miliseconds) {
    try {
      if (caminho !== '') {
        await firestore()
          .collection('games')
          .doc(gameId)
          .update({
            name: gameName,
            description: gameDescription,
            cover: caminho,
            console: Number(selected),
            finishedDate: gameFinishedDate,
            createdAt: Number(miliseconds),
          });
      } else {
        console.log('CAMINHO VAZIO');
        await firestore()
          .collection('games')
          .doc(gameId)
          .update({
            name: gameName,
            description: gameDescription,
            console: Number(selected),
            finishedDate: gameFinishedDate,
            createdAt: Number(miliseconds),
          });
      }

      console.log('sucesso');
      setUpdateInfo(!updateInfo);
      Alert.alert(strings.game_updated);
    } catch (error) {
      Alert.alert(strings.error_on_updating_game);
    } finally {
      setLoadingOnSaving(false);
    }
  }
  async function editGame() {
    const miliseconds = String(Date.now());
    if (copyOfGameCover !== gameCover) {
      try {
        const storageRef = await storage()
          .ref('users/games')
          .child(miliseconds);
        console.log(storageRef); //ok
        if (gameCover.trim() !== '') {
          setLoadingOnSaving(true);
          await storageRef.putFile(gameCover);
          const caminho = await storageRef.getDownloadURL();
          setCopyOfGameCover(caminho);
          console.log('caminho: ' + caminho);
          await editGameOnFirestore(caminho, miliseconds);
        } else {
          Alert.alert('Esolha a capa do game!');
        }
      } catch (error) {
        console.log('erro: ' + error);
        Alert.alert('Aconteceu algum erro ao adicionar o game!');
      } finally {
        setLoadingOnSaving(false);
      }
    } else {
      console.log('are equal');
      setLoadingOnSaving(true);
      await editGameOnFirestore('', miliseconds);
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

        setCover(imagePath);
      }
    });
  }

  return (
    <ScrollView style={s.scrollview}>
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
              placeholder={consoleName}
              setSelected={setSelected}
              fontFamily="lato"
              data={data}
              search={false}
              boxStyles={{borderRadius: 7, backgroundColor: '#000'}}
              inputStyles={{
                color: '#fff',
              }}
              dropdownTextStyles={{color: '#000'}}
              arrowicon={<Icon name="down" color="#fff" size={20} />}
            />
            <EditInput
              label={strings.game_desc_label}
              placeholderText={strings.game_desc_placeholder}
              placeholderTextColor="#000"
              value={gameDescription}
              setValue={setGameDescription}
            />
            <EditInput
              label={strings.finished_date_label}
              placeholderText={strings.finished_date_placeholder}
              placeholderTextColor="#000"
              value={gameFinishedDate}
              setValue={setGameFinishedDate}
            />
          </InputView>

          {isLoadingOnSaving ? (
            <PacmanIndicator size={40} color="#000" />
          ) : (
            <TouchableOpacity
              onPress={editGame}
              style={[s.btn, {marginTop: 15}]}>
              <Text style={[s.btnText, {fontSize: 20}]}>
                {strings.save_edit}
              </Text>
            </TouchableOpacity>
          )}
        </Body>
      </MainView>
    </ScrollView>
  );
}
