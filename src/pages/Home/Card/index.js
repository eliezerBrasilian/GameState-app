import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Alert,
  ToastAndroid,
} from 'react-native';
import {useState, useContext, useMemo, useRef, useEffect} from 'react';
import {AuthContext} from '../../../contexts/AuthContext';
import {strings} from '../../../assets/strings';
import ShareIcon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {s} from './style';
import Share from 'react-native-share';
import ViewShot, {captureRef} from 'react-native-view-shot';
import firestore from '@react-native-firebase/firestore';
import * as Animatable from 'react-native-animatable';
import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : strings.interstitial_ad;
const interstitial = InterstitialAd.createForAdRequest(adUnitId);
function Card(props) {
  const viewRef = useRef(null);
  const nav = useNavigation();
  const {updateInfo, setUpdateInfo, user} = useContext(AuthContext);
  const [gameId] = useState(props.data.key);
  const [consoleId] = useState(props.data.console);
  const [gameName] = useState(props.data.name);
  const [gameCover] = useState(props.data.cover);
  const [gameDescription] = useState(props.data.description);
  const [gameFinishedDate] = useState(props.data.finishedDate);
  const [consoleName, setConsoleName] = useState('');
  const [imageSize, setImageSize] = useState(null);
  const [isImageLoaded, setImageLoaded] = useState(false);
  const touchableOpacityRef = useRef(null);

  useEffect(() => {
    interstitial.load();
  }, []);

  useEffect(() => {
    Image.getSize(gameCover, (width, height) => {
      console.log('aqui');
      setImageSize({width: width, height: height});
      setImageLoaded(true);
    });
  }, [gameCover]);

  const startAnimation = () => {
    touchableOpacityRef.current?.animate(
      {
        0: {scale: 0.8, translateY: 0},
        0.5: {scale: 1.1, translateY: 50},
        1: {scale: 1.0, translateY: 0},
      },
      1000,
    );
  };
  function handleImageLoad(e) {
    console.log('carregando');
    const {width, height} = e.nativeEvent;
    startAnimation();
    setImageLoaded(true);
  }

  useMemo(() => {
    if (consoleId == 1) {
      setConsoleName('XBOX');
    } else if (consoleId == 2) {
      setConsoleName('XBOX 360');
    } else if (consoleId == 3) {
      setConsoleName('XBOX ONE');
    } else if (consoleId == 4) {
      setConsoleName('PlayStation 1');
    } else if (consoleId == 5) {
      setConsoleName('PlayStation 2');
    } else if (consoleId == 6) {
      setConsoleName('PlayStation 3');
    } else if (consoleId == 7) {
      setConsoleName('PlayStation 4');
    } else if (consoleId == 8) {
      setConsoleName('PlayStation 5');
    } else if (consoleId == 9) {
      setConsoleName('PPPSSPP');
    } else if (consoleId == 10) {
      setConsoleName('GBA');
    } else if (consoleId == 11) {
      setConsoleName('SNES');
    } else if (consoleId == 12) {
      setConsoleName('GAMEBOY COLOR');
    } else if (consoleId == 13) {
      setConsoleName('MAME');
    } else if (consoleId == 14) {
      setConsoleName('MEGA DRIVE');
    } else if (consoleId == 15) {
      setConsoleName('STEAM');
    } else if (consoleId == 16) {
      setConsoleName('XBOX CLOUD');
    }
  }, []);

  const handleCapture = async () => {
    ToastAndroid.show(strings.wait, ToastAndroid.SHORT);
    await captureRef(viewRef, {
      format: 'jpg',
      quality: 1.0,
    })
      .then(uri => {
        const description = `${strings.game_i_finished_name} ${gameName}. ${strings.gamestate_link}`;
        shareImage(uri, description);
      })
      .catch(error => console.error('Erro ao capturar a imagem:', error))
      .finally(() => {
        startAnimation();
      });
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
      if (interstitial.loaded) {
        interstitial.show();
      } else {
        interstitial.load();
      }
    }
  };

  async function deleteGame() {
    try {
      await firestore().collection('games').doc(gameId).delete();
      Alert.alert(strings.game_deleted);
    } catch (error) {
      Alert.alert(strings.error_on_deleting_game);
    }
  }
  function editGamePopUp() {
    nav.navigate('PopUpEditGame', {
      gameId: String(gameId),
      gameCover: String(gameCover),
      gameFinishedDate: String(gameFinishedDate),
      gameDescription: String(gameDescription),
      gameName: String(gameName),
      consoleId: Number(consoleId),
    });
  }

  return (
    <View style={s.container}>
      <ViewShot ref={viewRef} style={s.container}>
        <View style={s.cover}>
          {isImageLoaded && (
            <Image
              source={{uri: gameCover}}
              onLoadStart={handleImageLoad}
              onLoadEnd={handleImageLoad}
              style={{
                borderRadius: 10,
                flex: 1,
                aspectRatio: imageSize.width / imageSize.height,
              }}
              resizeMode="cover"
            />
          )}

          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              alignItems: 'flex-end',
              paddingTop: 25,
              paddingRight: 7,
            }}>
            <Animatable.View
              ref={touchableOpacityRef}
              style={{
                backgroundColor: 'rgba(204, 187, 239, 0.8)',
                padding: 10,
                rowGap: 20,
              }}>
              <TouchableOpacity activeOpacity={1} onPress={handleCapture}>
                <ShareIcon name="share-alt" size={25} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={editGamePopUp}>
                <ShareIcon name="edit" size={25} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={deleteGame}>
                <ShareIcon name="trash" size={25} color="#fff" />
              </TouchableOpacity>
            </Animatable.View>
          </View>
          {gameDescription && (
            <>
              <Text style={{color: '#000', fontWeight: '700', fontSize: 19}}>
                {consoleName}
              </Text>
              <Text numberOfLines={2} style={{color: '#000', fontSize: 16}}>
                {gameDescription}
              </Text>
            </>
          )}
        </View>
      </ViewShot>
    </View>
  );
}

export default Card;
