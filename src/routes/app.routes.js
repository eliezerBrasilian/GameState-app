import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import PopUpEditGame from '../pages/Home/EditGame/EditGame';

const Stack = createNativeStackNavigator();
function AppRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        orientation: 'portrait',
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        options={{animation: 'slide_from_left'}}
        name="Profile"
        component={Profile}
      />
      <Stack.Screen name="PopUpEditGame" component={PopUpEditGame} />
    </Stack.Navigator>
  );
}

export default AppRoutes;
