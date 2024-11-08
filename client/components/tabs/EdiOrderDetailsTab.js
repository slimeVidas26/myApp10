import { Text, View, Pressable, TextInput, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import EdiButton from '../EDICertificate/EdiButton';
import { EdiOrderDetailsScreenOpen } from '../../EDI/ediScreens/EdiOrderDetailsScreenOpen';
import { EdiOrderDetailsScreenClosed } from '../../EDI/ediScreens/EdiOrderDetailsScreenClosed'
import { EdiOrderDetailsScreenSearch } from '../../EDI/ediScreens/EdiOrderDetailsScreenSearch'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useQuery } from '@apollo/client';
import { useRoute } from '@react-navigation/native';

import { DEPARTMENTS_QUERY } from '../../gql/Query';
// import { OPEN_ORDER_QUERY } from '../../gql/Query';

const Tab = createMaterialTopTabNavigator();

export const  EdiOrderDetailsTab  = ({orderId})=>{
  //const {data, error, loading} = useQuery(DEPARTMENTS_QUERY);
  // const route = useRoute();
  // const { orderId } = route.params;
  // console.log('orderId from tabs' , orderId)

  

  // const { data, loading, error } = useQuery(OPEN_ORDER_QUERY, {
  //   variables: { orderId : "66981a21b7e9ed08923a4105"}, // replace '12345' with the actual order ID
  // });

  //console.log('data form tab' , data)
  const lens = 11
  ;

  if (error) {
    console.error('OPEN_ORDER_QUERY error', error);
}
  return (
    <Tab.Navigator
    initialRouteName='EdiOrderDetailsScreenOpen'
    tabBarOptions={{
      //activeTintColor: 'tomato',
      //inactiveTintColor: 'gray',
      //showLabel: false,
      //style: {backgroundColor:'red'},
    }}
    screenOptions={{
      //tabBarActiveTintColor: "red",
      //tabBarInactiveTintColor: "blue",
      // tabBarStyle: {
         //height: 105,
      // },
      tabBarLabelStyle: {
        fontSize: 18,
        margin: 0,
      },
      tabBarStyle: {
        //height: 90,
        //paddingHorizontal: 5,
        //paddingTop: 0,
        backgroundColor: '#d3d3d3',
        //position: 'absolute',
        //borderTopWidth: 0,
        //top:500
    },
    }}
    >
            <Tab.Screen options={{
               tabBarLabel: ({focused})=>
                (<View style = {{backgroundColor: focused ? 'blue' : 'white', width:125 ,height:65, borderRadius:10,flex:1 ,flexDirection:'row' ,justifyContent:'space-evenly', alignItems:'center'}}>
              <Ionicons name="search-circle-sharp" size={48} color = {focused ? 'white' : 'blue'} /> 
              </View>)
              }} 
                name="EdiOrderDetailsScreenSearch"  >
                  {props => <EdiOrderDetailsScreenSearch {...props} data={data} error={error} loading={loading} lens = {lens} />}
                </Tab.Screen>

      <Tab.Screen   options={{
          tabBarLabel: ({focused}) => (
            <View style = {[styles.tabBg,{backgroundColor: focused ? 'blue' :styles.tabBg.backgroundColor , borderRadius:10}]}>
            <View style={[styles.circle , {backgroundColor: focused ? 'white' : styles.circle.backgroundColor , borderRadius:50}]}><Text style={[styles.textCircle,{color: focused ? 'blue' : styles.textCircle.color}]}>{0}</Text></View>
            <Text style={[styles.text , {color: focused ? 'white' : styles.text.color}]}>Open</Text>
            </View>
          ) 
        }}
         name="EdiOrderDetailsScreenOpen" >
          {props => <EdiOrderDetailsScreenOpen {...props} data = {data} error={error} loading={loading} orderId = {orderId} />}
          </Tab.Screen>

<Tab.Screen   options={{
          tabBarLabel: ({focused}) => (
            <View style = {[styles.tabBg,{backgroundColor: focused ? 'blue' :styles.tabBg.backgroundColor , borderRadius:10}]}>
            <View style={[styles.circle , {backgroundColor: focused ? 'white' : styles.circle.backgroundColor , borderRadius:50}]}><Text style={[styles.textCircle,{color: focused ? 'blue' : styles.textCircle.color}]}>{lens}</Text></View>
            <Text style={[styles.text , {color: focused ? 'white' : styles.text.color}]}>Closed</Text>
            </View>
          ) 
        }}
     name="EdiOrderDetailsScreenClosed" >
      {props => <EdiOrderDetailsScreenClosed {...props} data={data} error={error} loading={loading} lens = {lens} />}
</Tab.Screen>
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 70,
    //backgroundColor: '#F8F7FB',
     backgroundColor: 'yellow',
    borderRadius: 10,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    alignItems: 'center',
  },

  tabBg : {
    flex:1 ,
    flexDirection:'row' ,
    justifyContent:'space-evenly',
     alignItems:'center',
     width:125 ,
      borderRadius:10,
      backgroundColor:'white'

  },
  TextInputTab:{
    display:'flex',
    justifyContent :'center',
    alignItems:'center',
    backgroundColor:'white' ,
    elevation: 3,
     width:'25%' ,
      //height:'5%' ,
      borderRadius:10
  },
  circle :{
    borderRadius: 50,
    width: 40,
    height: 40,
    padding: 10,
    backgroundColor:'blue',
    //border: '3px solid #000',
    //color: '#000',
    //textAlign: 'center',
    //font: '32px Arial, sans-serif'
   
  },
  textCircle: {
    fontSize: 17,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  text:{
    color:'black',
    fontWeight: 'bold',fontSize:18
  },

});





