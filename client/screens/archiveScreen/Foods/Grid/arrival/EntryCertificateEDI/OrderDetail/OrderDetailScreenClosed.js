


import React , {useContext , useState , useEffect}  from 'react'
import { useNavigation , useRoute  } from '@react-navigation/native'
import {Text , TextInput , View ,ActivityIndicator ,   SafeAreaView , StyleSheet , FlatList , TouchableOpacity} from 'react-native'
import  EDIContext  from '../store/EDIContext';
import { OrderDetailItem } from '../../../../../../components/arrival/OrderDetailItem';
import { AntDesign ,  Ionicons } from '@expo/vector-icons';


export const  OrderDetailScreenClosed = ()=> {


  const context = useContext(EDIContext)
  const {data , ref , searchIcon , initialRows , closedTab} = context


  
  
const remindRows = closedTab.length;
console.log('rowsFromOrderDetailScreenOpen' , remindRows)


  
   const [ordersList, setOrdersList] = useState(true);
   const [placeholder, setPlaceholder] = useState('route.params.titre' );
   const [number , onChangeNumber] = useState('');
   const [showIcon, setShowIcon] = useState(false);
   const [nextHeaderIcon, setNextHeaderIcon] = useState(false);

   const [loading, setLoading] = useState(false);
   const [shouldShow, setShouldShow] = useState(true);
   const [message, setMessage] = useState('');
   const [item , setItem] = useState(null);


  // on validate form
  const handleClick = () => { 
    getItemOrder();  
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
  }, 2000);
}

const getItemOrder = async()=>{    
  let promise = new Promise((resolve, reject) => {
  resolve(closedTab.filter(item => item.code  === number))});
  
  let result =  await promise; // attendre que la promesse soit résolue (*)

  if (number==='') {
    setShouldShow(false)
    setMessage("Please enter a number")
    setShowIcon(false)
    //setOrdersList(true)
    if(shouldShow === false){
      setItem(null);
      //setOrdersList(true)
    }
    
    
  
  }else if (number && result ===undefined) {

    startLoading()
    setShouldShow(false)
    setMessage(" Order do not exists")
    setShowIcon(false)          
    setItem(null)
    setOrdersList(false)

  }
   else {
    console.log('result' ,result)

    startLoading()
    setShouldShow(true) 
    setShowIcon( true)
    setOrdersList(false)
    setItem(result)
   
  }
    }

    const  clearInput = () =>{

       setTimeout(() => {
        setOrdersList(true)
        setShowIcon(false)
        setShouldShow(false) 
        onChangeNumber('')
      } , 50);
     
     }
   


const renderItem = ({item }) => (  
     <OrderDetailItem 
                    clearInput = {clearInput}
                    rows = {remindRows}
                    nextHeaderIcon = {nextHeaderIcon}
                    item={item}
                    code = {item.code}
                    name = {item.product_name}
                    quantity={item.quantity} 
                    boxes={item.boxes }
                    isOpen={item.isOpen }
                    supplied={item.supplied }
                    ReasonOfRefund = {item.ReasonOfRefund}
                    isFull={item.isFull }
                     /> 
   );

  
  const navigation = useNavigation()

   const myListEmpty = () => {
     useEffect(() => {
         navigation.setOptions({
         
           headerLeft: () => {

         let button = !remindRows ? (
          <View style={{
        flexDirection: "row",
        padding: 1,
        justifyContent: "space-between",
        alignItems: "center" ,
        }}>
          <Ionicons  name="close-circle-outline" size={30} color="#fff"
          onPress={()=>navigation.goBack()}  
          />
          <AntDesign style  = {{margin:10}} name="checkcircleo" size={24} color="#fff"
          onPress={()=>navigation.navigate('SignFormScreen')} />
        </View>
         )
         : (
         null)
        
 return  button;
  
        }
          });
      }, [navigation]);


    return (
      <View style={{ alignItems: "center" }}>
      <Text style={styles.item}>No data found</Text>
      <Text style={styles.item}>rows : {remindRows}</Text>

      </View>
    )}


       return (
          <SafeAreaView>
         <TextInput style = {styles.input}
                      autoFocus={true}
                      onChangeText={(number) => { onChangeNumber(number);clearIcon(number)}}
                      placeholder= {placeholder }
                       value = {number}
                      keyboardType="numeric"
                onSubmitEditing={handleClick } />

                <View style = {styles.counter}>
                  <Text>{remindRows} Remind / {initialRows} rows </Text>
                  </View>

                  <View style = {styles.status}>
                  <Text style ={styles.all} > All </Text>
                  <Text style = {styles.closed}>Closed </Text>
                  <Text style = {styles.open}>Open</Text>
                  </View>

                {showIcon ?
           ( <TouchableOpacity onPress={handleClear}>
            <View>
              {searchIcon? 
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
                  keyExtractor={item => item.code} 
                  ListEmptyComponent={myListEmpty}
                     />
                
  ):
    (<View>
      <Text style={styles.textInfo}>{message}</Text> 
    </View>)
}
     
     { 
      //all the orders
     ordersList && <FlatList 
    data={closedTab}
    renderItem={renderItem}
    keyExtractor={item => item.code} 
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
    right: 10,
    bottom:87,
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
     
      borderWidth: 1,
      padding: 10,
    },
    counter: {
      height: 40,
    
      alignItems: "center",
      borderWidth: 1,
      padding: 10,
    },
    status: {
      borderWidth: 1,
      display: 'flex',
      flexDirection: "row",
      height: 40,
     
      
      

     
     

    },
    all: {
      padding: 8,
      backgroundColor: 'coral',
      border: '3px solid #333',
      flexGrow: 1,
      textAlign: 'center'
      

      

    },
    closed: {
      padding: 8,
      backgroundColor: 'pink',
      border: '3px solid #333',
      flexGrow: 1,
      textAlign: 'center'



    },
    open: {
      padding: 8,
      backgroundColor: 'lightblue',
      border: '3px solid #333',
      flexGrow: 1,
      textAlign: 'center'



    },
    
  
});

 


  




 


  


