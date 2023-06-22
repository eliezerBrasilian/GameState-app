import {View, TouchableOpacity, Image, StyleSheet, Text} from 'react-native';
import {useState, useContext} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import {colors} from '../../assets/colors';
import {strings} from '../../assets/strings';
import api from '../../services/api';
function Card({data}) {
  const {updateInfo, setUpdateInfo} = useContext(AuthContext);
  let {nome, capa, id, finisheddate, nome_console} = data;
  const [gameName] = useState(nome);
  const [gameCover] = useState(capa);
  const [gameId] = useState(id);
  const [gameFinishedDate] = useState(finisheddate);
  const [consoleName] = useState(nome_console);

  async function deleteGame() {
    console.log('deletar: ' + gameId);
    await api
      .post(`/game/${gameId}`)
      .then(response => {
        console.log(response.data);
        setUpdateInfo(!updateInfo);
      })
      .catch(e => {
        console.log(e);
        setUpdateInfo(!updateInfo);
        console.log(updateInfo);
      });
  }
  return (
    <View style={s.container}>
      <View style={s.cover}>
        <Image
          source={{uri: gameCover}}
          style={{width: '100%', height: '100%', borderRadius: 12}}
          resizeMode="contain"
        />
      </View>
      <View style={s.footer}>
        <Text style={s.title}>{gameName}</Text>
        <View style={s.footer_top}>
          <Image
            style={s.icone}
            source={require('../../assets/img/manete_.png')}
            resizeMode="contain"
          />
          <Text style={s.title}>{consoleName}</Text>
        </View>
        {finisheddate !== '' && (
          <View style={s.footer_top}>
            <Image
              style={s.icone}
              source={require('../../assets/img/finished_.png')}
              resizeMode="contain"
            />
            <Text style={s.title}>
              {strings.finished_at} {gameFinishedDate}
            </Text>
          </View>
        )}
      </View>
      <View style={s.btns}>
        <TouchableOpacity style={[s.btn, {backgroundColor: '#2B2A4C'}]}>
          <Text>{strings.edit}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={deleteGame}
          style={[s.btn, {backgroundColor: '#B31312'}]}>
          <Text>{strings.delete}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    flexDirection: 'column',
  },
  cover: {
    height: 300,
    padding: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    color: '#000',
    fontWeight: '700',
    fontStyle: 'italic',
  },
  footer: {
    alignItems: 'center',
    height: 120,
    backgroundColor: '#DDE6ED',
    borderRadius: 9,
    marginHorizontal: 10,
    rowGap: 2,
  },
  footer_top: {
    flexDirection: 'row',
    columnGap: 10,
    alignItems: 'center',
  },
  icone: {
    height: 30,
    width: 30,
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
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    color: '#fff',
  },
});
export default Card;
