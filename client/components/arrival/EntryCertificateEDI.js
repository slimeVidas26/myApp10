
import React , {useEffect,useState , forwardRef, useImperativeHandle, useLayoutEffect} from 'react';
import {Text ,View ,StatusBar,ActivityIndicator ,   SafeAreaView , StyleSheet , FlatList , TouchableOpacity} from 'react-native'
import { TabRouter, useNavigation } from '@react-navigation/native'

import { translation } from "../../i18n/supportedLanguages";
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
const i18n = new I18n(translation)
// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.enableFallback = true;
// To see the fallback mechanism uncomment line below to force app to use Japanese language.
// i18n.locale = 'ja';





const EntryCertificateEDI = forwardRef((props, ref)=> {

  const navigation = useNavigation()
  const { number , onChangeNumber , setShowIcon } = props;
  console.log(props)

    const [order , setOrder] = useState(null);
    const [message, setMessage] = useState('');
    const [shouldShow, setShouldShow] = useState(true);
    const [loading, setLoading] = useState(false);
    const [ordersList, setOrdersList] = useState(true);

  
    const startLoading = ()=> {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }

  useImperativeHandle(ref, () => ({
  
    async EntryCertificateEDIFunc(){    
      let promise = new Promise((resolve, reject) => {
      resolve(DATA.filter(order => order.reference  === number))});
      
      let result =  await promise; // attendre que la promesse soit résolue (*)


      if (number==='') {
        setShouldShow(false)
        setMessage("")
        setShowIcon(false)
        //setOrdersList(true)
        if(shouldShow === false){
          setOrder(null);
          //setOrdersList(true)
        }
        
        
      
      }else if (number && result[0] ===undefined) {
        startLoading()
        setShouldShow(false)
        setMessage(" Order do not exists")
        setShowIcon(false)          
        setOrder(null)
        setOrdersList(false)

      }
       else {
        startLoading()
        setShouldShow(true) 
        setShowIcon( true)
        setOrdersList(false)
        setOrder(result[0])
       
      }
        },

         clearInput() {
           setTimeout(() => {
            setOrdersList(true)
            setShouldShow(false) 
            onChangeNumber('')
          } , 50);
         
         },

       
  }));


  const Item = ({ reference ,date ,  supplier , rows , quantity }) => (
    <View>
      <Text style={styles.title}>Reference : {reference}</Text>
      <Text style={styles.title}>Date : {date}</Text>
      <Text style={styles.title}>Supplier :{supplier}</Text>
      <Text style={styles.title}>Rows :{rows}</Text>
      <Text style={styles.title}>Quantity :{quantity}</Text>
    </View>
  );


  const single = DATA.filter((data)=> data.reference)
  //console.log("single",single)
   const result = single.map((item)=>item.order_details.map((order)=>
     <SafeAreaView>
      <TouchableOpacity style={styles.item}  onPress = {()=>
      
      {
      navigation.navigate('FormEDI') }} >
      <Text style={styles.title}>Code : {order.code}</Text>
      <Text style={styles.title}>Name : {order.product_name}</Text>
      <Text style={styles.title}>Quantity :{order.quantity}</Text>
      <Text style={styles.title}>Boxes :{order.boxes}</Text>
      </TouchableOpacity>
      </SafeAreaView>))

   
  //  const result = DATA.map((item)=>item.order_details.map((order)=>order.product_name))
  //  .filter(()=> DATA.reference=== '12345')

    // if(isChecked){
    
    //console.log("result",result)
    // }
  


  const renderItem = ({ item  }) => (

  
    <TouchableOpacity style={styles.item} onPress = {()=>
      {navigation.setOptions({ title: 'OrderDetail' });
      navigation.navigate('Form',  {
              id:item.id,
              reference: item.reference,
              date:item.date,
              supplier: item.supplier,
              rows: item.rows,
              quantity:item.quantity,
              order_details:result,
              title:'OrderDetail',
              searchIcon: true,
              
              })
             
              }

            }>
            <Item  reference = {item.reference}
            date = {item.date}
            supplier={item.supplier }
            rows={item.rows }
            quantity={item.quantity } /> 
     </TouchableOpacity>
     
     
        
     );

     const myListEmpty = () => {
      return (
        <View style={{ alignItems: "center" }}>
        <Text style={styles.item}>No data found</Text>
        </View>
      )}


  return (
    <>

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
          {order && shouldShow  ?    
                  (   //single order
        <SafeAreaView>
       <TouchableOpacity style={styles.item} onPress = {()=>
      {navigation.setOptions({ title: 'Order-Detail-EDI ' });
      navigation.navigate('Form',  {
              id:order.id,
              reference: order.reference,
              date:order.date,
              supplier: order.supplier,
              rows: order.rows,
              quantity:order.quantity,
              order_details:result
              })}}>
                      {/* <Text style={styles.text}>{route.params.titre}</Text> */}
                      {/* <Text style={styles.text}>ID:{route.params.id}</Text>  */}
                      {/* <Text style={styles.title}>{number}</Text>  */}
                      <Text style={styles.title}>Reference : {order.reference} </Text> 
                      <Text style={styles.title}>Date :{order.date}</Text>
                      <Text style={styles.title}>Supplier :{order.supplier}</Text>
                      <Text style={styles.title}>Rows :{order.rows}</Text>
                      <Text style={styles.title}>Quantity :{order.quantity}</Text>
       </TouchableOpacity>  
      </SafeAreaView>)
                  
                  :
                   (<View>
                       {/* <Text style={styles.text}>{route.params.titre}</Text> */}
                       {/* <Text style={styles.text}>ID:{route.params.id}</Text>  */}
                       <Text style={styles.textInfo}>{message}</Text> 
                  </View>)
    }
         
         { 
          //all the orders
         ordersList && <FlatList 
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id} 
        ListEmptyComponent={myListEmpty}
        /> }
          </>
        )}


   
    </>
  );
})

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
    right: 15,
    top:20,
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
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 20,
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  
});

export default EntryCertificateEDI
