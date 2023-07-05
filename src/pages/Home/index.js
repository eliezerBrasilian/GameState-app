import {View, FlatList, ActivityIndicator, Modal, Text} from 'react-native';
import {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import api from '../../services/api';
import Header from './Header';
import Card from './Card';
import NoConnection from './NoConnection';
import NoGames from './NoGames';
import BtnAdd from './BtnAdd';
import PopUpAddGame from './PopUpAddGame';
import {PacmanIndicator} from 'react-native-indicators';

function Home() {
  const {user, updateInfo, isPopUpVisible} = useContext(AuthContext);
  const [games, setGames] = useState([]);
  const [connection, setConnection] = useState(true);
  const [page, setPage] = useState(1);
  const [isFetching, setFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isEndReached, setEndReached] = useState(false); // Novo estado
  const [isGamesEmpty, setGamesEmpty] = useState(false); // Novo estado

  useEffect(() => {
    setGames([]);
    setEndReached(false); // Reinicia o estado isEndReached ao atualizar updateInfo
    reLoadGames();
  }, [updateInfo]);

  useEffect(() => {
    loadGames();
  }, []);

  async function reLoadGames() {
    console.log('RELOADING GAMES - HOME/index.js');
    setFetching(true);

    try {
      const response = await api.get(`/games/${user.id}/${1}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setGames(response.data);
      if (response.data.length === 0) {
        setHasMore(false);
        setGamesEmpty(true);
      } else {
        setHasMore(true);
      }
    } catch (error) {
      console.error('erro: ' + error);
    } finally {
      setFetching(false);
    }
  }

  async function loadGames() {
    if (isFetching || !hasMore || isEndReached) return;
    setFetching(true);

    try {
      const response = await api.get(`/games/${user.id}/${page}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.data.length === 0) {
        setHasMore(false);
        setGamesEmpty(true);
      } else {
        setGames([...games, ...response.data]);
        setPage(prevPage => prevPage + 1);
        console.log(response.data);
      }
    } catch (error) {
      console.error('erro: ' + error);
    } finally {
      setFetching(false);
    }
  }

  return (
    <View
      style={{
        backgroundColor: '#000',
        flex: 1,
      }}>
      <Header />

      {hasMore ? (
        <FlatList
          data={games}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <Card data={item} />}
          onEndReached={RenderFooter}
          onEndReachedThreshold={0.1}
          ListFooterComponent={<RenderFooter load={isFetching} />}
        />
      ) : (
        <NoGames />
      )}

      <BtnAdd />
      {isPopUpVisible && <PopUpAddGame />}
    </View>
  );
}
function RenderFooter({load}) {
  if (!load) return null;

  return (
    <View style={{paddingVertical: 20}}>
      <PacmanIndicator color="#fff" />
    </View>
  );
}
export default Home;
