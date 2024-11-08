import React, { useState , useCallback, useEffect } from "react";
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView,ImageBackground,View,FlatList,Dimensions,Image, StyleSheet,Text,StatusBar,Button,TouchableOpacity,TextInput,ActivityIndicator} from 'react-native';
import { translation } from "../../i18n/supportedLanguages";
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import Constants from 'expo-constants';
import { Card } from '@rneui/themed';
//import logo from '../assets/warehouse.png'
import { Feather } from '@expo/vector-icons';



import { useQuery } from "@apollo/client";
import { DEPARTMENTS_QUERY } from "../../gql/Query";
const i18n = new I18n(translation)
// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.enableFallback = true;
// To see the fallback mechanism uncomment line below to force app to use Japanese language.
// i18n.locale = 'ja';


// const Square = ({ text}) => (
//   <View >
//     <Text style={styles.text}>{text}</Text>
//   </View>
// );

const spacing = 5;
const width = (Dimensions.get('window').width - 2 * 10) / 2;
// const image = {uri: 'https://legacy.reactjs.org/logo-og.png'};
 //const image = require('../assets/logo-og.png');



export function EdiOrderDetailsScreen({navigation}) {

  const {data, error, loading} = useQuery(DEPARTMENTS_QUERY);
  //console.log('data' , data)

  if (error) {
    console.error('DEPARTMENTS_QUERY error', error);
}

const DepartmentItem = ({ department}) => {
  const { title , id } = department; 
  console.log( title , id)
return(
  <TouchableOpacity  onPress={() => navigation.navigate( i18n.t(title))}>
 <View style={styles.listItem}>
        <View style={styles.metaInfo}>
        <Text style={[styles.title]}>12</Text>   
        <Feather name="box" size={26} color="black" />
    <Image style = {[styles.image , {marginLeft:40}]}  source={require('../../assets/gamadim.png')}
    placeholder={"rami-levi"}
        //contentFit="cover"
        //transition={1000} 
        />
        </View>

        <View style={styles.metaInfo2}>
          <Text style={styles.title}>quantity:48</Text>
          <Text style={styles.blueText}>reference</Text>
          <Text style={styles.barcode}>729000145784</Text>

        </View>
        </View>

    </TouchableOpacity>
 
)

};

  return (
    <View style={styles.container}>

  

    {/* <View style = {styles.image}>
    <Image  source={require('../assets/today.jpg')}
    placeholder={"rami-levi"}
        contentFit="cover"
        transition={1000} />
    </View> */}

    {/* <View style = {styles.placeholder}></View> */}

    {/* <ImageBackground source={logo} resizeMode="cover" style={styles.image}> */}
      {/* <Text style={styles.logoText}>What We Will Do Today ?</Text> */}
    {/* </ImageBackground> */}

    {loading && <Text>Loading...</Text>}
      {error && <Text>Check console for error logs</Text>}
      {!loading && !error && data && 
      <FlatList
        data={data.departments}
        renderItem={({ item }) => (
          <DepartmentItem department={item} />)}
        //keyExtractor={(item, index) => index}
        keyExtractor = {(item) => item.id}
        //style={styles.container}
        numColumns={2}
        columnWrapperStyle={styles.column}
      />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#7CA1B4",
    flex: 1,
    //gap: '1rem',
    //flexWrap: "wrap",
    flexDirection: 'column',  
  },
  listItem: {
    width: width,
    margin: spacing,
    backgroundColor:'grey',
    marginTop: 10,
    paddingVertical: 0,
    backgroundColor: '#fff',
    flexDirection: 'column',
    //justifyContent: 'space-around',
    borderRadius: 10,
  },
  metaInfo: {
    flex: 1,

    //backgroundColor:'yellow',
     alignItems:'center',
     justifyContent:'space-between',
    borderRadius: 2,
    flexDirection: "row", // main axis
    //justifyContent: "space-between", // main axis
    //marginLeft: 10,
    //marginRight: 10,
    marginTop: 15,
    //marginBottom: 0,
        paddingBottom:40

  },
  metaInfo2: {
    //backgroundColor:'pink',
    borderRadius: 2,
    flex: 1,
    flexDirection: "column", // main axis
    justifyContent: "space-between", // main axis
    alignItems:'flex-end',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 0,
    marginBottom: 0,
  },

  blueText: {
    fontSize: 24,
    color: 'blue',
    marginBottom: 5,

  },

  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  barcode: {
    fontSize: 16,
    marginBottom: 20,
  },

  image: {
    flex: 1,
    //justifyContent: 'space-between',
    //paddingBottom :200,
  
     //  width : null,
    //height : 220,
      //backgroundColor: '#0553',
     aspectRatio: 1.2, 
  //   marginBottom : 80,
     //alignItems: 'flex-end',
     //position : 'relative',
     //top:30,
     //resizeMode: 'contain'
  },

  placeholder :{
    height: "35%",
    backgroundColor:"yellow",
    marginBottom : 30,
    marginTop : 30


  },

  
  column: {
    flexShrink: 1,
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
    width: width,
    margin: spacing,
    borderRadius: 10  },

  text: {
    color: "black",
    fontSize: 22,
    fontWeight: "bold",
    
  },
  logoText: {
    color: "black",
    fontSize: 25,
    fontWeight: "bold",
    textAlign:'center',
    top:'50%'
    
  },
  icon: {
    position: 'absolute',
    right: 15,
    top:20,
    display:'none'
  },
  number: {
    color: "red",
    fontSize: 25,
    fontWeight: "bold",
  },
  
    card: {
     
      width: width,
      margin: spacing,
      
      // borderColor: "#fff",
      // borderWidth: 1,
      // width: "45%",
      // // height: 140,
       justifyContent: "center",
       alignItems: "center",
       borderRadius:10,
       padding:5
    },
  
    item: {
      // backgroundColor: '#f9c2ff',
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