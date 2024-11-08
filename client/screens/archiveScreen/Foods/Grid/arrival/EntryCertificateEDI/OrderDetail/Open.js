import React , {useState , useEffect} from 'react';
import { TabRouter, useNavigation , useRoute } from '@react-navigation/native'
import OrderInfoState from  "../store/OrderInfoState"
import EDIContext from '../store/EDIContext';
import {OrderDetailScreenOpen} from './OrderDetailScreenOpen';
import {FormEDIScreen} from './FormEDIScreen'; 
import {SignFormScreen} from './SignFormScreen';
import {ChooseRedStampReasonScreen} from './ChooseRedStampReasonScreen';
import { Ionicons } from '@expo/vector-icons';
import {View ,Text, StyleSheet} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DocumentReview } from '../../DocumentReview';
import { useQuery } from "@apollo/client";
import {EDI_ORDER_ITEMS_BY_NUMBER_QUERY } from '../../../../../../gql/Query'
import { HELLO_QUERY } from '../../../../../../gql/Query';
const Stack = createNativeStackNavigator();



export const Open = ({route})=>{

  console.log("ROUTE=PARAM-ID" , route.params.id)

  // const [variables, setVariables] = useState({ediOrder : route.params.id});

  // const { isLoading, error, data } = useQuery(EDI_ORDER_ITEMS_BY_NUMBER_QUERY , {
  //   variables ,
    // staleTime: Infinity,
    // cacheTime: Infinity,
    // keepPreviousData: true
  //});

//   useEffect(() => {
//     if(!isLoading){
//      console.log("Page data", data); // when I refresh the page its undefined
//     }
//  }, [isLoading])

  

  //     console.log('DATA , VARIABLES' , data , variables)
 

  


   const {data, error, isLoading} =  useQuery(EDI_ORDER_ITEMS_BY_NUMBER_QUERY , {
     variables : {ediOrder : route.params.id}
   });

    // console.log(useQuery(EDI_ORDER_ITEMS_BY_NUMBER_QUERY , {
    //   variables : {ediOrder : route.params.id}
    // }),)

   
  
     console.log('DATA' , data)

     if (isLoading) return <Text>Loading...</Text>;

     if (error) return `Error! ${error.message}`;



     
  
  
  
  //  if (error) {
  //    console.error('EDI_ORDER_ITEMS_BY_NUMBER_QUERY error', error);
  //  }  


  //Context 1

  const context1InitialState = {
    data:data,
     //openData:null,
    // .map((item)=>  item),
    // openData:data.ediOrderItemsByNumber.filter((item )=>item.product=== "shampoo")
    // .map((item)=>  item.code) , 
    //error:null,
    //loading:null,
    //fullName: null,
    //destinationCountry: null,
    //departureCountry: null
  };

  const [passengerInfo, setPassengerInfo] = useState(context1InitialState);

  

    
        // const openData =   data.ediOrderItemsByNumber.filter((item )=>item.product=== "shampoo")
        // .map((item)=>  item.code);
        // console.log("openData" , openData)
        // const newState = { ...passengerInfo, openData};
        // setPassengerInfo(newState);
    

    //console.log("openTab" , openTab())

  function setFullName(fullName) {
    const newState = { ...passengerInfo, fullName };
    setPassengerInfo(newState);
  }

  function setDestinationCountry(destinationCountry) {
    const newState = { ...passengerInfo, destinationCountry };
    setPassengerInfo(newState);
  }

  function setDepartureCountry(departureCountry) {
    const newState = { ...passengerInfo, departureCountry };
    setPassengerInfo(newState);
  }

  // console.log("passengerInfo.data.ediOrderItemsByNumber" , passengerInfo.data.ediOrderItemsByNumber)

  const context1Setters = {
    
    setFullName,
    setDestinationCountry,
    setDepartureCountry
  }

  console.log("passengerInfo",passengerInfo)

  console.log("context1Setters",context1Setters)


  return (
    <EDIContext.Provider value={{ ...passengerInfo, ...context1Setters }}>
 <Stack.Navigator >

   <Stack.Group
   screenOptions={({route , navigation}) => ({
    headerShown:true,
    headerTitleAlign: 'center',
    headerStyle: {
         backgroundColor: '#2F95D6',
         borderBottomColor: '#fff',
         borderBottomWidth: 3,
       },
       headerTintColor: '#fff',
        headerTitleStyle: {
         fontSize: 18,
       },
     
            headerLeft:()=>  <View style={{
         flexDirection: "row",
         padding: 1,
         justifyContent: "space-between",
         alignItems: "center" ,
         }}>
     
         <Ionicons  name="close-circle-outline" size={30} color="#fff"
         onPress={()=>navigation.goBack()} />
       </View>
   })}
   >
   <Stack.Screen   name="OrderDetailScreenOpen" component={OrderDetailScreenOpen } />
   <Stack.Screen  name="FormEDIScreen" component={FormEDIScreen} />
   <Stack.Screen   name="SignFormScreen" component={SignFormScreen} />
   <Stack.Screen   name="ChooseRedStampReasonScreen" component={ChooseRedStampReasonScreen} />


   </Stack.Group>
 </Stack.Navigator>
 </EDIContext.Provider>  

  )
}




