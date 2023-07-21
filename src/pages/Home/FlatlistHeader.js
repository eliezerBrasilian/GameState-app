import {View, Text, StyleSheet} from 'react-native';
export default function FlatListHeader({amount}) {
  return (
    <Text
      style={{
        fontSize: 22,
        color: '#000',
        fontWeight: '500',
        textAlign: 'center',
      }}>
      Total de games zerados: {amount}
    </Text>
  );
}
