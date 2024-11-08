import React , {useEffect,useState ,useContext, forwardRef, useImperativeHandle, useLayoutEffect} from 'react';
import {Text , TextInput , Keyboard , DismissKeyboardView ,  View ,StatusBar,ActivityIndicator ,   SafeAreaView , StyleSheet , FlatList , TouchableOpacity} from 'react-native'
import { TabRouter, useNavigation , useRoute } from '@react-navigation/native'
import { AntDesign ,  Ionicons } from '@expo/vector-icons';
import EDIContext from './EntryCertificateEDI/store/EDIContext';




import { translation } from "../../../../i18n/supportedLanguages";
import * as Localization from 'expo-localization';
import {EDIitem} from "../../../../components/arrival/EDIitem" 
import { I18n } from 'i18n-js';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
const i18n = new I18n(translation)
// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.enableFallback = true;
// To see the fallback mechanism uncomment line below to force app to use Japanese language.
// i18n.locale = 'ja';

import { useQuery } from "@apollo/client";
import {CLOSED_ORDERS_QUERY} from '../../../../gql/Query'

export const  DocumentReview = () =>{


  
  


  const { 
    //data,
    closedData,
    inputPlaceholder,
  } = useContext(EDIContext);

  // const setData = () => {
  //   const openData = data.filter((item)=>item.isOpen===true)
  // //   const newState = { ...OrderInfo, openData };
  // // setOrderInfo(newState);
  // return openData
//};

  //console.log('closedData' ,closedData())

  const {data, error, loading} = useQuery(CLOSED_ORDERS_QUERY);
  console.log('data' , data)

  if (error) {
    console.error('ORDER_QUERY error', error);
}

    const navigation = useNavigation()
    const route = useRoute();
    //console.log('Current Route: ', route.name);

    const [item , setItem] = useState(null);
    const [message, setMessage] = useState('');
    const [shouldShow, setShouldShow] = useState(true);
    //const [loading, setLoading] = useState(false);
    const [ordersList, setOrdersList] = useState(true);

    const [text , onChangeText] = useState(null);
    const [number , onChangeNumber] = useState('');
   //const {  code , provider , product  } = route.params || { };
   const [showIcon, setShowIcon] = useState(false);

    

    // on validate form
      const handleClick = () => { 
        searchOrder();  
      };
    
      // clear form
      const handleClear = () => { 
        clearInput();
      };
    
       // show/hide icon
       const clearIcon=(x)=>{
        x.length < 1 ? setShowIcon( false)  : setShowIcon( true) 
       }

       //loader
    const startLoading = ()=> {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }

     

      
      const searchOrder = async()=>{  

        //reference
        const getItemByReference = closedData().filter(item => 
              {
                if(
                  (item.reference.includes(number) && number.length > 2)
                  || item.reference  === number
                  ){
                     return  item
              }
              }
          
        );  
        let promiseRef = new Promise((resolve, reject) => {
        resolve(getItemByReference)});
        
        let resultFromReference =  await promiseRef; // attendre que la promesse soit résolue (*)
        //console.log('resultFromReference' , resultFromReference)

        //////////////////////////////////////////////////////////////////
        let getItemByCode = closedData().filter((item)=>{
          let getOrderDetails = item.order_details.map((orderDetail)=> orderDetail)
          // console.log('getOrderDetails' , getOrderDetails)
          for (let index = 0; index < getOrderDetails.length; index++) {
            const element = getOrderDetails[index];
            if(element.code === number){
              return item
            }
          }  
        })

        //console.log('getItemByCode' , getItemByCode)

        let promiseFromCode = new Promise((resolve, reject) => {
          resolve(getItemByCode)});
          
          let resultFromCode =  await promiseFromCode; // attendre que la promesse soit résolue (*)
          //console.log('resultFromCode' , resultFromCode)

       
  
        if (number==='') {
          setShouldShow(false)
          setMessage("Please enter a number")
          setShowIcon(false)
          //setOrdersList(true)
          if(shouldShow === false){
            setItem(null);
            //setOrdersList(true)
          }
          
          
        
        }else if (number){
          if(resultFromReference.length > 0  && resultFromCode.length ===0 ){
            startLoading()
              setShouldShow(true) 
              setShowIcon( true)
              setOrdersList(false)
              setItem(resultFromReference)
              
          }
          else if(resultFromReference.length === 0  && resultFromCode.length >0 ){
            startLoading()
            setShouldShow(true) 
            setShowIcon( true)
            setOrdersList(false)
            setItem(resultFromCode)
        }
        else {
          startLoading()
          setShouldShow(false)
          setMessage(" Order do not exists")
          setShowIcon(true)          
          setItem(null)
          setOrdersList(false)
        }
  
        }
        //  else {
        //   startLoading()
        //   setShouldShow(true) 
        //   setShowIcon( true)
        //   setOrdersList(false)
        //   setItem(resultFromReference[0])
         
        // }
          }
  
          const  clearInput = () =>{
             setTimeout(() => {
              setOrdersList(true)
              setShouldShow(false)
              setShowIcon(false)
              onChangeNumber('')
              setMessage(null)

            } , 50);
           
           }

         
          
     const renderItem = ({ item}) => (
 
            <EDIitem item={item}
                   reference = {item.reference}
                   date = {item.date}
                   supplier={item.supplier }
                   rows={item.rows }
                   quantity={item.quantity } 
                   /> 
     );

     const myListEmpty = () => {
      return (
        <View style={{ alignItems: "center" }}>
        <Text style={styles.item}>No data found</Text>
        </View>
      )}

     

    function setOrderDetailItemByCode(paramCode , paramSupplied) {
      const ItemByReference =  data.filter((item )=>item.reference=== route.params.item.reference)
      .map((item)=>  item.order_details).flat()
    //console.log('mapItemByReference' , mapItemByReference)
    .filter((order)=> order.code == paramCode)
    //console.log('filterMapItemByReference' , filterMapItemByReference)

     const result = ItemByReference[0];
     //console.log('result' , result)
     const orderDetailItemByCode = {...result , isOpen:false , supplied:paramSupplied}
     //console.log('orderDetailItemByCode' , orderDetailItemByCode)
     const newState = { ...orderInfo, orderDetailItemByCode};
     
     setOrderInfo(newState);
    // console.log('orderInfo' , orderInfo)
     
    }

    


   
  return (
     <SafeAreaView>
    <TextInput style = {styles.input}
                      autoFocus={true}
                      onChangeText={(number) => { onChangeNumber(number);clearIcon(number)}}
                      placeholder= {inputPlaceholder}
                       value = {number}
                      keyboardType="numeric"
                      onSubmitEditing={handleClick } />
                {showIcon ?
           ( <TouchableOpacity onPress={handleClear}>
            <View>
              {route.params.searchIcon? 
              (
                <Ionicons style={styles.icon } name="search" size={24} color="black" />)
             :(<AntDesign  style={styles.icon }  name="closesquare" size={24} color="black" />)}
            </View>
          </TouchableOpacity>
        ) : null}

      {loading ? (
      <ActivityIndicator
        //visibility of Overlay Loading Spinner
        visible={loading}
        //Text with the Spinner
        textContent={'Loading...'}
        //Text style of the Spinner Text
        textStyle={styles.spinnerTextStyle}
      />
        ) : (
         <>
          {item && shouldShow  ? 
           
              ( 
  
                <FlatList 
                  data={item}
                  renderItem={renderItem}
                  keyExtractor={item => item.id} 
                  ListEmptyComponent={myListEmpty}
                     />
                
  ):
    (<View>
                   {/* <Text style={styles.text}>{route.params.titre}</Text> */}
                   {/* <Text style={styles.text}>ID:{route.params.id}</Text>  */}
      <Text style={styles.textInfo}>{message}</Text> 
    </View>)
}
     
     { 
      //all the orders
     ordersList && <FlatList 
    data={data.closedOrders}
    renderItem={renderItem}
    keyExtractor={item => item.reference} 
    ListEmptyComponent={myListEmpty}
    /> }
      </>
    )}
    </SafeAreaView>

  )
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
         backgroundColor: '#f9c2ff',
        borderColor: "#fff",
        borderWidth: 1,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      title: {
        fontSize: 18,
        color:"#fff"
      },
      input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
    
  });
