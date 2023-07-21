import styled from 'styled-components';
import {View, TouchableOpacity} from 'react-native';
import {useContext, useState, useEffect} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {SkypeIndicator} from 'react-native-indicators';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
function Header() {
  const {user, username} = useContext(AuthContext);
  const [isLoadingPhoto, setLoadingPhoto] = useState(true);
  const [profilePhoto, setProfilePhoto] = useState(user.profilePhoto);
  const nav = useNavigation();
  const [username_, setUsername] = useState(username);
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
                height: 52,
                width: 52,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {profilePhoto == null ? (
                <ProfileIcon
                  style={{marginTop: 5}}
                  source={require('../../assets/img/user_profile.png')}
                />
              ) : (
                <ProfileIcon source={{uri: profilePhoto}} />
              )}
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
  height: 80px;
  background-color: #fff;
  flex-direction: row;
  padding-left: 20px;
  padding-right: 20px;
  align-items: center;
  justify-content: space-between;
`;
const ProfileIcon = styled.Image`
  height: 50px;
  width: 50px;
  border-radius: 31px;
`;
const Name = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: #000;
`;
const Username = styled.Text`
  font-size: 17px;
  font-weight: 500;
  color: #000;
`;

const PremiumIcon = styled.Image`
  height: 60px;
  width: 60px;
`;
