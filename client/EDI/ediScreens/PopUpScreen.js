import React , {useState , useEffect} from 'react'
import { Alert, Modal,View, Text  ,
        ImageBackground,Keyboard, StyleSheet , Button ,Pressable,
        FlatList  ,ActivityIndicator,TouchableOpacity,
  Image , TextInput , Dimensions} from 'react-native'


  import filter from 'lodash.filter';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome , Ionicons  , AntDesign} from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import notFound from '../../assets/data-not-found.jpg'

import { useQuery } from "@apollo/client";
import { EDI_ORDERS_QUERY } from '../../gql/Query';

const screenHeight = Dimensions.get('window').height; 
const screenWidth = Dimensions.get('window').width; 

console.log(screenWidth)

// const data =  [{ id: '1', supplier: 'Sano' ,  supplierNumber:4723 ,  edi : 6004240, orderNumber:1443621, boxes:1, quantity:160,date:'29/02/24'},
// { id: '2', supplier: 'Chaniv' ,supplierNumber:5800 ,   edi : 6001471, orderNumber:24013545, boxes:6, quantity:1160,date:'29/02/24'},
// { id: '3', supplier: 'Fisher' ,supplierNumber:404643 , edi : 6002800, orderNumber:7140759523, boxes:22, quantity:391,date:'29/02/24'},
// { id: '4', supplier: 'Fisher' ,supplierNumber:404643 , edi : 6002802, orderNumber:7140759585, boxes:9, quantity:872,date:'29/02/24'},
// { id: '5', supplier: 'Densher' ,supplierNumber:467895 , edi : 6002803, orderNumber:7150965063, boxes:42, quantity:1738,date:'29/02/24'},
// { id: '6', supplier: 'Densher' ,supplierNumber:467895 , edi : 6002801, orderNumber:7150965184, boxes:16, quantity:254,date:'29/02/24'},
// { id: '7', supplier: 'Ossem' ,  supplierNumber:414798 , edi : 6003514, orderNumber:7075028846, boxes:25, quantity:974,date:'29/02/24'},
// { id: '8', supplier: 'SuperTex' ,supplierNumber:405408 , edi : 6002365, orderNumber:5700895, boxes:13, quantity:585,date:'28/02/24'}
// ];

// console.log(data)

  

//const API_ENDPOINT = `https://randomuser.me/api/?seed=1&page=1&results=20`;



