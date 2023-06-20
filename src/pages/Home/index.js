import {View, FlatList, ActivityIndicator, Modal, Text} from 'react-native';
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
  const [page, setPage] = useState(1);
  const [isFetching, setFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isEndReached, setEndReached] = useState(false); // Novo estado

  useEffect(() => {
    reLoadGames();
  }, [updateInfo]);

  useEffect(() => {
    setEndReached(false); // Reinicia o estado isEndReached ao atualizar updateInfo
    loadGames();
  }, []);

  async function reLoadGames() {
    setGames([]);
    console.log('esteve aqui reload');
    setFetching(true);

    try {
      const response = await api.get(`/games/${user.id}/${1}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setGames(response.data);
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
      } else {
        setGames(prevGames => [...prevGames, ...response.data]);
        setPage(prevPage => prevPage + 1);
      }
    } catch (error) {
      console.error('erro: ' + error);
    } finally {
      setFetching(false);
    }
  }

  const handleEndReached = () => {
    if (!isEndReached) {
      setEndReached(true);
      loadGames();
    }
  };
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
  } else if (games.length === 0) {
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
  } else
    return (
      <View
        style={{
          backgroundColor: '#000',
          flex: 1,
        }}>
        <Header />

        <FlatList
          data={games}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <Card data={item} />}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
          ListFooterComponent={<RenderFooter load={isFetching} />}
        />
        <BtnAdd />
        {isPopUpVisible && <PopUpAddGame />}
      </View>
    );
  // }

  function Items({data}) {
    console.log(data.capa);
    return (
      <View
        style={{
          backgroundColor: '#fff',
          marginTop: 20,
          height: 90,
        }}>
        <Text style={{color: '#000'}}>{data.capa}</Text>
      </View>
    );
  }
}
function RenderFooter({load}) {
  if (!load) return null;

  return (
    <View style={{paddingVertical: 20}}>
      <ActivityIndicator size="large" />
    </View>
  );
}
export default Home;
