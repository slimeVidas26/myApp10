import React , {useState} from 'react';
import { Text, StyleSheet, Pressable , View } from 'react-native';

export default function EdiButton(props) {
   const [backgroundColor , setBackGroundColor] = useState('blue')
   const [colorNumber , setColorNumber] = useState('blue')
   const [colorText , setColorText] = useState('white')
   const [circleBackGroundColor , setCircleBackGroundColor] = useState('white')


  const { onPress , title } = props;
  return (

   
    
    <Pressable style = {[styles.button , {backgroundColor:backgroundColor }]}
    // style={({ pressed }) => [
    //     //{ opacity: pressed ? 0.5 : 1.0 },
    //     { backgroundColor: pressed ? '#d3d3d3' : 'blue'},
    //     styles.button
    //   ]}
      onPress={() => {console.log('Todo Pressed');backgroundColor === "blue" ? setBackGroundColor('#d3d3d3') : setBackGroundColor('blue');
                                                  colorNumber === "white" ? setColorNumber('blue') : setColorNumber('white');
                                                  colorText === "blue" ? setColorText('white') : setColorText('blue');
                                                  circleBackGroundColor === "white" ? setCircleBackGroundColor('blue') : setCircleBackGroundColor('white');

      }}>
        <View style={[styles.circle , {backgroundColor:circleBackGroundColor }]}>
         <Text style={[styles.text , {color:colorNumber}]}>25</Text>
        </View>
      <Text style={[styles.textTodo , {color:colorText}]}>{title}</Text>
      
    </Pressable>
  );
}



const styles = StyleSheet.create({
  button: {
    display:'flex',
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    elevation: 3,
    width:'50%',
    //backgroundColor:'blue',
    zIndex:100
  },
  text: {
    fontSize: 17,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    //color: 'blue',
  },
  textTodo: {
    fontSize: 17,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    //color: 'white',
  },
  circle :{
    borderRadius: 50,
    width: 40,
    height: 40,
    padding: 10,
    //backgroundColor:'white',
    //border: '3px solid #000',
    //color: '#000',
    textAlign: 'center',
    //font: '32px Arial, sans-serif'
   
  },
});