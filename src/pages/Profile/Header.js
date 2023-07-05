import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {colors} from '../../assets/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

function Header({marginTop = 20, title = 'Perfil'}) {
  const nav = useNavigation();
  function goBack() {
    nav.goBack();
  }

  return (
    <View style={{marginTop: marginTop}}>
      <TouchableOpacity style={s.clickable} onPress={goBack}>
        <Icon name="chevron-left" size={20} color={colors.btn_editar} />
        <Text style={s.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  clickable: {
    flexDirection: 'row',
    columnGap: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '700',
  },
});

export default Header;
