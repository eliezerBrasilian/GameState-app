import {colors} from '../colors';
import {strings} from '../strings';
import {TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import {useContext} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
function Btn({method, title = strings.start}) {
  const {isLoadingAuth, setLoadingAuth} = useContext(AuthContext);
  return (
    <TouchableOpacity
      onPress={method}
      style={{
        backgroundColor: colors.btn_editar,
        width: '100%',
        padding: 8,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {isLoadingAuth ? (
        <ActivityIndicator color="#000" size={25} />
      ) : (
        <Text style={{color: '#000', fontWeight: '500', fontSize: 19}}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

export default Btn;
