import {styled} from 'styled-components';
import {StyleSheet} from 'react-native';
const s = StyleSheet.create({
  gameCoverImg: {
    height: 200,
    borderRadius: 20,
  },
  inputContainer: {
    height: 50,
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'red',
    width: '100%',
    borderRadius: 10,
    color: '#fff',
    fontSize: 17,
  },

  btn: {
    backgroundColor: 'black',
    height: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 10,
  },
  btnText: {
    fontSize: 17,
    color: '#fff',
    fontWeight: '400',
  },
  dropdown: {
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    backgroundColor: '#eeee',
    width: '100%',
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#fff',
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: '#fff',
  },
});

const MainView = styled.View`
  flex: 1;
  margin: 10px;
`;

const Header = styled.View`
  align-items: center;
`;
const Title = styled.Text`
  color: #fff;
  font-weight: 700;
  font-size: 24px;
`;

const Body = styled.View`
  flex: 1;
  margin-top: 10px;
`;

const Footer = styled.View``;

export {MainView, Header, Footer, Title, Body, s};
