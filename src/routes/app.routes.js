import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../pages/Home';

const Stack = createNativeStackNavigator();
function AppRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

export default AppRoutes;
