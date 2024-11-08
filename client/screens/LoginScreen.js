//import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Button ,Image,TextInput,TouchableOpacity } from 'react-native';
import React, { useState } from "react";
import { translation } from '../i18n/supportedLanguages';
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



 export const LoginScreen = ({navigation})=> {
  
  const [email, setEmail] = useState("toto");
  const [password, setPassword] = useState("");
 
  return (
    <View style={styles.container}>


     <View style = {styles.image}>
    <Image  source={require('../assets/rami-levy.png')}
    placeholder={"rami-levi"}
        contentFit="cover"
        transition={1000} />
    </View>

    {/* <Image
        style={styles.expoImage}
        source="https://picsum.photos/seed/696/3000/2000"
        placeholder={blurhash}
        contentFit="cover"
        transition={1000}
      /> */}
 
      <StatusBar style="auto" />
      <View>
        <Text style = {styles.text}>
          Entrance
          </Text>
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="*Number"
          placeholderTextColor="#808080"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)} 
          keyboardType="numeric" 
        />
      </View>
 
     
 
      <TouchableOpacity style={styles.loginBtn}
        onPress={() => navigation.navigate('Grid')}>
        <Text style={styles.loginText}>Login</Text> 
      </TouchableOpacity>
    </View>
  );
}



const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },

  logo : {
    width : "100%",
    marginBottom : 10,
    alignItems: 'center',

  }, 
  image: {
    // width : "90%",
    // backgroundColor: '#0553',
    width : "100%",
    marginBottom : 80,
    alignItems: 'center',
    position : 'relative',
    top:20
  },
  expoImage: {
    flex: 1,
    width: '100%',
    backgroundColor: '#0553',
  },

  inputView: {
    backgroundColor: "#d3d3d3",
    borderRadius: 30,
    width: "70%",
    height: 55,
    marginBottom: 20,
 
    alignItems: "center",
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
   
  },

  loginText :{
    fontSize : 20,
    color :'white'
  },
  text:{
    fontSize:30,
    paddingBottom:30,
    color : "blue"
  }
 
});
