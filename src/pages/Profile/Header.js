import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {colors} from '../../assets/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
function Header() {
  const nav = useNavigation();
  function goBack() {
    nav.goBack();
  }
  return (
    <View style={s.container}>
      <TouchableOpacity style={s.clickable} onPress={goBack}>
        <Icon name="chevron-left" size={20} color={colors.btn_editar} />
        <Text style={s.title}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  clickable: {
    flexDirection: 'row',
    columnGap: 10,
    width: 100,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '700',
  },
});

export default Header;
