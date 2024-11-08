import React from 'react'
import {View , Text , StyleSheet , TouchableOpacity} from 'react-native'
import { TabRouter, useNavigation , useRoute } from '@react-navigation/native'


 export const EDIitem = ({id , orderNumber , date , rows , quantity}) => {
  const navigation = useNavigation()
  const route = useRoute()
  // const D = new Date(item.date)
  // console.log(D)
  //console.log(route)
//console.log('route name from ediItem' , route.name)
  {return route.name === 'EntryCertificateEDI' ? (
   
  <TouchableOpacity style={styles.item} onPress = {()=> 
      {  
        
            navigation.navigate('MyTabs',{
                id: "651d2b6fbd737353eb2c50db",
                orderNumber,
                date , 
                rows , 
                quantity,
                searchIcon: route.params.searchIcon,
                 } )  }}>
    <View style={styles.item}>
    <Text style={styles.title}>id : {id}</Text>
      <Text style={styles.title}>orderNumber : {orderNumber}</Text>
       <Text style={styles.title}>Date :{date}</Text>
      <Text style={styles.title}>Rows :{rows}</Text>
      <Text style={styles.title}>Quantity :{quantity}</Text>
       {/* <Text style={styles.title}>Supplied :{item.supplied}</Text>
      <Text style={styles.title}>isOpen :{item.isOpen}</Text>  */}
      
    </View>
    </TouchableOpacity>
  ):(
  <TouchableOpacity style={styles.item} onPress = {()=> 
      {  
        console.log('item in EDIitem' , item)
            navigation.navigate('MyTabs',{
                item,
                searchIcon: true,
                rows } )  }}>
    <View style={styles.item}>
      <Text style={styles.title}>Reference : {item.reference}</Text>
      <Text style={styles.title}>Date : {item.date}</Text>
      <Text style={styles.title}>Supplier :{item.supplier}</Text>
      <Text style={styles.title}>Rows :{item.rows}</Text>
      <Text style={styles.title}>Quantity :{item.quantity}</Text>
      <Text style={styles.title}>Supplied :{item.supplied}</Text>
      <Text style={styles.title}>isOpen :{item.isOpen}</Text>
      <Text style={styles.title}>Worker :{item.WorkerCode}</Text>
      <Text style={styles.title}>Remarks :{item.Remarks}</Text>
      <Text style={styles.title}>GivingRedStamp :{item.GivingRedStamp}</Text>
      <Text style={styles.title}>RedStampReason :{item.RedStampReason}</Text>




    </View>
    </TouchableOpacity>
  )}
 
 }
 
 
 

  const styles = StyleSheet.create({
    hr: {
      position: 'relative',
      top: 11,
      borderBottomColor: '#000000',
      borderBottomWidth: 1,
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
      item: {
         backgroundColor: 'orange',
        borderColor: "#fff",
        borderWidth: 1,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      closedItem: {
        backgroundColor: 'green',
       borderColor: "#fff",
       borderWidth: 1,
       padding: 20,
       marginVertical: 8,
       marginHorizontal: 16,
     },
      title: {
        fontSize: 18,
        color:"black"
      },
      input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
    
  });
