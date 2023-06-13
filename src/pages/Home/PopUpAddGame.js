import {styled} from 'styled-components';
import {
  Modal,
  TextInput,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useState, useEffect} from 'react';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/AntDesign';
import {strings} from '../../assets/strings';
import {SelectList} from 'react-native-dropdown-select-list';
function PopUpAddGame({isPopUpVisible, setPopUpVisible}) {
  const [selected, setSelected] = useState('');
  const [data, setData] = useState([]);
  useEffect(() => {
    loadConsoles();
  }, []);
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
                    />
                  </InputView>
                  <InputView>
                    <Label>{strings.game_name_label}</Label>
                    <TextInput
                      style={s.inputContainer}
                      placeholder={strings.game_name_placeholder}
                      placeholderTextColor="#000"
                    />
                  </InputView>
                  <InputView>
                    <Label>{strings.game_desc_label}</Label>
                    <TextInput
                      style={s.inputContainer}
                      placeholder={strings.game_desc_placeholder}
                      placeholderTextColor="#000"
                    />
                  </InputView>
                  <InputView>
                    <Label>{strings.plataform_label}</Label>
                    <SelectList
                      onSelect={() => alert(selected)}
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
                      placeholder={strings.cover_placeholder}
                      placeholderTextColor="#000"
                    />
                  </InputView>
                  <TouchableOpacity style={s.btn}>
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
