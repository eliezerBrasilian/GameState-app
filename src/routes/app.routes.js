import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
const Stack = createNativeStackNavigator();
function AppRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

export default AppRoutes;
