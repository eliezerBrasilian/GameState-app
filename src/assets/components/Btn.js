import {colors} from '../colors';
import {strings} from '../strings';
import {TouchableOpacity, Text} from 'react-native';
function Btn() {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors.btn_editar,
        width: '100%',
        padding: 7,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{color: '#000', fontWeight: '500', fontSize: 19}}>
        {strings.start}
      </Text>
    </TouchableOpacity>
  );
}

export default Btn;
