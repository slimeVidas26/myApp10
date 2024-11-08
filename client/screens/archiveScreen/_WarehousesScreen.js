import React from "react";
import { SafeAreaView, View ,  FlatList, StyleSheet, Text, StatusBar,TouchableOpacity } from 'react-native';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import { translation } from "../../i18n/supportedLanguages";
import { useQuery } from "@apollo/client";
import { WAREHOUSES_QUERY } from "../../gql/Query";
import { HELLO_QUERY } from "../../gql/Query";
//import { EDI_ORDER_ITEMS_BY_NUMBER_QUERY } from "../gql/Query";

// Set the key-value pairs for the different languages you want to support.
const i18n = new I18n(translation);
  
  // Set the locale once at the beginning of your app.
  i18n.locale = Localization.locale;
  
  // When a value is missing from a language it'll fallback to another language with the key present.
  i18n.enableFallback = true;
  // To see the fallback mechanism uncomment line below to force app to use Japanese language.
  // i18n.locale = 'ja';

 export const WarehousesScreen = ({navigation})=>{


  const {data, error, loading} = useQuery(WAREHOUSES_QUERY);
  console.log('data' , data)

  if (error) {
    console.error('WAREHOUSE_QUERY error', error);
}

// const {data, error, loading} =  useQuery(EDI_ORDER_ITEMS_BY_NUMBER_QUERY);
//   console.log('EDI_ORDER_ITEMS_BY_NUMBER_QUERY data from open' , data)

//   if (error) {
//     console.error('EDI_ORDER_ITEMS_BY_NUMBER_QUERY error', error);
//   }



// const { data, loading, error } = useQuery(HELLO_QUERY, {
//   variables: {name: "Jacob"},
// });

// console.log('HELLO_QUERY' , data)

// if (error) {
//   console.error('HELLO_QUERY error', error);
// }


  

  const WarehouseItem = ({ warehouse}) => {
    const { title } = warehouse; 
    console.log('title' , title)
 return(
   <View>
  <TouchableOpacity style={styles.item}
   onPress={() => navigation.navigate('Grid')}>
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
        data={data.warehouses}
        renderItem={({ item }) => (
          <WarehouseItem warehouse={item} />)}
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
    width: "40%",
    height: 140,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 18,
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
        borderColor: "#fff",
        borderWidth: 2,
    //    backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 25,
      color:'white'
    },
  
});