import AuthRoutes from './auth.routes';
import {useContext} from 'react';
import {AuthContext} from '../contexts/AuthContext';
import AppRoutes from './app.routes';
import {Text, View} from 'react-native';
import {UIActivityIndicator} from 'react-native-indicators';
export default function Routes() {
  const {signed, isLoadingAuth} = useContext(AuthContext);

  if (isLoadingAuth) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#000',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <UIActivityIndicator color="#fff" />
        <Text style={{fontSize: 24, color: '#fff'}}>Gamestate</Text>
      </View>
    );
  } else return signed ? <AppRoutes /> : <AuthRoutes />;
}