const PopUpScreen = ({navigation}) => {

  

  const [modalVisible, setModalVisible] = useState(false);

  const [isVisible, setIsVisible] = useState(false);

  const handleOpenPopup = () => {
    setIsVisible(true);
  };

  const handleClosePopup = () => {
    setIsVisible(false);
  };
  // const {data, error, loading} = useQuery(EDI_ORDERS_QUERY);
  const {data ,error ,  loading} = useQuery(EDI_ORDERS_QUERY);
  // console.log(data)
  // console.log(loading)
  //const [isLoading, setIsLoading] = useState(false);
  //const [data, setData] = useState([]);
  //const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [fullData, setFullData] = useState([]);
  const [title , setTitle] = useState('')
  const [info , setInfo] = useState('')

  useEffect(() => {
    setInfo('No Data Found')
    //setTitle('Edi Certificate')
    setQuery(query)
    console.log(query)
    console.log(info)
    console.log(title)
  }, [query , info , title]) 

 

 const renderItem=({ item }) => (
    <View style={styles.listItem}>
        
        <View style={styles.metaInfo}>
          <Text style={styles.title}></Text>
          <Text style={[styles.title , styles.text]}>{`${item.supplier}`}</Text>
        </View>

        <View style={styles.metaInfo}>
          <Text style={[styles.title , styles.text]}>Boxes:{`${item.boxes}`}</Text>
          <Text style={styles.title}>Supplier Number:{`${item.supplierNumber}`}</Text>
        </View>
        <View style={styles.metaInfo}>
          <Text style={[styles.title , styles.text]}>Quantity:{`${item.quantity}`}</Text>
          <Text style={styles.title}>Edi:{`${item.edi}`}</Text>

        </View>
        <View style={styles.metaInfo}>
          <Text style={styles.title}>{`${item.date}`}</Text>
          <Text style={styles.title}>Order Number: {`${item.orderNumber}`}</Text>

        </View>
      </View>
   )

   const myListEmpty = () => {
    
      return (
    
      <View style={{flex:1,alignItems: 'center',justifyContent: 'center', height: screenHeight/1.5}}> 
      <Text style={styles.item}>No Data Found</Text>
      {/* <ImageBackground 
      source={require('../../assets/noData.png')}
        resizeMode="stretch"
        style={styles.img}> 
      </ImageBackground>  */}
    </View> )}
   
    

    const myListNotEmpty = () => {
      return (
        <View style={{ alignItems: "center" }}>
        <Text style={styles.item}>Entry Certificate</Text>
        </View>
      )}

   const handleSearch = text => {
    // console.log('fullData before' , fullData)

     const formattedQuery = text.toLowerCase(); 
     const filteredData = filter(data.ediOrders, edi => {
       //console.log('user' , user)
       return contains(edi, formattedQuery);
     });
     //console.log('filteredData' , filteredData);
     setModalVisible(true)
     setQuery(text);
     setFullData(filteredData)
     setTitle('Edi Certificate')
     
    // console.log('fullData after' , fullData)
      console.log('fullData.length',fullData.length)
   };
  
   const contains = ({orderNumber }, query) => {
     //const { first, last } = name;
  console.log('contains' , contains)
     if (orderNumber.includes(query)) {
       return true;
     }
    
    
     return false;
   };

  function renderHeaderModal(){
    return(
      <>
      <View
      style = {{
        padding:10,
        marginVertical:5,
        marginHorizontal:5,
       //borderRadius: 20,
        display:'flex',
        flexDirection:'row',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30,
        borderWidth: 0,
        borderColor:'blue'
        
      }}
      >
    

<Pressable onPress={() => setModalVisible(!modalVisible)}>
<Text  style={styles.inputIcon}><AntDesign onPress={() => setModalVisible(!modalVisible)} name="closecircle" size={30} color="blue" /></Text>
</Pressable>

<TextInput
autoFocus={true}
keyboardType='numeric'
autoCapitalize="none"
placeHolder='Search'
autoCorrect={false}
clearButtonMode="always"
value={query}
onChangeText={queryText => handleSearch(queryText)}
style={{textAlign:"right",borderWidth:7,flex:1,fontSize:20 ,color:'#000' ,paddingHorizontal:20 , paddingVertical:10 , marginHorizontal:15,borderRadius: 30,
        borderWidth: 1,
        borderColor:'blue' }}
/>

 </View>
 {query  && fullData.length >0 && <View style = {{display:'flex' ,  alignItems:'flex-end' , paddingHorizontal:20 ,marginTop:20}}><Text style = {{fontSize:20 , color:'blue'}}>{title}</Text></View>}
 </>
      
    )
   

  }

  function renderHeader(){
    return(
      <View
      style = {{
        marginHorizontal:20,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: "center",
      }}
      >
      {/* <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable> */}
      <Ionicons onPress={() => {Keyboard.dismiss();setModalVisible(true);setQuery('');setFullData([])}} name="search-circle-sharp" size={45} color="blue" />
      <AntDesign onPress={() => {navigation.navigate('Home')}} name="rightcircleo" size={33} color="blue" />
      </View>
    )
  }


  
  function renderSeparator() {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '5%'
        }}
      />
    )
  }


    return (
    
      <View style={styles.container}>

      {loading && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#5500dc" />
        </View>}
        {error &&  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18}}>
            Error fetching data... Check your network connection!
          </Text>
        </View>}
        
        {!loading && !error && data  &&
        <FlatList 
         ListHeaderComponent={renderHeader}
         ItemSeparatorComponent={renderSeparator}
         ListEmptyComponent={myListEmpty}
         data={data.ediOrders}
         keyExtractor={item => item.id}
         renderItem={renderItem}/>}

      {/* <Text style={styles.title}>Previous Screen Content</Text> */}
      {/* <TouchableOpacity onPress={handleOpenPopup} style={styles.button}>
        <Text style={styles.buttonText}>Open Pop-up</Text>
      </TouchableOpacity> */}
      
      <Modal visible={isVisible} transparent={true} animationType="fade">
        <TouchableOpacity style={styles.modalBackground} activeOpacity={1} onPress={handleClosePopup}>
          <View style={styles.popupContainer}>
          <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="*Number"
          placeholderTextColor="#808080"
          secureTextEntry={false}
          onChangeText={(number) => setNumber(number)} 
          keyboardType="numeric" 
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="*Quantity"
          placeholderTextColor="#808080"
          secureTextEntry={false}
          onChangeText={(quantity) => setQuantity(quantity)} 
          keyboardType="numeric" 
        />
      </View>

      <View style = {styles.btnZone}>
      <TouchableOpacity style={styles.closeButton}
        onPress={() => {setModalVisible(false);navigation.goBack()}}>
        <Text style={styles.closeButtonText}>Next</Text> 
      </TouchableOpacity>
            <TouchableOpacity onPress={handleClosePopup} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
        
      </Modal>




      { modalVisible == true && 
        <Modal 
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          
             
          
             {query && <FlatList style = {{backgroundColor:'#CED0CE' , marginTop:58 , borderRadius:10}}
           ListHeaderComponent={renderHeaderModal}
           data={fullData}
           keyExtractor={item => item.id}
           renderItem={renderItem}
           ListEmptyComponent= {myListEmpty}
           />}

           {!query && <FlatList style = {{backgroundColor:'#CED0CE' , marginTop:58 , borderRadius:10}}
           ListHeaderComponent={renderHeaderModal}
           data={null}
           keyExtractor={item => item.id}
           renderItem={renderItem}
           ListEmptyComponent= {myListEmpty}
           />}

          
        </Modal>
      }

      <Modal visible={isVisible} transparent={true} animationType="fade">
        <TouchableOpacity style={styles.modalBackground} activeOpacity={1} onPress={handleClosePopup}>
          <View style={styles.popupContainer}>
          <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="*Number"
          placeholderTextColor="#808080"
          secureTextEntry={false}
          onChangeText={(number) => setNumber(number)} 
          keyboardType="numeric" 
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="*Quantity"
          placeholderTextColor="#808080"
          secureTextEntry={false}
          onChangeText={(quantity) => setQuantity(quantity)} 
          keyboardType="numeric" 
        />
      </View>

      <View style = {styles.btnZone}>
      <TouchableOpacity style={styles.closeButton}
        onPress={() => {setModalVisible(false);navigation.goBack()}}>
        <Text style={styles.closeButtonText}>Next</Text> 
      </TouchableOpacity>
            <TouchableOpacity onPress={handleClosePopup} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
        
      </Modal>
    
     </View>
   );
  }
 

 
 
  


