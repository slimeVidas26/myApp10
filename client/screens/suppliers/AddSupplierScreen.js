//import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Button ,
  Image,
  TextInput,TouchableOpacity , Modal, 
  Alert} from 'react-native';
import React, { useState , useEffect } from "react";
import { translation } from '../../i18n/supportedLanguages';
import { createStackNavigator } from '@react-navigation/stack'
import { useMutation } from '@apollo/client';
import { SUPPLIERS_QUERY } from '../../gql/Query';
import { ADD_SUPPLIER } from '../../gql/Query';

const Stack = createStackNavigator()


import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';


// Set the key-value pairs for the different languages you want to support.
const i18n = new I18n(translation);

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;

// When a value is missing from a language it'll fallback to another language with the key present.
i18n.enableFallback = true;
// To see the fallback mechanism uncomment line below to force app to use Japanese language.
 i18n.locale = 'he';


//  const customStyles = {
//   content: {
//     top: "50%",
//     left: "50%",
//     right: "auto",
//     bottom: "auto",
//     marginRight: "-100%",
//     transform: "translate(-50%, -50%)",
//     backgroundColor:'grey'
//   }
// };


  export const AddSupplierScreen = ({navigation})=> {

    const handleOpenPopup = () => {
      setIsVisible(true);
    };
  
    const handleClosePopup = () => {
      //Alert.alert(`supplier name ${name}  added`)
      setIsVisible(false);
    };
  
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [addSupplier] = useMutation(ADD_SUPPLIER, {
    refetchQueries: [{ query: SUPPLIERS_QUERY }],
    awaitRefetchQueries: true,
  });


  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setModalVisible(true)
  }, []) 

  const handleAddSupplier = async () => {
    try {
      await addSupplier({ variables: { name, number: parseInt(number) } });
      setName('');
      setNumber('');
      console.log('Success', 'Supplier added successfully');
      setModalVisible(false)
    } catch (error) {
      console.log('Error', error.message);
    }
  };
 
  return (
    <View style = {styles.container}>
    { modalVisible == true && 
       <Modal transparent={true} animationType="fade">
       <TouchableOpacity style={styles.modalBackground} activeOpacity={1} onPress={handleClosePopup}>
         <View style={styles.popupContainer}>
         <View style={styles.inputView}>
       <TextInput
         style={styles.TextInput}
         placeholder="*Name"
         placeholderTextColor="#808080"
         secureTextEntry={false}
         onChangeText={(name) => setName(name)} 
         //keyboardType="numeric" 
       />
     </View>

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

     <View style = {styles.btnZone}>
    
           <TouchableOpacity onPress={()=>{handleAddSupplier();navigation.navigate('Suppliers')}} style={styles.closeButton}>
             <Text style={styles.closeButtonText}>Add</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.closeButton}
       onPress={() => {setModalVisible(false);navigation.goBack()}}>
       <Text style={styles.closeButtonText}>Cancel</Text> 
     </TouchableOpacity>
           </View>
         </View>
       </TouchableOpacity>
       
     </Modal>
      }
    
     </View>
     
  );
}





const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },


  inputView: {
    backgroundColor: "#d3d3d3",
    borderRadius: 30,
    width: "70%",
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

  loginText :{
    fontSize : 20,
    color :'white'
  },
  text:{
    fontSize:30,
    paddingBottom:30,
    color : "blue"
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  icon: {
    //backgroundColor:'green',
    padding: 10,
    borderRadius: 5,
    position: 'relative',
    overflow:'visible',
    top:0,
    zIndex: 5
   
   
   
  },
  btnZone:{
  flexDirection :'row',
  justifyContent: 'space-around',
  width:400
  
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
    marginTop:120,
    backgroundColor: 'white',
    padding: 70,
    borderRadius: 50,
    alignItems: 'center',
    width: '97%'
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
    //flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
    width:120,
    marginTop: 20,
    padding: 15,
    backgroundColor: 'blue',
    borderRadius: 15,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listItem: {
         marginTop: 10,
         paddingVertical: 0,
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
             marginLeft: 10,
             marginRight: 10,
             marginTop: 0,
             marginBottom: 0,
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


