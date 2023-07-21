import {useState, useContext} from 'react';
import {
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  Text,
  Alert,
} from 'react-native';
import {AuthContext} from '../../contexts/AuthContext';
import Icon from 'react-native-vector-icons/AntDesign';
import LockIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../assets/colors';
import {strings} from '../../assets/strings';
import Btn from '../../assets/components/Btn';
import Input from '../../assets/components/Input';
import {s} from './style';
import {useNavigation} from '@react-navigation/native';
function Login() {
  const nav = useNavigation();
  const {login} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function goToSignUp() {
    nav.navigate('SignUp');
  }
  async function handleLogin() {
    if (email.trim() !== '' && password.trim() !== '') {
      const response = await login(email, password);
      if (response == 400) {
        Alert.alert(strings.err_invalid_email);
      } else if (response == 404) {
        Alert.alert(strings.user_not_found);
      } else if (response == 406) {
        Alert.alert(strings.err_invalid_password);
      } else if (response == 504) {
        Alert.alert(strings.too_many_requests);
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
        <Input
          color={colors.game_title}
          placeholder={strings.email}
          value={email}
          setValue={setEmail}
          keyboardType="email-address"
          icon={<Icon name="user" color={colors.game_title} size={25} />}
        />
        <Input
          color={colors.btn_editar}
          placeholder={strings.password}
          value={password}
          setValue={setPassword}
          isPassword={true}
          icon={<LockIcon name="lock" color={colors.btn_editar} size={25} />}
        />

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
        <TouchableOpacity onPress={goToSignUp} style={s.donHaveAccountBtn}>
          <Text style={s.donHaveAccountText}>{strings.dont_have_account}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default Login;
