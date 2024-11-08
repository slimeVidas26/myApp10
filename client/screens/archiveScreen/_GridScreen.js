import React, { useState , useCallback, useEffect } from "react";
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView,ImageBackground,View,FlatList,Dimensions,Image, StyleSheet,Text,StatusBar,Button,TouchableOpacity,TextInput,ActivityIndicator} from 'react-native';
import { translation } from "../../i18n/supportedLanguages";
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import Constants from 'expo-constants';
import { Card } from '@rneui/themed';
import logo from '../assets/warehouse.png'



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



export  function GridScreen({navigation}) {

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
  <Card
      containerStyle={[styles.card, { height:90 }]}>
      <Text style={styles.text}>
      {i18n.t(title)}
      </Text>
    </Card>
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

    <ImageBackground source={logo} resizeMode="cover" style={styles.image}>
      {/* <Text style={styles.logoText}>What We Will Do Today ?</Text> */}
    </ImageBackground>

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

  image: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom :200,
  
  //   //  width : null,
  //   //  height : 220,
  //    backgroundColor: '#0553',
  //   aspectRatio: 1.4, 
  //   marginBottom : 80,
  //   alignItems: 'center',
  //   position : 'relative',
  //   top:30,
  //   resizeMode: 'contain'
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