import {ImageBackground, ScrollView} from 'react-native';
import Header from './Header';
import Body from './Body';
function Profile() {
  return (
    <ImageBackground
      style={{flex: 1, paddingHorizontal: 15}}
      source={require('../../assets/img/background_1.png')}>
      <ScrollView>
        <Header />
        <Body />
      </ScrollView>
    </ImageBackground>
  );
}

export default Profile;
