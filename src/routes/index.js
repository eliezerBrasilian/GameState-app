import AuthRoutes from './auth.routes';
import {View} from 'react-native';
import {useContext} from 'react';
import {AuthContext} from '../contexts/AuthContext';
import AppRoutes from './app.routes';
export default function Routes() {
  const {signed} = useContext(AuthContext);
  const loading = false;

  return signed ? <AppRoutes /> : <AuthRoutes />;
}
