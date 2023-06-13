import FastImage from 'react-native-fast-image';
import {View, Text, TouchableOpacity} from 'react-native';
import {strings} from '../../assets/strings';
function NoGames() {
  return (
    <View style={{alignItems: 'center'}}>
      <FastImage
        source={require('../../assets/img/plane_.gif')}
        style={{width: 200, height: 200}}
        resizeMode={FastImage.resizeMode.contain}
      />
      <TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            color: '#fff',
            textAlign: 'center',
            marginTop: 15,
          }}>
          {strings.no_games}
        </Text>

        <Text
          style={{
            fontSize: 20,
            color: '#fff',
            textAlign: 'center',
            marginTop: 5,
          }}>
          {strings.adicione_ja}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default NoGames;
