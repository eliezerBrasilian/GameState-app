import {
  View,
  TouchableOpacity,
  Image,
  Text,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {useState, useContext, useEffect, useRef} from 'react';
import {AuthContext} from '../../../contexts/AuthContext';
import {strings} from '../../../assets/strings';
import api from '../../../services/api';
import ShareIcon from 'react-native-vector-icons/FontAwesome';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {s} from './style';
import Share from 'react-native-share';
import ViewShot, {captureRef} from 'react-native-view-shot';
import {BarIndicator} from 'react-native-indicators';
function Card({data}) {
  const viewRef = useRef(null);
  const nav = useNavigation();
  const {updateInfo, setUpdateInfo} = useContext(AuthContext);
  let {nome, capa, id, finisheddate, nome_console, id_console} = data;
  const [gameName] = useState(nome);
  const [gameCover] = useState(capa);
  const [gameId] = useState(id);
  const [gameFinishedDate] = useState(finisheddate);
  const [consoleName] = useState(nome_console);
  const [consoleId] = useState(id_console);
  const [isLoadingOnShare, setLoadingOnShare] = useState(false);
  const handleCapture = async () => {
    setLoadingOnShare(true);
    await captureRef(viewRef, {format: 'png', quality: 0.8})
      .then(uri => {
        const description = `${strings.game_i_finished_name} ${gameName}. ${strings.gamestate_link}`;
        shareImage(uri, description);
      })
      .catch(error => console.error('Erro ao capturar a imagem:', error));
  };

  const shareImage = (uri, description) => {
    const shareOptions = {
      title: strings.share_your_finished_game,
      message: description,
      url: uri,
    };

    try {
      const r = Share.open(shareOptions);
      console.log('Imagem compartilhada com sucesso:');
    } catch (e) {
      console.error('Erro ao compartilhar imagem:', e);
    } finally {
      setLoadingOnShare(true);
    }
  };
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
      <ViewShot ref={viewRef}>
        <View style={s.cover}>
          <Image
            source={{uri: gameCover}}
            style={{
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}
            resizeMode="cover"
          />

          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={handleCapture}>
              <ShareIcon name="share-alt" size={50} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={s.footer}>
          <Text style={s.title}>{gameName}</Text>
          <View style={s.footer_top}>
            <Image
              style={s.icone}
              source={require('../../../assets/img/manete_.png')}
              resizeMode="contain"
            />
            <Text style={[s.title, {fontSize: 17}]}>{consoleName}</Text>
          </View>
          {finisheddate !== '' && (
            <View style={s.footer_top}>
              <Image
                style={s.icone}
                source={require('../../../assets/img/finished_.png')}
                resizeMode="contain"
              />
              <Text style={[s.title, {fontSize: 16, fontWeight: '500'}]}>
                {strings.finished_at} {gameFinishedDate}
              </Text>
            </View>
          )}
        </View>
      </ViewShot>
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

export default Card;
