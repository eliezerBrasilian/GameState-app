import {View, Button, FlatList, Text} from 'react-native';
import {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import api from '../../services/api';
function Home() {
  const {saveGame, user} = useContext(AuthContext);
  const [games, setGames] = useState([]);

  useEffect(() => {
    loadGames();
  }, []);

  async function loadGames() {
    try {
      const response = await api.post('/games', {id_usuario: user.id});
      console.log(response.data.games);
      setGames(response.data.games);
      at = true;
    } catch (e) {
      console.log('erro ao trazer jogos: ' + e);
    }
    console.log(games.length);
  }

  return (
    <View>
      <FlatList
        data={games}
        keyExtractor={(item, index) => index.toString()}
        renderItem={item => <RenderItem data={item} />}
      />
    </View>
  );
}
function RenderItem(props) {
  let {nome, capa, id} = props.data.item;
  console.log(props.data);
  return (
    <View>
      <Text style={{color: '#000'}}>{nome}</Text>
      <Text style={{color: '#000'}}>{capa}</Text>
      <Text style={{color: '#000'}}>{id}</Text>
    </View>
  );
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
