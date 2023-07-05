import {styled} from 'styled-components';
import {TextInput, StyleSheet} from 'react-native';

export default function EditInput({
  label,
  placeholderText,
  placeholderTextColor,
  value,
  setValue,
}) {
  return (
    <InputView>
      <Label>{label}</Label>
      <TextInput
        style={s.inputContainer}
        placeholder={placeholderText}
        placeholderTextColor={placeholderTextColor}
        value={value}
        onChangeText={t => {
          setValue(t);
        }}
      />
    </InputView>
  );
}

const s = StyleSheet.create({
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
});
const InputView = styled.View`
  align-items: flex-start;
  width: 100%;
  margin-top: 20px;
`;
const Label = styled.Text`
  color: #fff;
  font-weight: 700;
  font-size: 19px;
  margin-left: 10px;
`;

export {InputView, Label};
