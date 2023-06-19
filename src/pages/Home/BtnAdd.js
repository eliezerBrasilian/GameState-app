import {Image, TouchableOpacity} from 'react-native';
import {useContext} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
function BtnAdd() {
  const {isPopUpVisible, setPopUpVisible} = useContext(AuthContext);
  function openModal() {
    setPopUpVisible(!isPopUpVisible);
    console.log(isPopUpVisible);
  }
  return (
    <TouchableOpacity
      onPress={openModal}
      style={{position: 'absolute', bottom: 50, right: 20}}>
      <Image
        source={require('../../assets/img/btn_add.png')}
        style={{height: 80, width: 80}}
      />
    </TouchableOpacity>
  );
}

export default BtnAdd;
