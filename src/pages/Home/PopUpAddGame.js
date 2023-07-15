import {styled} from 'styled-components';
import {
  Modal,
  TextInput,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import {useState, useEffect, useContext} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/AntDesign';
import PhotoIcon from 'react-native-vector-icons/MaterialIcons';
import {strings} from '../../assets/strings';
import {SelectList} from 'react-native-dropdown-select-list';
import {launchImageLibrary} from 'react-native-image-picker';

function PopUpAddGame() {
  const {user, isPopUpVisible, setPopUpVisible, updateInfo, setUpdateInfo} =
    useContext(AuthContext);
  const [data, setData] = useState([]);
  const [capa, setCapa] = useState('');
  const [nomeJogo, setNomeJogo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [selected, setSelected] = useState('1');
  const [finishedDate, setFinishedDate] = useState('');

  useEffect(() => {
    loadConsoles();
  }, []);
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

        setCapa(imagePath);
      }
    });
  }

  async function savingGame() {
    const formData = new FormData();
    formData.append('capa', {
      uri: capa,
      type: 'image/jpeg',
      name: 'img-' + Date.now(),
    });
    formData.append('id_usuario', user.id);
    formData.append('id_console', Number(selected));
    formData.append('nome', nomeJogo);
    formData.append('descricao', descricao);
    formData.append('finisheddate', finishedDate);

    await api
      .post('/game', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(r => {
        console.log(r.data);
        setPopUpVisible(!isPopUpVisible);
        setUpdateInfo(!updateInfo);
      })
      .catch(e => {
        console.log('erro: ' + e);
      });
  }

  async function loadConsoles() {
    await api
      .get('/consoles')
      .then(r => {
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
    <MainView>
      <Modal
        visible={isPopUpVisible}
        transparent
        onRequestClose={() => {
          setPopUpVisible(!isPopUpVisible);
        }}>
        <OpacoView>
          <ScrollView style={{width: '90%'}}>
            <View style={{borderRadius: 10}}>
              <PopUpView
                source={require('../../assets/img/bg.jpg')}
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
                    {capa !== '' ? (
                      <Image
                        source={{uri: capa}}
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
                      value={nomeJogo}
                      onChangeText={t => {
                        setNomeJogo(t);
                      }}
                    />
                  </InputView>
                  {/* <InputView>
                    <Label>{strings.game_desc_label}</Label>
                    <TextInput
                      style={s.inputContainer}
                      placeholder={strings.game_desc_placeholder}
                      placeholderTextColor="#000"
                      onChangeText={t => {
                        setDescricao(t);
                      }}
                    />
                  </InputView> */}
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
                  <TouchableOpacity style={s.btn} onPress={savingGame}>
                    <Text style={s.btnText}>Salvar game</Text>
                  </TouchableOpacity>
                </Body>
              </PopUpView>
            </View>
          </ScrollView>
        </OpacoView>
      </Modal>
    </MainView>
  );
}
const s = StyleSheet.create({
  inputContainer: {
    height: 50,
    padding: 10,
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 10,
    color: '#000',
  },
  btn: {
    backgroundColor: 'black',
    height: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 10,
  },
  btnText: {
    fontSize: 17,
    color: '#fff',
    fontWeight: '400',
  },
  dropdown: {
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    backgroundColor: '#eeee',
    width: '100%',
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#000',
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: '#000',
  },
});

const MainView = styled.View`
  flex: 1;
  margin-top: 100px;
  margin-bottom: 20px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const OpacoView = styled.View`
  flex: 1;
  width: 100%;
  background-color: 'rgba(0, 0, 0, 0.9)';
  margin-top: 100px;
  margin-bottom: 20px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const PopUpView = styled.ImageBackground`
  flex: 1;
  border-radius: 10px;
  padding: 10px;
`;
const Header = styled.View`
  align-items: center;
`;
const Title = styled.Text`
  color: #000;
  font-weight: 700;
  font-size: 24px;
`;

const Body = styled.View``;
const InputView = styled.View`
  align-items: flex-start;
  width: 100%;
`;
const Label = styled.Text`
  color: #000;
  font-weight: 500;
  font-size: 18px;
`;
const Footer = styled.View``;

export default PopUpAddGame;
