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

import { translation } from "../../../../../../i18n/supportedLanguages";
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import { SignFormScreen } from "./SignFormScreen";
const i18n = new I18n(translation)
// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.enableFallback = true;
// To see the fallback mechanism uncomment line below to force app to use Japanese language.
// i18n.locale = 'ja';


  export const ChooseRedStampReasonScreen = ({navigation})=>{

  const DATA = [
    {
      id: '1',
      title: 'Lack',
    },
    {
      id: '2',
      title: 'Excess',
    },
    {
      id: '3',
      title: 'EDI not received',
    },
    {
      id: '4',
      title: 'Invalid code',
    },
    {
      id: '5',
      title: 'Item not ordered',
    },
    {
      id: '6',
      title: 'Supplier left goods uninspected',
    },
   
   
  ];

  const Item = ({ id , title }) => (
    <View style={styles.item}>
    <Text style={styles.title}> {id} - {title}</Text>
    </View>
  );
  const renderItem = ({ item }) => (
   <>
    <TouchableOpacity style={styles.loginBtn}
        onPress={() =>navigation.navigate('SignFormScreen',  {
            titre: i18n.t(item.title),
            id:item.id
          })}>
        <Item  id = {item.id} title={i18n.t(item.title)} /> 
      </TouchableOpacity>
        </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id} 
      />
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


