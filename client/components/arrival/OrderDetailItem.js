import React from 'react'
import {View , Text , StyleSheet , TouchableOpacity} from 'react-native';
import { TabRouter, useNavigation , useRoute } from '@react-navigation/native'

 export const OrderDetailItem = ({id , code ,product , quantity   , isOpen,isFull , clearInput , rows }) => 
 {
  const navigation = useNavigation()
 

  return(
     <TouchableOpacity style={styles.item} onPress = {()=> 
    {  //console.log('ITEM' , item)
      clearInput();
      navigation.navigate('FormEDIScreen' , {       
        id , code , product , quantity }) }} >
    <View style={{...styles.label(isOpen) , ...styles.label(isFull) }}>
      <Text  style={styles.title}>Code : {code}</Text>
       <Text  style={styles.title}>Product : {product}</Text> 
       <Text  style={styles.title}>Quantity : {quantity}</Text> 

      {/* <Text style={styles.title}>Name : {item.name}</Text>
      <Text style={styles.title}>Quantity :{item.quantity}</Text>
      <Text style={styles.title}>Boxes :{item.boxes}</Text>
      <Text style={styles.title}>isOpen :{item.isOpen}</Text>
      <Text style={styles.title}>Supplied :{item.supplied}</Text>
      <Text style={styles.title}>ReasonOfRefund :{item.ReasonOfRefund}</Text>
      <Text style={styles.title}>isFull :{item.isFull}</Text> */}
    </View>
    </TouchableOpacity>
  )
 
 };

  const styles = StyleSheet.create({

    label: (isOpen) => {
      const bgColor = isOpen=== 'true' ? '#fff' : 'green';
    return {
       
        backgroundColor: bgColor,
        borderColor: "#000",
       borderWidth: 1,
       padding: 20,
       marginVertical: 8,
       marginHorizontal: 16,
      }
    },
    label: (isFull) => {
      const bgColor = isFull=== 'null' ? '#fff' :
       isFull === 'true'? 'green' : 'red';
    return {
       
        backgroundColor: bgColor,
        borderColor: "#000",
       borderWidth: 1,
       padding: 20,
       marginVertical: 8,
       marginHorizontal: 16,
      }
    },
    hr: {
      position: 'relative',
      top: 11,
      borderBottomColor: '#000000',
      borderBottomWidth: 1,
    },
    item: {
      backgroundColor: 'grey',
     borderColor: "#fff",
     borderWidth: 1,
     marginVertical: 8,
     marginHorizontal: 16,
   },
    container: {
      flex: 1,
      backgroundColor: "#7CA1B4",
      alignItems: "center",
      justifyContent: "center",
    },
    loginBtn: {
      width: "80%",
      borderRadius: 25,
      height: 200,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40,
      backgroundColor: "blue",
    },
    
    row: {
      flexDirection: "row",
    },
    square: {
      borderColor: "#fff",
      borderWidth: 1,
      width: "45%",
      height: 140,
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      color: "blue",
      fontSize: 25,
      fontWeight: "bold",
    },
    icon: {
      position: 'absolute',
      right: 20,
      top:-45,
      //display:'none'
    },
    number: {
      color: "red",
      fontSize: 25,
      fontWeight: "bold",
    },
    card: {
      width: "80%",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40,
      backgroundColor: "#e6ffff",
    },
     
      open: {
        backgroundColor: '#fff',
       borderColor: "#000",
       borderWidth: 1,
       padding: 20,
       marginVertical: 8,
       marginHorizontal: 16,
     },
     closed: {
      backgroundColor: 'green',
     borderColor: "#fff",
     borderWidth: 1,
     padding: 20,
     marginVertical: 8,
     marginHorizontal: 16,
     color:"#fff"
   },
      title: {
        fontSize: 18,
        color:"#000"
      },
      input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
    
  });
