import React from "react";
import { SafeAreaView, ImageBackground, View, FlatList, Dimensions, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { translation } from "../../../i18n/supportedLanguages";
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import Constants from 'expo-constants';
import { useQuery } from "@apollo/client";
import { DEPARTMENTS_QUERY, EDI_ORDERS_QUERY } from "../../../gql/Query";
import logo from '../../../assets/warehouse.png';

const i18n = new I18n(translation);
i18n.locale = Localization.locale;
i18n.enableFallback = true;

// const dimensions = useMemo(() => {
//   const spacing = 5;
//   const width = (Dimensions.get('window').width - 2 * 10) / 2;
//   return { width, spacing };
// }, []);

const dimensions = {
  width: (Dimensions.get('window').width - 2 * 10) / 2,
  spacing: 5,
};

export const HomeScreen = ({navigation})=> {

 

  const {data:deptData, error:deptError, loading:deptLoading} = useQuery(DEPARTMENTS_QUERY);
  const { data:orderData, error:errorData, loading:loadingData } = useQuery(EDI_ORDERS_QUERY);
  const openOrders = orderData?.orders?.filter(order => order.openOrder === true) || [];
  const numOrders = openOrders?.length || 0;

  if (deptError) {
    console.error('DEPARTMENTS_QUERY error', deptError);
}

const DepartmentItem = ({ department }) => (
  <TouchableOpacity onPress={() => navigation.navigate(i18n.t(department.title))}>
    <View style={styles.container1}>
      <Text style={styles.departmentText}>{i18n.t(department.title)}</Text>
      <View style={styles.circle}>
        <Text style={styles.circleText}>{numOrders}</Text>
      </View>
    </View>
  </TouchableOpacity>
);


if (deptLoading || loadingData) {
  return <ActivityIndicator size="large" color="#0000ff" />;
}

return (
  <SafeAreaView style={styles.container}>
    <ImageBackground source={logo} resizeMode="cover" style={styles.image} />
    {deptError && <Text>Erreur de chargement des départements</Text>}
    {errorData && <Text>Erreur de chargement des commandes</Text>}
    {deptData && (
      <FlatList
        style={styles.flatList}
        data={deptData.departments}
        renderItem={({ item }) => <DepartmentItem department={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.column}
      />
    )}
  </SafeAreaView>
);
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7CA1B4",
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
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  flatList: {
    flex: 1,
  },
  column: {
    justifyContent: 'space-around',
  },
  container1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: dimensions.width,
    height: 80,
    margin: dimensions.spacing,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
  },
  departmentText: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
