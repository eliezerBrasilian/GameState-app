import {styled} from 'styled-components';
import {StyleSheet} from 'react-native';
const textColor = '#000';
const s = StyleSheet.create({
  scrollview: {flex: 1, backgroundColor: '#fff'},
  gameCoverImg: {
    height: 200,
    borderRadius: 20,
  },

  btn: {
    backgroundColor: '#000',
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
    fontWeight: '600',
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
    color: textColor,
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
    color: textColor,
  },
});

const MainView = styled.View`
  flex: 1;
  margin: 10px;
`;

const Header = styled.View`
  align-items: center;
`;

const Body = styled.View`
  flex: 1;
  margin-top: 10px;
`;

export {MainView, Header, Body, s};
