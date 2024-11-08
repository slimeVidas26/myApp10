import { Text, View, Pressable, TextInput, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import EdiButton from '../EDICertificate/EdiButton';
import { EdiOrderDetailsScreenOpen } from '../../EDI/ediScreens/EdiOrderDetailsScreenOpen';
import { EdiOrderDetailsScreenClosed } from '../../EDI/ediScreens/EdiOrderDetailsScreenClosed';
import { EdiOrderDetailsScreenSearch } from '../../EDI/ediScreens/EdiOrderDetailsScreenSearch';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useQuery } from '@apollo/client';
import { EDI_ORDER_QUERY } from '../../gql/Query';

const Tab = createMaterialTopTabNavigator();


export const EdiOrderDetailHeader = ({paramData}) => {

  const { data, loading, error } = useQuery(EDI_ORDER_QUERY, {
    variables: { orderId: paramData.id }, // replace '12345' with the actual order ID
  });

  //console.log('data form header' , data)
  //const lens = 11
  ;

  if (error) {
    console.error('OPEN_ORDER_QUERY error', error);
}
if(loading){
  <Text>Loading...</Text>
}

// Safely access data properties
const { order } = data || {};

if (!order) {
  return <Text>No order data available</Text>;
}
  return (
    <View style={styles.header}>

    <View style = {styles.leftSide} >
      <Text style = {{fontSize:20,color:'white'}}>edi:{order.edi}</Text>

      <Text  style = {{fontSize:20,color:'white'}}>order Number:{order.reference}</Text>

    </View>

    <View  style = {styles.rightSide}>
      <AntDesign onPress={() => {
        navigation.navigate('Home')
      }} name="rightcircleo"
        size={35} color="white" />
       </View>
    </View>
  )
}

export const EdiHeader = ({ setModalOpen, setQuery, setFullData }) => {
  const navigation = useNavigation()
  return (
    <View style={styles.header}>

       <View style = {styles.leftSide} >
      <Ionicons onPress={() => {
        setModalOpen(true); setQuery(''); setFullData([])
      }}
        name="search-circle-sharp" size={48} color="white" />
    </View>

    <View  style = {styles.rightSide}>
      <AntDesign onPress={() => {
        navigation.navigate('Home')
      }} name="rightcircleo"
        size={40} color="white" />
       </View>
    </View>
  )
}

export const ModalHeader = ({ setModalOpen, isModalOpen, query, handleSearch }) => {
  return (
    <>
      <View style={styles.header}>
      
      <View style = {[styles.leftSide  ]}>
        <Pressable onPress={() => setModalOpen(!isModalOpen)}>
          <Text style={{ zIndex: 1000 }}>
            <AntDesign onPress={() => setModalOpen(!isModalOpen)}
              name="closecircle" size={35} color="white" />
          </Text>
        </Pressable>
        </View>

        <View style = {styles.rightSide}>
        <TextInput
          autoFocus={true}
          keyboardType='numeric'
          autoCapitalize="none"
          placeHolder='Search'
          autoCorrect={false}
          clearButtonMode="always"
          value={query}
          onChangeText={queryText => handleSearch(queryText)}
          style={styles.textInput}
        />
      </View>
      </View>
      {query && <View style={styles.notification}><Text style={styles.notificationText}>Edi Certificate</Text></View>}
    </>
  )
}


const styles = StyleSheet.create({
 
  header: {
    backgroundColor: "orange",
    display: 'flex',
    //width: '100%',
    height: 60,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    alignSelf: "stretch",
    margin:5,
    borderRadius:10,
    elevation: 3,

  },
  tabHeader: {
    //backgroundColor: "green",
    display: 'flex',
    //width: '100%',
    height: 70,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    //alignItems: "center",
    alignSelf: "stretch",
    margin:5,
    borderRadius:10
  },

  TextInputTab:{
    display:'flex',
    justifyContent :'center',
    alignItems:'center',
    backgroundColor:'white' ,
    elevation: 3,
     width:'25%' ,
      height:'100%' ,
      borderRadius:10
  },
  inputTab: {
    textAlign: "right",
    borderWidth: 7,
    flex: 1,
    fontSize: 20,
    color: '#000',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'white',
    //width:350
  },

  

  textInput: {
    textAlign: "right",
    borderWidth: 7,
    flex: 1,
    fontSize: 20,
    color: '#000',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'white',
    width:340
  },

  notification: {
    paddingLeft: 250,
    paddingTop: 8,
    height: 40
  },
  notificationText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue'
  },
  textTodo: {
    fontSize: 17,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  // text: {
  //   fontSize: 17,
  //   lineHeight: 21,
  //   fontWeight: 'bold',
  //   letterSpacing: 0.25,
  //   color: 'white',
  // },
  pressableDone:{
     display:'flex',
    flexDirection:'row',
    alignItems: 'center',
    //justifyContent: 'space-between',
    paddingVertical: 12,
    //paddingHorizontal: 14,
    borderRadius: 10,
    elevation: 3,
    width:'70%',
    //backgroundColor:'#d3d3d3'
  },
  textDone: {
    fontSize: 17,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
  circle :{
    borderRadius: 50,
    width: 40,
    height: 40,
    padding: 10,
    backgroundColor:'blue',
    //border: '3px solid #000',
    //color: '#000',
    //textAlign: 'center',
    //font: '32px Arial, sans-serif'
   
  },
});





