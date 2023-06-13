import styled from 'styled-components';
import {View, TouchableOpacity, Image} from 'react-native';
import {useState, useContext} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import {colors} from '../../assets/colors';
import {format} from 'date-fns';
import api from '../../services/api';
function Card(props) {
  const {updateInfo, setUpdateInfo} = useContext(AuthContext);
  let {nome, capa, id, finishedDate} = props.data.item;
  const [gameName] = useState(nome);
  const [gameCover] = useState(capa);
  const [gameId] = useState(id);
  const [gameFinishedDate] = useState(
    format(new Date(finishedDate), 'dd/MM/yyyy HH:mm:ss'),
  );

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
      });
  }
  return (
    <CardView>
      <Cover>
        <Image
          source={{uri: gameCover}}
          style={{width: '100%', height: '100%', borderRadius: 12}}
          resizeMode="contain"
        />
      </Cover>
      <BelowView>
        <Title cor={colors.game_title} size={19}>
          {gameName}
        </Title>
        <View
          style={{
            flexDirection: 'row',
            columnGap: 10,
            alignItems: 'center',
          }}>
          <GameIcon source={require('../../assets/img/manete_.png')} />
          <ConsoleName>Console: PPSSPP</ConsoleName>
        </View>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: 10,
          }}>
          <FinishedIcon source={require('../../assets/img/finished_.png')} />
          <FinishedDate style={{flex: 1}}>
            Zerado em {gameFinishedDate}
          </FinishedDate>
        </View>
      </BelowView>

      <Buttons>
        <Button cor={colors.btn_editar}>
          <Title cor="#000" size={17}>
            Editar
          </Title>
        </Button>
        <Button cor={colors.game_title} onPress={deleteGame}>
          <Title cor="#fff" size={17}>
            Apagar
          </Title>
        </Button>
      </Buttons>
    </CardView>
  );
}

export default Card;
const Buttons = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
  column-gap: 20px;
  margin-top: 15px;
`;

const Button = styled.TouchableOpacity`
  padding: 15px;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 14px;
  padding-bottom: 14px;
  background-color: ${props => props.cor || 'blue'};
  width: 45%;
  border-radius: 12px;
`;
const FinishedIcon = styled.Image`
  height: 30px;
  width: 30px;
  margin-left: 20px;
`;
const GameIcon = styled.Image`
  height: 30px;
  width: 30px;
  margin-left: 20px;
`;
const FinishedDate = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: #000;
`;
const ConsoleName = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: #000;
`;
const CardView = styled.View`
  flex: 1;
  background-color: #000;
  flex-direction: column;
  padding-left: 15px;
  padding-right: 15px;
  align-items: center;
  margin-left: 14px;
  margin-right: 14px;
  margin-bottom: 10px;
`;
const Cover = styled.View`
  height: 300px;
  width: 100%;
  padding: 10px;
  background-color: #fff;
  border-radius: 12px;
`;

const BelowView = styled.View`
  flex-direction: column;
  background-color: #fff;
  flex: 1;
  width: 100%;
  border-radius: 20px;
  margin-top: 15px;
  padding: 10px;
`;
const Title = styled.Text`
  font-size: ${props => props.size}px;
  color: ${props => props.cor};
  font-weight: 700;
  align-self: center;
`;