// export const Open = ({route}) => {

//   console.log('route.params.id from Open' ,route.params.id )
//   console.log('route.params.orderNumber' ,route.params ) 

//  // console.log('OrderInfoState()', OrderInfoState().data.ediOrderItemsByNumber[0].code)
//  const {data, error, loading} =  useQuery(EDI_ORDER_ITEMS_BY_NUMBER_QUERY , {
//   variables : {ediOrder : route.params.id}
// });
// console.log('DATA' , data)

// if (error) {
//   console.error('EDI_ORDER_ITEMS_BY_NUMBER_QUERY error', error);
// }




//  const openTab =async()=> await  data.ediOrderItemsByNumber.filter((item )=>item.product=== "shampoo")
//  //.map((item)=>  item.order_details
//      //.filter((order)=>order.isOpen === 'true')).flat()

//   //     useEffect(() => {
//   //      openTab();
//   //  }, []);
//   console.log("OPENTAB" , openTab())

//  const store = {...OrderInfoState() ,
//   //data ,
//     ref ,
//      searchIcon ,
//      // initialRows , 
//    openTab 
//  }
// //  console.log('store' , store)
 

//   // const { data, loading, error } = useQuery(HELLO_QUERY, {
// //   variables: {name: "Jacob"},
// // });




  

   
//      const Stack = createNativeStackNavigator();

//      const ref = route.params.orderNumber;
//      const searchIcon = route.params.searchIcon;
//      //const initialRows = store.data.ediOrderItemsByNumber.length;



//     //const openState = OrderInfoState();
//     //console.log('openState' , openState)
//     //const openStateData = openState.data;
//     //console.log('openStateData' , openStateData)

// /// const openTab = data.filter((item )=>item.reference=== ref).map((item)=>  item.order_details
//     // .filter((order)=>order.isOpen === 'true')).flat()

  
//     //const closedData = data.filter((item )=>item.reference=== route.params.item.reference)

//     //console.log('openState' , openState)

   


//     //EDIContext
// //  const [orderInfo, setOrderInfo] = useState({
// //   data:data,
// //   ref:route.params.item.reference,
// //   searchIcon : route.params.searchIcon,
// //   initialRows : route.params.item.order_details.length,
// //   closedData : data.filter((item )=>item.reference=== route.params.item.reference)
// //     });

   

   
//   //    function setClosedData(updateClosedData) {
//   //     const newState = { ...orderInfo, updateClosedData };
//   //     setOrderInfo(newState);
//   //      }


//     // const EDIContextSetters = {
//     // setData,
//     // setClosedData
//     // }

//     // return(
//     //   <View style={styles.container}><Text style={styles.text}>{888888}</Text></View>
//     // )

//    return (
//    <EDIContext.Provider value = {store} >
//  <Stack.Navigator >

//    <Stack.Group
//    screenOptions={({route , navigation}) => ({
//     headerShown:true,
//     headerTitleAlign: 'center',
//     headerStyle: {
//          backgroundColor: '#2F95D6',
//          borderBottomColor: '#fff',
//          borderBottomWidth: 3,
//        },
//        headerTintColor: '#fff',
//         headerTitleStyle: {
//          fontSize: 18,
//        },
     
//             headerLeft:()=>  <View style={{
//          flexDirection: "row",
//          padding: 1,
//          justifyContent: "space-between",
//          alignItems: "center" ,
//          }}>
     
//          <Ionicons  name="close-circle-outline" size={30} color="#fff"
//          onPress={()=>navigation.goBack()} />
//        </View>
//    })}
//    >
//    <Stack.Screen   name="OrderDetailScreenOpen" component={OrderDetailScreenOpen } />
//    <Stack.Screen  name="FormEDIScreen" component={FormEDIScreen} />
//    <Stack.Screen   name="SignFormScreen" component={SignFormScreen} />
//    <Stack.Screen   name="ChooseRedStampReasonScreen" component={ChooseRedStampReasonScreen} />


//    </Stack.Group>
//  </Stack.Navigator>
//  </EDIContext.Provider>  

//    )
// }

const styles = StyleSheet.create({
   
    container: {
      flex: 1,
      //backgroundColor: "#7CA1B4",
      alignItems: "center",
      justifyContent: "center",
    },
   
    text: {
      color: "blue",
      fontSize: 25,
      fontWeight: "bold",
      
    },
   
   
  });




