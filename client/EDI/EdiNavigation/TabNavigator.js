// import React, { useState } from 'react';
// import { Text, View, Pressable, TextInput, StyleSheet } from 'react-native';
// import { AntDesign } from '@expo/vector-icons';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native'
// import EdiButton from '../../components/EDICertificate/EdiButton';
// import { EdiOrderDetailsScreenOpen } from '../ediScreens/EdiOrderDetailsScreenOpen';
// import { EdiOrderDetailsScreenClosed } from '../ediScreens/EdiOrderDetailsScreenClosed';
// import { EdiOrderDetailsScreenSearch } from '../ediScreens/EdiOrderDetailsScreenSearch';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { useQuery } from '@apollo/client';
// import { useRoute } from '@react-navigation/native';
// import { EdiOrderDetailHeader } from '../../components/headers/Header';

// import { OPEN_ORDER_QUERY } from '../../gql/Query';

// const Tab = createMaterialTopTabNavigator();

// export const  TabNavigator  = ({route})=>{
//     const { paramData} = route.params || {};
//     console.log("paramData from TabNavigator ", paramData)
//   //const {data, error, loading} = useQuery(DEPARTMENTS_QUERY);
//   // const route = useRoute();
//   // const { orderId } = route.params;
//   // console.log('orderId from tabs' , orderId)

  

// //   const { data, loading, error } = useQuery(OPEN_ORDER_QUERY, {
// //     variables: { orderId : "66981a21b7e9ed08923a4105"}, // replace '12345' with the actual order ID
// //   });

// //   //console.log('data form tab' , data)
//    //const lens = paramData.products.length
// //   ;

// const [openProductsLength, setOpenProductsLength] = useState(0);
// const [closedProductsLength, setClosedProductsLength] = useState(0);


// const handleOpenProductsLengthChange = (length) => {
//   setOpenProductsLength(length);
// };

// const handleClosedProductsLengthChange = (length) => {
//   setClosedProductsLength(length);
// };

// //   if (error) {
// //     console.error('OPEN_ORDER_QUERY error', error);
// // }
//   return(
//     <>
//       <EdiOrderDetailHeader paramData = {paramData}/>
//     <Tab.Navigator
//     initialRouteName='EdiOrderDetailsScreenOpen'
//     tabBarOptions={{
//       //activeTintColor: 'tomato',
//       //inactiveTintColor: 'gray',
//       //showLabel: false,
//       //style: {backgroundColor:'red'},
//     }}
//     screenOptions={{
//       //tabBarActiveTintColor: "red",
//       //tabBarInactiveTintColor: "blue",
//       // tabBarStyle: {
//          //height: 105,
//       // },
//       tabBarLabelStyle: {
//         fontSize: 18,
//         margin: 0,
//       },
//       tabBarStyle: {
//         //height: 90,
//         //paddingHorizontal: 5,
//         //paddingTop: 0,
//         backgroundColor: '#d3d3d3',
//         //position: 'absolute',
//         //borderTopWidth: 0,
//         //top:500
//     },
//     }}
//     >
//             <Tab.Screen options={{
//                tabBarLabel: ({focused})=>
//                 (<View style = {{backgroundColor: focused ? 'blue' : 'white', width:125 ,height:65, borderRadius:10,flex:1 ,flexDirection:'row' ,justifyContent:'space-evenly', alignItems:'center'}}>
//               <Ionicons name="search-circle-sharp" size={48} color = {focused ? 'white' : 'blue'} /> 
//               </View>)
//               }} 
//                 name="EdiOrderDetailsScreenSearch"  >
//                   {props => <EdiOrderDetailsScreenSearch {...props}  paramData={paramData} />}
//                 </Tab.Screen>

//       <Tab.Screen   options={{
//           tabBarLabel: ({focused}) => (
//             <View style = {[styles.tabBg,{backgroundColor: focused ? 'blue' :styles.tabBg.backgroundColor , borderRadius:10}]}>
//             <View style={[styles.circle , {backgroundColor: focused ? 'white' : styles.circle.backgroundColor , borderRadius:50}]}><Text style={[styles.textCircle,{color: focused ? 'blue' : styles.textCircle.color}]}>{openProductsLength}</Text></View>
//             <Text style={[styles.text , {color: focused ? 'white' : styles.text.color}]}>Open</Text>
//             </View>
//           ) 
//         }}
//          name="EdiOrderDetailsScreenOpen" >
//           {props => <EdiOrderDetailsScreenOpen onOpenProductsLengthChange={handleOpenProductsLengthChange} {...props}  paramData={paramData}  />}
//           </Tab.Screen>

// <Tab.Screen   options={{
//           tabBarLabel: ({focused}) => (
//             <View style = {[styles.tabBg,{backgroundColor: focused ? 'blue' :styles.tabBg.backgroundColor , borderRadius:10}]}>
//             <View style={[styles.circle , {backgroundColor: focused ? 'white' : styles.circle.backgroundColor , borderRadius:50}]}><Text style={[styles.textCircle,{color: focused ? 'blue' : styles.textCircle.color}]}>{closedProductsLength}</Text></View>
//             <Text style={[styles.text , {color: focused ? 'white' : styles.text.color}]}>Closed</Text>
//             </View>
//           ) 
//         }}
//      name="EdiOrderDetailsScreenClosed" >
//       {props => <EdiOrderDetailsScreenClosed onClosedProductsLengthChange={handleClosedProductsLengthChange} {...props}   paramData={paramData} />}
// </Tab.Screen>
//     </Tab.Navigator>
//     </>
//   )
// }

