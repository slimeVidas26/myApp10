import { Image } from 'expo-image';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet,ImageBackground, useWindowDimensions,Text, View , Button ,TextInput,TouchableOpacity } from 'react-native';
import React, { useState,useEffect } from "react";
import passwordBG from '../assets/password.jpeg';



import { useQuery } from "@apollo/client";
import { gql } from '@apollo/client';
// GraphQL query for login
const LOGIN_QUERY = gql`
  query Login($password: String!) {
    login(password: $password)
  }
`;



export const PasswordLoginScreen = ({navigation})=> {
  
    const [password, setPassword] = useState(''); 
    const { width } = useWindowDimensions();
  console.log("width" , width)
  const isSmallScreen = width < 600;
  
    const { data } = useQuery(LOGIN_QUERY, {
      variables: { password },
      skip: password.length === 0,
    });

    useEffect(() => {
      // Clear password on component mount
      setPassword('');
    }, []);

    useEffect(() => {
      if (data?.login) {
        setPassword('');
        console.log('datalogin' , data.login)
      
        navigation.navigate('DrawerNavigator');
      }
    }, [data , navigation]);

    return (
      <ImageBackground
      source={isSmallScreen?passwordBG:passwordBG } // Replace with your image URL
      style={styles.backgroundImage}>

      <View style={isSmallScreen ? styles.containerSmall : styles.containerLarge}>
      <Text style={styles.title}>Enter Password</Text>
      <View style={isSmallScreen ? styles.inputViewSmall : styles.inputViewLarge}>
      <TextInput
         style={styles.TextInput}
        secureTextEntry={true}
        value={password}
        onChangeText={(password) => setPassword(password)} 
        placeholder="Password"
        autoComplete="password"  // Enable auto-fill for password fields
        //textContentType="password"
      />
       </View>
    </View>
      </ImageBackground>
    );
  }

  const styles = StyleSheet.create({
  
    containerSmall: {
      flex: 1,
      //backgroundColor: '#fff',
      alignItems: 'center',
       justifyContent: 'center',
    },
    containerLarge: {
      flex: 1,
      //backgroundColor: '#fff',
      alignItems: 'center',
       justifyContent: 'center',
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover', // Cover the whole screen
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
  
    inputViewSmall: {
      //backgroundColor: "#d3d3d3",
      borderRadius: 30,
      width: "70%",
      height: 55,
      marginBottom: 20,
      alignItems: "center",
    },
    inputViewLarge: {
      //backgroundColor: "#d3d3d3",
      borderRadius: 30,
      width: "35%",
      height: 55,
      marginBottom: 20,
      alignItems: "center",
    },
   
    TextInput: {
      height: 60,
      //flex: 1,
      //padding: 5,
      //marginLeft: 10,
      fontSize : 20,
      borderRadius : 25,
      backgroundColor:'#d3d3d3',
      paddingVertical: 12,
      paddingHorizontal: 50,
      textAlign:'center',
      color:'#696969'

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
    },
    title:{
      
      fontSize: 30,
      color: 'lightblue', // Darker text color for better contrast
      marginBottom: 20,
      textAlign: 'center', // Center the text for a cleaner UI
      fontWeight: 'bold',
      // textShadowColor: '#000',        // Shadow color
      // textShadowOffset: { width: 2, height: 2 }, // Offset the shadow
      // textShadowRadius: 4,  
      /*The format for textShadow is:
      "offsetX offsetY blurRadius color"*/
      textShadow: "2px 2px 4px #000",
    }
   
  });

