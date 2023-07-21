import {
  Modal,
  TextInput,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Image,
  Alert,
} from 'react-native';
import {useState, useContext} from 'react';
import {AuthContext} from '../../../contexts/AuthContext';
import Icon from 'react-native-vector-icons/AntDesign';
import PhotoIcon from 'react-native-vector-icons/MaterialIcons';
import {strings} from '../../../assets/strings';
import {SelectList} from 'react-native-dropdown-select-list';
import {launchImageLibrary} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {PacmanIndicator} from 'react-native-indicators';
import {
  s,
  MainView,
  OpacoView,
  PopUpView,
  Header,
  Title,
  Body,
  InputView,
  Label,
} from './style';
export default function PopUpAddGame() {
  const {user, isPopUpVisible, setPopUpVisible, updateInfo, setUpdateInfo} =
    useContext(AuthContext);

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
  const [cover, setCover] = useState('');
  const [gameName, setGameName] = useState('');
  const [description, setDescription] = useState('');
  const [selected, setSelected] = useState('1');
  const [finishedDate, setFinishedDate] = useState('');
  const [isLoadingOnSaving, setLoadingOnSaving] = useState(false);

  const options = {
    title: strings.select_image,

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
        console.log(imagePath);
        setCover(imagePath);
      }
    });
  }

  async function registerGameOnFirestore(caminho, miliseconds) {
    try {
      const response = await firestore()
        .collection(`games`)
        .add({
          name: gameName,
          description: description,
          cover: caminho,
          console: Number(selected),
          finishedDate: finishedDate,
          createdAt: Number(miliseconds),
          userId: user.user_id,
        });
      console.log('sucesso');
      setPopUpVisible(!isPopUpVisible);
      setUpdateInfo(!updateInfo);
      console.log(updateInfo);
      setLoadingOnSaving(false);
      Alert.alert('Game adicionado com sucesso! :)');
    } catch (error) {
      console.log('erro: ' + error);
      setLoadingOnSaving(false);
    }
  }
  async function savingGame() {
    const miliseconds = String(Date.now());
    try {
      const storageRef = await storage().ref('users/games').child(miliseconds);
      console.log(storageRef);
      if (cover.trim() !== '') {
        setLoadingOnSaving(true);
        await storageRef.putFile(cover);
        const caminho = await storageRef.getDownloadURL();
        // console.log(caminho);

        await registerGameOnFirestore(caminho, miliseconds);
      } else {
        Alert.alert('Esolha a cover do game!');
      }
    } catch (error) {
      console.log('erro: ' + error);
      Alert.alert('Aconteceu algum erro ao adicionar o game!');
    }
  }

  return (
    <MainView>
      <Modal
        animationType="slide"
        visible={isPopUpVisible}
        transparent
        onRequestClose={() => {
          setPopUpVisible(!isPopUpVisible);
        }}>
        <OpacoView>
          <ScrollView style={{width: '90%'}}>
            <PopUpView
              source={require('../../../assets/img/bg.jpg')}
              resizeMode="cover">
              <Header>
                <TouchableOpacity
                  style={{alignSelf: 'flex-end'}}
                  onPress={() => setPopUpVisible(!isPopUpVisible)}>
                  <Icon color="black" size={30} name="closecircle" />
                </TouchableOpacity>
                <Title>{strings.lets_save_game}</Title>
              </Header>
              <Body>
                <TouchableOpacity
                  onPress={launchLibrary}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    columnGap: 15,
                  }}>
                  <Label>{strings.cover_label}</Label>
                  {cover !== '' ? (
                    <Image
                      source={{uri: cover}}
                      style={{
                        height: 40,
                        width: 40,
                        borderRadius: 7,
                        borderColor: '#fff',
                        borderWidth: 1,
                      }}
                    />
                  ) : (
                    <PhotoIcon name="insert-photo" size={50} color="#000" />
                  )}
                </TouchableOpacity>

                <InputView>
                  <Label>{strings.game_name_label}</Label>
                  <TextInput
                    style={s.inputContainer}
                    placeholder={strings.game_name_placeholder}
                    placeholderTextColor="#000"
                    value={gameName}
                    onChangeText={t => {
                      setGameName(t);
                    }}
                  />
                </InputView>
                <InputView>
                  <Label>{strings.game_desc_label}</Label>
                  <TextInput
                    style={s.inputContainer}
                    placeholder={strings.game_desc_placeholder}
                    placeholderTextColor="#000"
                    value={description}
                    onChangeText={t => {
                      setDescription(t);
                    }}
                  />
                </InputView>
                <InputView>
                  <Label>{strings.plataform_label}</Label>
                  <SelectList
                    //   onSelect={() => alert(selected)}
                    placeholder="Selecione"
                    setSelected={setSelected}
                    fontFamily="lato"
                    data={data}
                    search={false}
                    boxStyles={{borderRadius: 7, backgroundColor: '#fff'}} //override default styles
                    //   defaultOption={{id: 1, value: 'Jammu & Kashmir'}} //default selected option
                    inputStyles={{
                      color: '#000',
                    }}
                  />
                </InputView>
                <InputView>
                  <Label>{strings.finished_date_label}</Label>
                  <TextInput
                    style={s.inputContainer}
                    placeholder={strings.finished_date_placeholder}
                    placeholderTextColor="#000"
                    value={finishedDate}
                    onChangeText={t => {
                      setFinishedDate(t);
                    }}
                  />
                </InputView>
                {isLoadingOnSaving ? (
                  <PacmanIndicator size={45} color="#fff" />
                ) : (
                  <TouchableOpacity style={s.btn} onPress={savingGame}>
                    <Text style={s.btnText}>Salvar game</Text>
                  </TouchableOpacity>
                )}
              </Body>
            </PopUpView>
          </ScrollView>
        </OpacoView>
      </Modal>
    </MainView>
  );
}