// const styles = StyleSheet.create({
//   tabContainer: {
//     position: 'absolute',
//     top: 0,
//     width: '100%',
//     height: 70,
//     //backgroundColor: '#F8F7FB',
//      backgroundColor: 'yellow',
//     borderRadius: 10,
//     elevation: 5,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingHorizontal: 20,
//     alignItems: 'center',
//   },

//   tabBg : {
//     flex:1 ,
//     flexDirection:'row' ,
//     justifyContent:'space-evenly',
//      alignItems:'center',
//      width:125 ,
//       borderRadius:10,
//       backgroundColor:'white'

//   },
//   TextInputTab:{
//     display:'flex',
//     justifyContent :'center',
//     alignItems:'center',
//     backgroundColor:'white' ,
//     elevation: 3,
//      width:'25%' ,
//       //height:'5%' ,
//       borderRadius:10
//   },
//   circle :{
//     borderRadius: 50,
//     width: 40,
//     height: 40,
//     padding: 10,
//     backgroundColor:'blue',
//     //border: '3px solid #000',
//     //color: '#000',
//     //textAlign: 'center',
//     //font: '32px Arial, sans-serif'
   
//   },
//   textCircle: {
//     fontSize: 17,
//     lineHeight: 21,
//     fontWeight: 'bold',
//     letterSpacing: 0.25,
//     color: 'white',
//   },
//   text:{
//     color:'black',
//     fontWeight: 'bold',fontSize:18
//   },

// });

import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { EdiOrderDetailHeader } from '../../components/headers/Header';
import { EdiOrderDetailsScreenOpen } from '../ediScreens/EdiOrderDetailsScreenOpen';
import { EdiOrderDetailsScreenClosed } from '../ediScreens/EdiOrderDetailsScreenClosed';
import { EdiOrderDetailsScreenSearch } from '../ediScreens/EdiOrderDetailsScreenSearch';

const Tab = createMaterialTopTabNavigator();

const TabLabel = ({ focused, label, icon, count }) => (
  <View style={[styles.tabBg, focused && styles.tabBgFocused]}>
    {icon ? (
      <Ionicons name="search-circle-sharp" size={48} color={focused ? 'white' : 'blue'} />
    ) : (
      <View style={[styles.circle, focused && styles.circleFocused]}>
        <Text style={[styles.textCircle, focused && styles.textCircleFocused]}>{count}</Text>
      </View>
    )}
    <Text style={[styles.text, focused && styles.textFocused]}>{label}</Text>
  </View>
);

export const TabNavigator = ({ route }) => {
  const { paramData } = route.params || {};
  const [productCounts, setProductCounts] = useState({ open: 0, closed: 0 });

  return (
    <>
      <EdiOrderDetailHeader paramData={paramData} />
      <Tab.Navigator
        initialRouteName="EdiOrderDetailsScreenOpen"
        screenOptions={{
          tabBarLabelStyle: { fontSize: 18, margin: 0 },
          tabBarStyle: styles.tabBar,
        }}
      >
        <Tab.Screen
          name="EdiOrderDetailsScreenSearch"
          options={{
            tabBarLabel: ({ focused }) => (
              <TabLabel focused={focused} icon label="" />
            ),
          }}
        >
          {(props) => <EdiOrderDetailsScreenSearch {...props} paramData={paramData} />}
        </Tab.Screen>

        <Tab.Screen
          name="EdiOrderDetailsScreenOpen"
          options={{
            tabBarLabel: ({ focused }) => (
              <TabLabel focused={focused} label="Open" count={productCounts.open} />
            ),
          }}
        >
          {(props) => (
            <EdiOrderDetailsScreenOpen
              {...props}
              paramData={paramData}
              onProductCountChange={(count) =>
                setProductCounts((prev) => ({ ...prev, open: count }))
              }
            />
          )}
        </Tab.Screen>

        <Tab.Screen
          name="EdiOrderDetailsScreenClosed"
          options={{
            tabBarLabel: ({ focused }) => (
              <TabLabel focused={focused} label="Closed" count={productCounts.closed} />
            ),
          }}
        >
          {(props) => (
            <EdiOrderDetailsScreenClosed
              {...props}
              paramData={paramData}
              onProductCountChange={(count) =>
                setProductCounts((prev) => ({ ...prev, closed: count }))
              }
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#d3d3d3',
  },
  tabBg: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 125,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  tabBgFocused: {
    backgroundColor: 'blue',
  },
  circle: {
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  circleFocused: {
    backgroundColor: 'white',
  },
  textCircle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  textCircleFocused: {
    color: 'blue',
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  textFocused: {
    color: 'white',
  },
});





