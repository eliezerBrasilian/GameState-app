import {View, FlatList, ActivityIndicator, Modal} from 'react-native';
import {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import api from '../../services/api';
import Header from './Header';
import Card from './Card';
import NoConnection from './NoConnection';
import {colors} from '../../assets/colors';
import NoGames from './NoGames';
import BtnAdd from './BtnAdd';
import PopUpAddGame from './PopUpAddGame';
function Home() {
  const {user, updateInfo, isGamesEmpty, setGameEmpty, isPopUpVisible} =
    useContext(AuthContext);
  const [games, setGames] = useState([]);
  const [connection, setConnection] = useState(true);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    //setGames([]);
    loadGames();
  }, [updateInfo]);

  async function loadGames() {
    setLoading(true);
    await api
      .get(`/games/${user.id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(response => {
        console.log(response.data.games);
        setGames(response.data.games);
        console.log(response.data.games.length === 0);
        if (response.data.games.length === 0) {
          setGameEmpty(true);
        } else {
          setGameEmpty(false);
        }
        console.log(isGamesEmpty);
        setLoading(false);
      })
      .catch(e => {
        setLoading(false);
        setConnection(false);
        console.log('erro ao trazer jogos: ' + e);
      });
  }

  if (!connection) {
    return (
      <View
        style={{
          backgroundColor: '#000',
          flex: 1,
        }}>
        <Header />
        <View
          style={{
            backgroundColor: '#000',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <NoConnection loadGames={loadGames} />
        </View>
      </View>
    );
  } else if (isGamesEmpty) {
    return (
      <View style={{backgroundColor: '#000', flex: 1}}>
        <Header />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          <NoGames />
          <BtnAdd />
          {isPopUpVisible && <PopUpAddGame loadGames={loadGames} />}
        </View>
      </View>
    );
  } else {
    return (
      <View
        style={{
          backgroundColor: '#000',
          flex: 1,
        }}>
        <Header />

        {isLoading ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}>
            <ActivityIndicator size={40} color={colors.game_title} />
          </View>
        ) : (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <FlatList
              data={games}
              keyExtractor={(item, index) => index.toString()}
              renderItem={item => <Card data={item} />}
            />
            <BtnAdd />
            {isPopUpVisible && <PopUpAddGame />}
          </View>
        )}
      </View>
    );
  }
}

export default Home;
