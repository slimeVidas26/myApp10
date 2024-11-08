
import {View , StyleSheet , Text,ImageBackground} from 'react-native'
import logo from '../../assets/oops.jpg'

 export const MyListEmpty = ({message}) => {
    return (
    <View style={{flex:1}}> 
    {/* <Text style={styles.item}>{message}</Text> */}
    <ImageBackground source={logo} resizeMode="cover" style={styles.image}>
    </ImageBackground>
  </View> 

    )
  }

  const styles = StyleSheet.create({
  
      item:{
        fontSize:30,
        color:'blue',
          alignSelf: 'center',
          marginTop:250
    }   ,
    image: {
      flex: 1,
      justifyContent: 'center',
      paddingBottom :500,
    
    //   //  width : null,
    //   //  height : 220,
    //    backgroundColor: '#0553',
    //   aspectRatio: 1.4, 
    //   marginBottom : 80,
    //   alignItems: 'center',
    //   position : 'relative',
    //   top:30,
    //   resizeMode: 'contain'
    },        
  });