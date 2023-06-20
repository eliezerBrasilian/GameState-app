import {styled} from 'styled-components';
import {
  Modal,
  TextInput,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import {useState, useEffect, useContext} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/AntDesign';
import {strings} from '../../assets/strings';
import {SelectList} from 'react-native-dropdown-select-list';
function PopUpAddGame() {
  const {user, isPopUpVisible, setPopUpVisible, updateInfo, setUpdateInfo} =
    useContext(AuthContext);
  const [data, setData] = useState([]);
  const [capa, setCapa] = useState(
    'https://ewingsvoice.com/wp-content/uploads/2019/11/480274-celeste-nintendo-switch-front-cover.jpg',
  );
  const [nomeJogo, setNomeJogo] = useState('Dora teste');
  const [descricao, setDescricao] = useState('nada');
  const [selected, setSelected] = useState('1');
  const [finishedDate, setFinishedDate] = useState('ontem');

  useEffect(() => {
    console.log('MODAL component');
    loadConsoles();
  }, []);

  async function savingGame() {
    console.log(
      `capa: ${capa} - nomeJogo: ${nomeJogo} - descricao: ${descricao} - id_console: ${selected} - finishedDate: ${finishedDate}`,
    );
    if (capa !== '' && nomeJogo != '' && selected != '' && finishedDate != '') {
      let game = {
        id_usuario: user.id,
        id_console: Number(selected),
        nome: nomeJogo,
        descricao: descricao,
        capa: capa,
        finisheddate: finishedDate,
      };
      await api
        .post('/game', game)
        .then(r => {
          console.log(r.data);
          setPopUpVisible(!isPopUpVisible);
          setUpdateInfo(!updateInfo);
        })
        .catch(e => {
          console.log('erro: ' + e);
        });
    } else {
      Alert.alert('Tem algum campo faltando');
    }
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
                  <InputView>
                    <Label>{strings.cover_label}</Label>
                    <TextInput
                      style={s.inputContainer}
                      placeholder={strings.cover_placeholder}
                      placeholderTextColor="#000"
                      autoFocus={true}
                      onChangeText={t => {
                        setCapa(t);
                      }}
                    />
                  </InputView>
                  <InputView>
                    <Label>{strings.game_name_label}</Label>
                    <TextInput
                      style={s.inputContainer}
                      placeholder={strings.game_name_placeholder}
                      placeholderTextColor="#000"
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
    elevation: 1,
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
