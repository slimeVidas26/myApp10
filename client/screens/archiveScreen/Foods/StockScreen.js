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


import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import { translation } from "../../i18n/supportedLanguages";


// const i18n = new I18n({
//   en: { welcome: 'Hello' ,
//    name: 'Isaac',
//    Arrival:'Arrival' ,
//     Sells:'Sells' ,
//      Catalog: 'Catalog' ,
//       Stock :'Stock', 
//       Marlog : 'Marlog' ,
//        System: 'System' ,
//         All: 'All',
//   'Express Purchase Recommandation':'Express Purchase Recommandation',
//   'Entry Certificate':'Entry Certificate',
//    'Refund Certificate':'Refund Certificate',
//    'Supplier Order':'Supplier Order',
//    'Entry Certificate-EDI':'Entry Certificate-EDI',
//    'Confirmation Of Receipt Of Goods':'Confirmation Of Receipt Of Goods',
//    'Confirmation Of Refund Certificate':'Confirmation Of Refund Certificate',
   
   

//   },

//   he: { welcome: 'שלום' ,
//    name: ',צחק' ,
//    Arrival : 'רכש' ,
//    Sells: 'מכירות',
//     Catalog:'קטלוג' ,
//      Stock :'מלאי' ,
//       Marlog:'מרלוג' , 
//       System:'מערכת' ,
//        All:'הכל' ,
//    'Express Purchase Recommandation':'המלצה לרכש אקספרס',
//    'Entry Certificate':'תעודת כניסה',
//     'Refund Certificate':'תעודת החזר',
//     'Supplier Order':'הזמנת ספק',
//     'Entry Certificate-EDI':'תעודת כניסה-EDI',
//     'Confirmation Of Receipt Of Goods':'אישור קבלת סחורה',
//     'Confirmation Of Refund Certificate':'אישור תעודת החזר',
    
//      'Confirmation Of Transfer Certificate': 'אישור תעודת העברה',
//      'Transfer Between Locations':'העברה בין מיקומים',
//      'Internal Order':'הזמנה פנימית',
//      'Transfer Certificate': 'תעודת העברה',
//      'Inventory Count':'ספירת מלאי',
//      'Locating Item':'איתור פריט',
//      'Locating Location':'איתור מיקום',
//      'Cargo Inspection':'בדיקת מטענים',
//      'Confirmation Of Transfer Certificate From Marlog': 'אישור תעודת העברה מהמרלוג'},

// });

const i18n = new I18n(translation)

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;

// When a value is missing from a language it'll fallback to another language with the key present.
i18n.enableFallback = true;
// To see the fallback mechanism uncomment line below to force app to use Japanese language.
// i18n.locale = 'he';
export const StockScreen =()=>{

  const DATA = [
    {
      id: 'bd7acbea-4578-46c2-aed5-3ad53abb28ba',
      title: 'Confirmation Of Transfer Certificate',
    },
    
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Transfer Between Locations',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d74',
      title: 'Internal Order',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b9',
      title: 'Transfer Certificate',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fb491aa97f63',
      title: 'Inventory Count',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53obb28b9',
      title: 'Locating Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4t8-fb491aa97f63',
      title: 'Locating Location',
    },
    {
      id: 'bd7acbea-c1b1-dddd-aed5-3ad53obb28b9',
      title: 'Cargo Inspection',
    },
    {
      id: '3ac68afc-c605-48d3-f45t-fb491aa97f63',
      title: 'Confirmation Of Transfer Certificate From Marlog',
    },
   
  ];

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
  const renderItem = ({ item }) => (
    <Item title={i18n.t(item.title)} />
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