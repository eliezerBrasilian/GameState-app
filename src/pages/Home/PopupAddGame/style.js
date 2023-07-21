import {StyleSheet} from 'react-native';
import {styled} from 'styled-components';
const s = StyleSheet.create({
  inputContainer: {
    height: 50,
    padding: 10,
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 10,
    color: '#000',
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
    color: '#000',
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
    color: '#000',
  },
});

const MainView = styled.View`
  flex: 1;
`;
const OpacoView = styled.View`
  flex: 1;
  width: 100%;
  background-color: 'rgba(0, 0, 0, 0.8)';
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const PopUpView = styled.ImageBackground`
  flex: 1;
  border-radius: 10px;
  padding: 10px;
  margin-top: 20px;
`;
const Header = styled.View`
  align-items: center;
`;
const Title = styled.Text`
  color: #000;
  font-weight: 700;
  font-size: 24px;
`;

const Body = styled.View``;
const InputView = styled.View`
  align-items: flex-start;
  width: 100%;
`;
const Label = styled.Text`
  color: #000;
  font-weight: 500;
  font-size: 18px;
`;

export {
  s,
  MainView,
  OpacoView,
  PopUpView,
  Header,
  Title,
  Body,
  InputView,
  Label,
};
