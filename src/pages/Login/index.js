import {useState, useContext, useMemo} from 'react';
import {
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  StyleSheet,
  TextInput,
  Text,
  Alert,
} from 'react-native';
import {AuthContext} from '../../contexts/AuthContext';
import {styled} from 'styled-components';
import Icon from 'react-native-vector-icons/AntDesign';
import LockIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../assets/colors';
import {strings} from '../../assets/strings';
import Btn from '../../assets/components/Btn';
function Login() {
  const {login} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    if (email.trim() !== '' && password.trim() !== '') {
      const response = await login(email, password);
      if (response == 406) {
        Alert.alert(strings.err_invalid_password);
      } else {
        Alert.alert(strings.err_invalid_email);
      }
    } else {
      Alert.alert(strings.fill_all);
    }
  }
  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 10,
        backgroundColor: '#000',
      }}>
      <ScrollView>
        <Image
          style={s.img}
          source={require('../../assets/img/boy_login.png')}
          resizeMode="contain"
        />
        <InputView color={colors.game_title}>
          <Icon name="user" color={colors.game_title} size={25} />
          <TextInput
            style={s.input}
            placeholder={strings.email}
            placeholderTextColor="#fff"
            value={email}
            onChangeText={t => setEmail(t)}
          />
        </InputView>
        <InputView color={colors.btn_editar}>
          <LockIcon name="lock" color={colors.btn_editar} size={25} />
          <TextInput
            style={s.input}
            placeholder={strings.password}
            placeholderTextColor="#fff"
            value={password}
            onChangeText={t => setPassword(t)}
          />
        </InputView>
        <TouchableOpacity
          style={{
            maxWidth: '60%',
            alignSelf: 'flex-end',
            marginRight: 10,
            marginTop: 10,
          }}>
          <Text style={{color: '#fff', fontSize: 13}}>
            {strings.recovery_password}
          </Text>
        </TouchableOpacity>
        <View style={{marginHorizontal: 10, marginTop: 15}}>
          <Btn method={handleLogin} title={strings.enter} />
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  img: {
    height: 300,
  },
  input: {
    flex: 1,
    width: '100%',
    fontSize: 17,
  },
});

const InputView = styled.View`
  margin-top: 10px;
  border: 2px solid ${props => props.color};
  border-radius: 9px;
  padding-left: 10px;
  flex-direction: row;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;
`;
export default Login;
