import {Button, View} from 'react-native';
import {useContext} from 'react';
import {AuthContext} from '../../contexts/AuthContext';

function Login() {
  const {login} = useContext(AuthContext);
  async function handleLogin() {
    await login();
  }
  return (
    <View>
      <Button onPress={handleLogin} title="login" />
    </View>
  );
}

export default Login;
