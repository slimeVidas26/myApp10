import React from "react";
import { SafeAreaView, ImageBackground,useWindowDimensions, View, FlatList, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { translation } from "../../../i18n/supportedLanguages";
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import Constants from 'expo-constants';
import { useQuery } from "@apollo/client";
import { DEPARTMENTS_QUERY, EDI_ORDERS_QUERY } from "../../../gql/Query";
import logo from '../../../assets/warehouse2.jpeg';

const i18n = new I18n(translation);
i18n.locale = Localization.locale;
i18n.enableFallback = true;

// const dimensions = useMemo(() => {
//   const spacing = 5;
//   const width = (Dimensions.get('window').width - 2 * 10) / 2;
//   return { width, spacing };
// }, []);

// const dimensions = {
//   width: (Dimensions.get('window').width - 2 * 10) / 2,
//   spacing: 5,
// };



export const HomeScreen = ({navigation})=> {

  // const dimensions = {
  //   width: (useWindowDimensions().width - 2 * 10) / 2,
  //    spacing: 5,
  //  };

  

 


  const {data:deptData, error:deptError, loading:deptLoading} = useQuery(DEPARTMENTS_QUERY);
  const { data:orderData, error:errorData, loading:loadingData } = useQuery(EDI_ORDERS_QUERY);
  const openOrders = orderData?.orders?.filter(order => order.openOrder === true) || [];
  const numOrders = openOrders?.length || 0;

  if (deptError) {
    console.error('DEPARTMENTS_QUERY error', deptError);
}

const { width } = useWindowDimensions();
  const S = (width -5 *10)/2;
  const XL = (width -30*30)/2;

  console.log("width" , width)
  const isSmallScreen = width < 600;

const DepartmentItem = ({ department }) => {
  console.log('i18n.t(department.title)',i18n.t(department.title))

  return (<TouchableOpacity onPress={() => navigation.navigate(i18n.t(department.title))}>
    <View style={isSmallScreen ? [styles.departmentSmall,{ width:S }] : [styles.departmentLarge,,{ width: XL }]}>
      <Text style={styles.departmentText}>{i18n.t(department.title)}</Text>
      <View style={styles.circle}>
        <Text style={styles.circleText}>{numOrders}</Text>
      </View>
    </View>
  </TouchableOpacity>)
}



if (deptLoading || loadingData) {
  return <ActivityIndicator size="large" color="#0000ff" />;
}

return (
  <ImageBackground source={logo} style={styles.backgroundImage}>
  <SafeAreaView style={isSmallScreen ? styles.containerSmall : styles.containerLarge}>
    
    {deptError && <Text>Erreur de chargement des départements</Text>}
    {errorData && <Text>Erreur de chargement des commandes</Text>}
    {deptData && (
      <FlatList
        // style={styles.flatList}
        data={deptData.departments}
        renderItem={({ item }) => <DepartmentItem department={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.column}
        contentContainerStyle={styles.flatListContent}
      />
    )}
  </SafeAreaView>
  </ImageBackground>
);


}




const styles = StyleSheet.create({
  containerSmall: {
    //backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional background color with transparency
    //padding: 20,
    flex: 0.5,
    //marginTop:400
    // backgroundColor: 'rgba(173, 216, 230)',
    //backgroundColor: 'red',
    

      alignItems: 'center',
    justifyContent: 'flex-end',
    //paddingHorizontal: 20, // Added padding for better layout
  },

  containerLarge: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional background color with transparency
    //padding: 20,
    flex: 1,
    //marginTop:400
    // backgroundColor: 'rgba(173, 216, 230)',
    //backgroundColor: 'red',
    

      alignItems: 'center',
    justifyContent: 'flex-end',
    //paddingHorizontal: 20, // Added padding for better layout
  },
  circle: {
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  circleText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Cover the whole screen
    justifyContent: 'space-evenly', // Align container at the bottom
    alignItems: 'center',     // Center items horizontally

    
    
  },
  
  column: {
    justifyContent: 'space-around',
  },
  // flatList:{
  //   flex:1,
  //   backgroundColor:'red',
  // },
  flatListContent: {
    flexGrow: 1,
    justifyContent: 'center', // Center items vertically
    alignItems: 'center',     // Center items horizontally
  },
  departmentSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // width:toto,
    height: 80,
     margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
     // Shadow for iOS
     shadowColor: '#000',
     shadowOffset: { width: 10, height:  10},
     shadowOpacity: 0.9,
     shadowRadius: 4,
 
     // Shadow for Android
     elevation: 15,
  },

  departmentLarge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //width:toto,
    height: 80,
     margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
     // Shadow for iOS
     shadowColor: '#000',
     shadowOffset: { width: 10, height:  10},
     shadowOpacity: 0.5,
     shadowRadius: 4,
 
     // Shadow for Android
     elevation: 15,
  },
  departmentText: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
