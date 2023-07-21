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
import {s} from '../Login/style';
import {useNavigation} from '@react-navigation/native';

function SignUp() {
  const nav = useNavigation();
  const {signUp} = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function goToLogin() {
    nav.navigate('Login');
  }
  async function handleSignUp() {
    if (
      name.trim() !== '' &&
      email.trim() !== '' &&
      password.trim() !== '' &&
      username.trim() !== ''
    ) {
      const response = await signUp(name, email, password, username);
      if (response == 400) {
        Alert.alert(strings.err_invalid_email);
      } else if (response == 406) {
        Alert.alert(strings.email_already_in_use);
      } else if (response == 411) {
        Alert.alert(strings.weak_password);
      } else if (response == 500) {
        Alert.alert(strings.intern_error);
      } else if (response == 200) {
        Alert.alert(strings.game_state_title, strings.account_created, [
          {text: strings.thats_it, onPress: () => goToLogin()},
        ]);
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
          color={colors.game_title}
          placeholder={strings.name}
          value={name}
          setValue={setName}
          autoCapitalize="words"
          icon={<Icon name="user" color={colors.game_title} size={25} />}
        />

        <Input
          color={colors.btn_editar}
          placeholder={strings.create_password}
          value={password}
          setValue={setPassword}
          isPassword={true}
          icon={<LockIcon name="lock" color={colors.btn_editar} size={25} />}
        />

        <View style={{marginHorizontal: 10, marginTop: 15}}>
          <Btn method={handleSignUp} title={strings.sign_up} />
        </View>
        <TouchableOpacity onPress={goToLogin} style={s.donHaveAccountBtn}>
          <Text style={s.donHaveAccountText}>
            {strings.already_have_an_account}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default SignUp;
