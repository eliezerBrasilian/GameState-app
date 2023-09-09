import {View, Dimensions} from 'react-native';
import {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import Header from './Header';
import Card from './Card';
import NoGames from './NoGames';
import OpenPopup from './OpenPopup';
import PopUpAddGame from './PopupAddGame';
import firestore from '@react-native-firebase/firestore';
import FlatListHeader from './FlatlistHeader';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import {strings} from '../../assets/strings';
import MasonryList from '@react-native-seoul/masonry-list';
const adUnitId = __DEV__ ? TestIds.BANNER : strings.banner_ad;
function Home() {
  const {user, updateInfo, isPopUpVisible} = useContext(AuthContext);
  const [games, setGames] = useState([]);
  const [gamesEmpty, setGamesEmpty] = useState(false);
  const [gamesAmount, setGamesAmount] = useState(0);
  const [tablet, SetTablet] = useState(false);
  const {width} = Dimensions.get('window');
  const [numColumns, setNumColumns] = useState(2);
  useEffect(() => {
    getOrientation();
    loadGames();
  }, [updateInfo]);

  function getOrientation() {
    console.log(width);
    if (width >= 500) setNumColumns(3);
  }
  async function loadGames() {
    setGames([]);
    try {
      await firestore()
        .collection('games')
        .orderBy('createdAt', 'desc')
        .where('userId', '==', user.user_id)
        .onSnapshot(querySnapshot => {
          if (querySnapshot.empty) {
            setGamesEmpty(true);
          } else {
            console.log('size: ' + querySnapshot.size);
            setGamesEmpty(false);
            setGamesAmount(querySnapshot.size);
          }
          const aux = [];
          querySnapshot.forEach(i => {
            aux.push({key: i.id, ...i.data()});
          });
          setGames(aux);
          games.map(i => {
            console.log(i.key);
          });
        });
    } catch (error) {
      console.log('error Home/index.js - loadGames(): ' + error);
    }
  }

  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
      }}>
      <Header />

      {gamesEmpty ? (
        <NoGames />
      ) : (
        <MasonryList
          data={games}
          keyExtractor={(item, index) => item.key.toString()}
          renderItem={({item}) => <Card data={item} />}
          onEndReachedThreshold={0.1}
          numColumns={numColumns}
          ListHeaderComponent={<FlatListHeader amount={gamesAmount} />}
          contentContainerStyle={{padding: 10}}
          ListFooterComponent={
            <BannerAd
              unitId={adUnitId}
              size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true,
              }}
            />
          }
        />
      )}

      <OpenPopup />
      {isPopUpVisible && <PopUpAddGame />}
    </View>
  );
}

export default Home;
