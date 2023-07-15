import styled from 'styled-components';
import {View, TouchableOpacity} from 'react-native';
import {useContext, useState, useEffect} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {SkypeIndicator} from 'react-native-indicators';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
function Header() {
  const [isLoadingPhoto, setLoadingPhoto] = useState(true);
  const [profilePhoto, setProfilePhoto] = useState('');
  const nav = useNavigation();
  const {user, username} = useContext(AuthContext);
  const [_username, setUsername] = useState(username);
  const isFocused = useIsFocused();
  function goToProfile() {
    nav.navigate('Profile');
  }

  useEffect(() => {
    if (isFocused) {
      getProfilePhoto();
    }
  }, [isFocused]);

  async function getProfilePhoto() {
    try {
      const photo = await AsyncStorage.getItem('@profilePhoto');
      setProfilePhoto(photo);
      setLoadingPhoto(false);
      // setUpdateInfo(true);
    } catch (e) {
      console.log('HOME - HEADER - ERROR ON BRING IMAGE');
    }
  }
  return (
    <HeaderView>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={goToProfile}>
          {isLoadingPhoto ? (
            <SkypeIndicator color="#fff" size={30} style={{marginRight: 20}} />
          ) : (
            <LinearGradient
              colors={['#4EF2F6', '#09168C', '#F8095A']}
              style={{
                borderRadius: 35,
                height: 70,
                width: 70,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ProfileIcon source={{uri: profilePhoto}} />
            </LinearGradient>
          )}
        </TouchableOpacity>
        <View style={{marginLeft: 10}}>
          <Name>{user.name}</Name>
          {user.username === undefined ? (
            <Username>@gamestate</Username>
          ) : (
            <Username>@{username}</Username>
          )}
        </View>
      </View>
      {user.isPremium && (
        <PremiumIcon source={require('../../assets/img/premium_.png')} />
      )}
    </HeaderView>
  );
}

export default Header;

const HeaderView = styled.View`
  height: 100px;
  background-color: black;
  flex-direction: row;
  padding-left: 20px;
  padding-right: 20px;
  align-items: center;
  justify-content: space-between;
`;
const ProfileIcon = styled.Image`
  height: 63px;
  width: 63px;
  border-radius: 31px;
`;
const Name = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: #fff;
`;
const Username = styled.Text`
  font-size: 17px;
  font-weight: 500;
  color: #fff;
`;

const PremiumIcon = styled.Image`
  height: 60px;
  width: 60px;
`;
