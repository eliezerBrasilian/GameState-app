import FastImage from 'react-native-fast-image';
import {View, Text, TouchableOpacity} from 'react-native';
import {strings} from '../../assets/strings';
function NoConnection({loadGames}) {
  function handleLoadGames() {
    loadGames();
  }
  return (
    <View style={{alignItems: 'center'}}>
      <FastImage
        source={require('../../assets/img/gif_.gif')}
        style={{width: 200, height: 200}}
        resizeMode={FastImage.resizeMode.contain}
      />
      <TouchableOpacity onPress={handleLoadGames}>
        <Text style={{fontSize: 20, color: '#fff', textAlign: 'center'}}>
          {strings.no_connection}
        </Text>

        <Text style={{fontSize: 20, color: '#fff', textAlign: 'center'}}>
          {strings.reload}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default NoConnection;
