import FastImage from 'react-native-fast-image';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {strings} from '../../assets/strings';
function NoGames() {
  const color = '#000';
  return (
    <View style={{alignItems: 'center'}}>
      <FastImage
        source={require('../../assets/img/plane_.gif')}
        style={{width: 200, height: 200}}
        resizeMode={FastImage.resizeMode.contain}
      />
      <TouchableOpacity>
        <Text style={[s.text, {color: color, margin: 15}]}>
          {strings.no_games}
        </Text>

        <Text style={[s.text, {color: color}]}>{strings.adicione_ja}</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default NoGames;
