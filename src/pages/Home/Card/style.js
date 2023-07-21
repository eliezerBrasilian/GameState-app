import {StyleSheet} from 'react-native';

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cover: {
    margin: 10,
  },
  title: {
    fontSize: 22,
    color: '#000',
    fontWeight: '800',
    fontStyle: 'italic',
  },
  footer: {
    alignItems: 'center',
    minHeight: 120,
    backgroundColor: '#DDE6ED',
    borderRadius: 9,
    marginHorizontal: 10,
    rowGap: 2,
    padding: 10,
  },
  footer_top: {
    flexDirection: 'row',
    columnGap: 10,
    alignItems: 'center',
  },
  icone: {
    height: 26,
    width: 26,
  },
  btns: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    columnGap: 10,
    marginTop: 15,
  },
  btn: {
    paddingHorizontal: 15,
    width: '45%',
    borderRadius: 9,
    minHeight: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 17,
    color: '#fff',
  },
});

export {s};
