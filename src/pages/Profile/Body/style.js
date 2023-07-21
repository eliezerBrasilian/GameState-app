import {StyleSheet} from 'react-native';
import {colors} from '../../../assets/colors';
const s = StyleSheet.create({
  container: {
    marginTop: 40,
    alignItems: 'center',
  },
  saveUsernameBtn: {
    width: '40%',
    backgroundColor: 'red',
    borderColor: colors.btn_editar,
    borderStyle: 'solid',
    borderWidth: 2,
    paddingHorizontal: 10,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveUsernameText: {
    color: '#000',
    fontSize: 19,
  },
  img: {
    height: 202,
    width: 202,
    borderRadius: 101,
  },
  btnChangePhoto: {
    marginTop: 20,
    borderColor: colors.btn_editar,
    borderStyle: 'solid',
    borderWidth: 2,
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 9,
  },
  belowArea: {marginTop: 50, width: '100%'},

  label: {
    fontSize: 16,
    color: '#000',
    fontWeight: '700',
  },
  inputArea: {
    borderColor: colors.btn_editar,
    borderStyle: 'solid',
    borderWidth: 2,
    paddingHorizontal: 10,
    borderRadius: 9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  input: {
    color: '#000',
    flex: 1,
    fontSize: 19,
    height: 40,
  },
  icon: {
    height: 20,
    width: 30,
  },
  btnText: {
    fontWeight: '700',
    // color: '#000',
  },
  btnDestroyAds: {
    backgroundColor: colors.btn_editar,
    marginTop: 15,
    paddingHorizontal: 50,
    paddingVertical: 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9,
    flexDirection: 'row',
  },
});
export {s};
