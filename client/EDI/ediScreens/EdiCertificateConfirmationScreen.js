import React, { useState, useCallback, useEffect } from "react";
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView, ImageBackground, View, FlatList, Dimensions, Image, Pressable, StyleSheet, Text, StatusBar, Button, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { translation } from "../../i18n/supportedLanguages";
import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import { Feather } from '@expo/vector-icons';
import { useQuery } from "@apollo/client";
import { DEPARTMENTS_QUERY } from '../../gql/Query';
import Modal from "../../components/modals/Modal";


const i18n = new I18n(translation)
// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.enableFallback = true;
// To see the fallback mechanism uncomment line below to force app to use Japanese language.
// i18n.locale = 'ja';

const spacing = 5;
const width = (Dimensions.get('window').width);
const height = (Dimensions.get('window').height)




export function EdiCertificateConfirmationScreen({ navigation }) {

  const [isModalOpen, setModalOpen] = useState(true);

  const ApproveButtons = () => {
    return (
      
      <View style={styles.approve}>
      
        <Pressable style={styles.nextButton} onPress={()=>navigation.navigate('EDICertificateScreen')} >
          <Text style={styles.approveButtonText}>Close</Text>
        </Pressable>


       

      </View>
    
    )
  }
 
  
  return (
<View style={styles.container}>

  <Modal
    animationType="fade"
    transparent={true}
    visible={isModalOpen}
  >
     
     {/* <Image style={styles.img} source={require('../../assets/Success.jpg')} /> */}
   <View style = {{backgroundColor:'white' , paddingTop:100 , paddingBottom:100 , borderRadius:20}}>
    <Text style = {{fontSize:30 , textAlign:'center'}}>Success</Text>
    </View>
   <ApproveButtons/>    
     
  </Modal>
     

</View>


  );
}

const styles = StyleSheet.create({
  container: {
    //backgroundColor: "blue",

    flex:1,
    //gap: '1rem',
    //flexWrap: "nowrap",
    flexDirection: 'column',
    //height: height,
    marginTop: 50,
    //alignSelf: "stretch",
    alignItems: 'center',
    justifyContent:'flex-start',

  },

  
  approve: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:10
  },
  approveButtonText: {
    color: 'white',
    fontSize: 20,
    //fontWeight: 'bold',
  },
  cancelButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 180,
    padding: 15,
    backgroundColor: '#36454F',
    borderRadius: 15,
  },
  nextButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 400,
    padding: 15,
    backgroundColor: 'blue',
    borderRadius: 15,

  },
 
  
  img: {
    //backgroundColor:'white',
    width:400 , height:300
  },
  
  
  
 

});