export default PopUpScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  btnZone:{
  flexDirection :'row',
  justifyContent: 'space-around',
  
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    
  },
  popupContainer: {
    marginTop:110,
    backgroundColor: 'white',
    padding: 50,
    borderRadius: 50,
    alignItems: 'center',
    
    
  },
  loginBtn: {
    width: "60%",
    borderRadius: 25,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "blue",
    marginHorizontal:80
   
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  closeButton: {
    width:120,
    marginTop: 20,
    padding: 15,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listItem: {
         marginTop: 10,
         paddingVertical: 20,
         //paddingHorizontal: 40,
        backgroundColor: '#fff',
         flexDirection: 'column',
         justifyContent:'space-around',
         borderRadius:10
      },
      metaInfo: {
            // elevation: 1,
             borderRadius: 2,
             flex: 1,
             flexDirection: "row", // main axis
            justifyContent: "space-between", // main axis
             //paddingTop: 10,
             //paddingBottom: 10,
             marginLeft: 14,
             marginRight: 14,
             marginTop: 0,
             marginBottom: 6,
           },
           text: {
                 fontSize:20,
                 color: 'blue',
                 //fontWeight: '700'
               },
               inputView: {
                backgroundColor: "#d3d3d3",
                borderRadius: 20,
                width: 300,
                height: 55,
                marginBottom: 20,
                alignItems: "center",
                marginHorizontal:50
              },
             
              TextInput: {
                height: 60,
                flex: 1,
                padding: 5,
                marginLeft: 10,
                fontSize : 20,
                borderRadius : 25,
              },
});



// const styles = StyleSheet.create({
  
//   container: {
//     // width : "100%",
//      flex: 1,
//     // backgroundColor: '#f8f8f8',
//     // alignItems: 'center',
//      marginTop: 14,
//       //alignSelf: "stretch",
//   },

//   img: { 
//     height: screenHeight, 
//     width: screenWidth, 
//     justifyContent: 'center', 
//     alignItems: 'center', 
//   }, 
//   input: { 
//     height: 40, 
//     margin: 12, 
//     borderWidth: 2, 
//     padding: 10, 
//   }, 
  
//   inputWithIcon :{
//     border: 'none',
//     flex: 1
//   },
  
//   item:{
//     fontSize:30,
//     color:'blue'
//     // height: 'screenHeight', 
//     // width: 'screenWidth', 
//   },
//   text: {
//     fontSize:20,
//     color: 'blue',
//     //fontWeight: '700'
//   },
//   listItem: {
//     marginTop: 10,
//     paddingVertical: 20,
//     //paddingHorizontal: 40,
//     backgroundColor: '#fff',
//     flexDirection: 'column',
//     justifyContent:'space-around',
//     borderRadius:10
//   },
//   coverImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 8
//   },
//   metaInfo: {
//    // elevation: 1,
//     borderRadius: 2,
//     flex: 1,
//     flexDirection: "row", // main axis
//     justifyContent: "space-between", // main axis
//     //paddingTop: 10,
//     //paddingBottom: 10,
//     marginLeft: 14,
//     marginRight: 14,
//     marginTop: 0,
//     marginBottom: 6,
//   },
  
//   title: {
//     fontSize: 20,
//     //width: 200,
//     //padding: 10,
//     //backgroundColor: 'red',

//   },
//   image: {
//     flex: 1,
//     justifyContent: 'center',
//     // paddingBottom :200,
  
//     // width:' 15%',
//     // height: '30%',
//   //    backgroundColor: '#0553',
//      //aspectRatio: 1, 
//   //   marginBottom : 80,
//      alignItems: 'center',
//   //   position : 'relative',
//   //   top:30,
//   //   resizeMode: 'contain'
//   },

//   //MODAL
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 22,
//   },
//    modalView: {
//      flex:1,
//      margin: 20,
//      backgroundColor: 'grey',
//      borderRadius: 20,
//      padding: 35,
//      alignItems: 'stretch',
//      shadowColor: '#000',
//      shadowOffset: {
//        width: 0,
//        height: 2,
//      },
//      shadowOpacity: 0.25,
//      shadowRadius: 4,
//      elevation: 5,
//    },
//   button: {
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2,
//   },
//   buttonOpen: {
//     backgroundColor: '#F194FF',
//   },
//   buttonClose: {
//     backgroundColor: '#2196F3',
//   },
//   textStyle: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: 'center',
//   },
// });



