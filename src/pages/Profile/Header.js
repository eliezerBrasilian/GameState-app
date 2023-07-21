import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {useContext} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import {colors} from '../../assets/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {strings} from '../../assets/strings';
import api from '../../services/api';

function Header({marginTop = 20, title = strings.profile_title}) {
  const {username, user} = useContext(AuthContext);
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
    color: '#000',
    fontWeight: '700',
  },
});

export default Header;
