import {View, ScrollView} from 'react-native';
import Header from './Header';
import Body from './Body';
function Profile() {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
      }}>
      <ScrollView>
        <Header />
        <Body />
      </ScrollView>
    </View>
  );
}

export default Profile;
