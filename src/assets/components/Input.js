import styled from 'styled-components';
import {TextInput, StyleSheet} from 'react-native';
function Input({
  color,
  placeholder,
  value,
  setValue,
  icon,
  keyboardType = 'default',
  isPassword = false,
  autoCapitalize = 'none',
}) {
  return (
    <InputView color={color}>
      {icon}
      <TextInput
        style={s.input}
        placeholder={placeholder}
        placeholderTextColor="#fff"
        value={value}
        onChangeText={t => setValue(t)}
        keyboardType={keyboardType}
        secureTextEntry={isPassword}
        autoCapitalize={autoCapitalize}
      />
    </InputView>
  );
}
const s = StyleSheet.create({
  input: {
    flex: 1,
    width: '100%',
    fontSize: 17,
    color: '#fff',
  },
});
const InputView = styled.View`
  margin-top: 10px;
  border: 2px solid ${props => props.color};
  border-radius: 9px;
  padding-left: 10px;
  flex-direction: row;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;
`;
export default Input;
