import {Image, TouchableOpacity} from 'react-native';
function BtnAdd() {
  return (
    <TouchableOpacity style={{position: 'absolute', bottom: 50, right: 20}}>
      <Image
        source={require('../../assets/img/btn_add.png')}
        style={{height: 80, width: 80}}
      />
    </TouchableOpacity>
  );
}

export default BtnAdd;
