import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  ImageBackground,
} from 'react-native';
import {useState, useContext, useEffect} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import {AppContext} from '../../contexts/AppContext';
import {colors} from '../../assets/colors';
import {strings} from '../../assets/strings';
import api from '../../services/api';
import ShareIcon from 'react-native-vector-icons/FontAwesome';
import {useNavigation, useIsFocused} from '@react-navigation/native';
function Card({data}) {
  const nav = useNavigation();
  const isFocused = useIsFocused();
  const {updateInfo, setUpdateInfo} = useContext(AuthContext);
  let {nome, capa, id, finisheddate, nome_console, id_console} = data;
  const [gameName] = useState(nome);
  const [gameCover] = useState(capa);
  const [gameId] = useState(id);
  const [gameFinishedDate] = useState(finisheddate);
  const [consoleName] = useState(nome_console);
  const [consoleId] = useState(id_console);
  useEffect(() => {
    if (isFocused) {
      // var string = capa;
      // var parts = string.split('/cache/');
      // var conteudo = parts[1];
      console.log(data); // rn_image_picker_lib_temp_2324df2f-023d-4386-827a-cba48eca8e7f.jpg
      // setGameCover(conteudo);
    }
  }, []);
  function editGamePopUp() {
    nav.navigate('PopUpEditGame', {
      gameId: Number(gameId),
      gameCover: String(gameCover),
      gameFinishedDate: String(gameFinishedDate),
      gameName: String(gameName),
      consoleId: Number(consoleId),
    });
  }

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
        <ImageBackground
          source={{uri: gameCover}}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          resizeMode="cover">
          <TouchableOpacity style={{borderWidth: 1}}>
            <ShareIcon name="share-alt" size={50} color="#fff" />
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <View style={s.footer}>
        <Text style={s.title}>{gameName}</Text>
        <View style={s.footer_top}>
          <Image
            style={s.icone}
            source={require('../../assets/img/manete_.png')}
            resizeMode="contain"
          />
          <Text style={[s.title, {fontSize: 17}]}>{consoleName}</Text>
        </View>
        {finisheddate !== '' && (
          <View style={s.footer_top}>
            <Image
              style={s.icone}
              source={require('../../assets/img/finished_.png')}
              resizeMode="contain"
            />
            <Text style={[s.title, {fontSize: 16, fontWeight: '500'}]}>
              {strings.finished_at} {gameFinishedDate}
            </Text>
          </View>
        )}
      </View>
      <View style={s.btns}>
        <TouchableOpacity
          onPress={editGamePopUp}
          style={[s.btn, {backgroundColor: '#2B2A4C'}]}>
          <Text style={s.btnText}>{strings.edit}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={deleteGame}
          style={[s.btn, {backgroundColor: '#B31312'}]}>
          <Text style={s.btnText}>{strings.delete}</Text>
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
export default Card;
