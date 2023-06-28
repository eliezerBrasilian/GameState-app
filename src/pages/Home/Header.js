import styled from 'styled-components';
import {View, TouchableOpacity} from 'react-native';
import {useContext, useState, useEffect} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import {useNavigation} from '@react-navigation/native';
import {SkypeIndicator} from 'react-native-indicators';
import api from '../../services/api';
import LinearGradient from 'react-native-linear-gradient';
function Header() {
  const [isLoadingPhoto, setLoadingPhoto] = useState(true);
  const [profilePhoto, setProfilePhoto] = useState(true);
  const nav = useNavigation();
  const {user} = useContext(AuthContext);
  function goToProfile() {
    nav.navigate('Profile');
  }

  useEffect(() => {
    getProfilePhoto();
  }, []);
  async function getProfilePhoto() {
    await api
      .get(`user/${user.id}/profile/photo`)
      .then(r => {
        console.log(r.data.profilePhoto[0].profile_photo);
        setProfilePhoto(r.data.profilePhoto[0].profile_photo);
        setLoadingPhoto(false);
      })
      .catch(e => {
        console.log(e);
        setLoadingPhoto(false);
      });
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
          <Name>{user.nome}</Name>
          {user.username === undefined ? (
            <Username>@arturgamer</Username>
          ) : (
            <Username>@{user.username}</Username>
          )}
        </View>
      </View>
      <PremiumIcon source={require('../../assets/img/premium_.png')} />
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
