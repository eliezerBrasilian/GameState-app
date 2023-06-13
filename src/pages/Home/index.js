import {View, FlatList, ActivityIndicator} from 'react-native';
import {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import api from '../../services/api';
import Header from './Header';
import Card from './Card';
import NoConnection from './NoConnection';
import {colors} from '../../assets/colors';
colors;
function Home() {
  const {saveGame, user} = useContext(AuthContext);
  const [games, setGames] = useState([]);
  const [connection, setConnection] = useState(true);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    loadGames();
  }, []);

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
        console.log(games.length);
        setLoading(false);
        setGames(response.data.games);
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
          <FlatList
            data={games}
            keyExtractor={(item, index) => index.toString()}
            renderItem={item => <Card data={item} />}
          />
        )}
      </View>
    );
  }
}

export default Home;

/*  async function handleSavingGame() {
    let game = {
      id_usuario: user.id,
      id_console: 6,
      nome: 'Falcon',
      capa: 'https://i.pinimg.com/originals/33/0e/fd/330efde622f2c9e64dc52b48b77c1da9.jpg',
    };
    await saveGame(game);
  }
  */
