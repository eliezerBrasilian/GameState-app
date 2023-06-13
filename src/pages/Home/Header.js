import styled from 'styled-components';
import {View, TouchableOpacity} from 'react-native';
function Header() {
  return (
    <HeaderView>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity>
          <ProfileIcon source={require('../../assets/img/profile_.png')} />
        </TouchableOpacity>
        <View style={{marginLeft: 10}}>
          <Name>Artur Silva</Name>
          <Username>@arturgamer</Username>
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
  height: 70px;
  width: 70px;
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
