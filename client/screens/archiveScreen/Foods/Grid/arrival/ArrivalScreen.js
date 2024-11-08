import React, { useState , useCallback, useEffect } from "react";
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView,
   View,
    FlatList, 
    StyleSheet,
     Text,
      StatusBar,
      Button,
      TouchableOpacity,
    TextInput,ActivityIndicator
   } from 'react-native';

import { translation } from "../../../../i18n/supportedLanguages";
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

import { useQuery } from "@apollo/client";
import {ARRIVALS_QUERY} from '../../../../gql/Query'
const i18n = new I18n(translation)
// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.enableFallback = true;
// To see the fallback mechanism uncomment line below to force app to use Japanese language.
// i18n.locale = 'ja';


  export const ArrivalScreen = ({navigation})=>{

  
  const {data, error, loading} = useQuery(ARRIVALS_QUERY);
  console.log('data' , data)

  if (error) {
    console.error('ARRIVALS_QUERY error', error);
}
  // const Item = ({ title }) => (
  //   <View style={styles.item}>
  //     <Text style={styles.title}>{title}</Text>
  //   </View>
  // );
  // const renderItem = ({ item }) => (
  //  <>
  //   <TouchableOpacity style={styles.loginBtn}
  //       onPress={() =>navigation.navigate(`${item.title}`,  {
  //           titre: i18n.t(item.title),
  //           id:item.id
  //         })}>
  //       <Item title={i18n.t(item.title)} /> 
  //     </TouchableOpacity>
  //       </>
  // );

  const ArrivalItem = ({ arrival}) => {
    const { title } = arrival; 
    console.log('title' , title)
 return(
   <View>
  <TouchableOpacity style={styles.item}
   onPress={() => navigation.navigate( i18n.t(title) , {searchIcon : true})}>
   <Text style={styles.title}>{i18n.t(title)}</Text>
 </TouchableOpacity>
 </View>
 )
 
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading && <Text>Loading...</Text>}
      {error && <Text>Check console for error logs</Text>}
      {!loading && !error && data && <FlatList
        data={data.arrivals}
        renderItem={({ item }) => (
          <ArrivalItem arrival={item} />)}
        keyExtractor={(item, index) => index}
      />}
    </SafeAreaView>
  )
 }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7CA1B4",
    alignItems: "center",
    justifyContent: "center",
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


