import AuthRoutes from './auth.routes';
import {useContext} from 'react';
import {AuthContext} from '../contexts/AuthContext';
import AppRoutes from './app.routes';
import {Text, View, Image} from 'react-native';
export default function Routes() {
  const {signed, isLoadingApp} = useContext(AuthContext);

  if (isLoadingApp) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000',
        }}>
        <Image
          style={{flex: 1}}
          resizeMode="contain"
          source={require('../assets/img/peakpx.jpg')}></Image>
        <Text style={{fontSize: 24, color: '#fff'}}>Gamestate</Text>
      </View>
    );
  } else return signed ? <AppRoutes /> : <AuthRoutes />;
}
