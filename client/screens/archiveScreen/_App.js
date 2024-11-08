 //npm install @react-navigation/native
 //npx expo install react-native-screens react-native-safe-area-context
 //npm install @react-navigation/native-stack
//npm i expo-localization i18n-js


import { ApolloProvider } from '@apollo/client';
import {client} from '../../Client';
import { NativeBaseProvider, Box } from "native-base";
import React  , {useEffect , useState , useLayoutEffect} from "react";
import OrderInfoState from "../Foods/Grid/arrival/EntryCertificateEDI/store/OrderInfoState";
import EDIContext from "../Foods/Grid/arrival/EntryCertificateEDI/store/EDIContext";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StyleSheet, Text, View , Button ,Image,
  TextInput,TouchableOpacity, ScrollView } from 'react-native';
  import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
  import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
  import { Ionicons } from '@expo/vector-icons'
  import { useNavigation } from '@react-navigation/native';
  import { AntDesign } from '@expo/vector-icons';
  import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
  



import { HomeScreen } from './screens/HomeScreen';
import {GridScreen  } from './screens/GridScreen';
import { LoginScreen } from './LoginScreen';
import {HelloScreen} from '../../HelloScreen';
import {ArrivalScreen} from '../Foods/Grid/arrival/ArrivalScreen';
   import {ExpressPurchaseScreen} from '../Foods/Grid/arrival/ExpressPurchase/ExpressPurchaseScreen' 
   import {EntryCertificateEDIScreen} from '../Foods/Grid/arrival/EntryCertificateEDI/EntryCertificateEDIScreen' 
   import {AuthorsEDIScreen} from '../Foods/Grid/arrival/AuthorsEDIScreen' 

  import { DocumentReview } from "../Foods/Grid/arrival/DocumentReview";
   import {Open} from '../Foods/Grid/arrival/EntryCertificateEDI/OrderDetail/Open'
   import {All} from '../Foods/Grid/arrival/EntryCertificateEDI/OrderDetail/All'
   import {Closed} from '../Foods/Grid/arrival/EntryCertificateEDI/OrderDetail/Closed'

  //  import {Screen1} from './screens/Screen1';
  //  import {Screen2} from './screens/Screen2' ;
  //  import {Screen3} from './screens/Screen3';
  //  import {Screen4} from './screens/Screen4';

  //  import {Screen5} from './screens/Screen5';
  //  import {Screen6} from './screens/Screen6';
  //  import {Screen7} from './screens/Screen7';
  //  import {Screen8} from './screens/Screen8';


import {StockScreen} from '../Foods/StockScreen'
import {WarehousesScreen} from './screens/WarehousesScreen';
import {FormScreen} from '../Foods/FormScreen'
import {SignFormScreen} from '../Foods/Grid/arrival/EntryCertificateEDI/OrderDetail/SignFormScreen'





 import { translation } from '../../i18n/supportedLanguages';
 import * as Localization from 'expo-localization';
 import { I18n } from 'i18n-js';
// // Set the key-value pairs for the different languages you want to support.
 const i18n = new I18n(translation);
// // Set the locale once at the beginning of your app.
 i18n.locale = Localization.locale;
// // When a value is missing from a language it'll fallback to another language with the key present.
 i18n.enableFallback = true;
// To see the fallback mechanism uncomment line below to force app to use Japanese language.
 i18n.locale = 'he';

 //client.httpCache.clearAll()

 



// const screenOptions = (route, color) => {
//   let iconName;

//   switch (route.name) {
//     case 'Open':
//       iconName = 'ios-home';
//       break;
//     case 'rr':
//       iconName = 'ios-home';
//       break;
//     case 'All':
//       iconName = 'ios-person';
//       break;
//     default:
//       break;
//   }
//   return <Ionicons name={iconName} color={color} size={24} />;
// };


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const topTab = createMaterialTopTabNavigator();
//export const Context1 = React.createContext(null);


function MyTabs({route , navigation}) {
  useLayoutEffect(() => {
    const setNavigationConfig = () => {
      const navigationOptions = () => {

        //let rows = route.params.item.order_details.length
        //console.log('length' , route.params.item.order_details.length)
      
        return {
          
          headerLeft: () => {
           
          
            let button = 0 ? (
             <View style={{
           flexDirection: "row",
           padding: 1,
           justifyContent: "space-between",
           alignItems: "center" ,
           }}>
             <Ionicons  name="close-circle-outline" size={30} color="#fff"
             onPress={()=>navigation.goBack()}  
             />
             <AntDesign style  = {{margin:10}} name="checkcircleo" size={24} color="#fff"
             onPress={()=>{alert('toto');navigation.navigate('SignFormScreen')}} />
           </View>
            )
            : (
             <View style={{
           flexDirection: "row",
           padding: 1,
           justifyContent: "space-between",
           alignItems: "center" ,
           }}>
             <Ionicons  name="close-circle-outline" size={30} color="#fff"
             onPress={()=>navigation.goBack()}  
             />
           
           </View> 
            )
           
    return  button;
          }
        };
      };

      const navigationParams = () => {
        return {
          rows: route.params.rows,
          
        };
      };
          navigation.setParams(navigationParams());
          navigation.setOptions(navigationOptions());
    };

    setNavigationConfig();
  }, []);
  return (
    <topTab.Navigator
      tabBarPosition="bottom"
      
       screenOptions={({ route }) => ({
        swipeEnabled:false,
      tabBarStyle: ((route) => {
              const routeName = getFocusedRouteNameFromRoute(route) ?? ""
             // console.log(routeName)
              if (routeName === 'FormEDIScreen') {
                return { display: "none" }
              }
              if (routeName === 'SignFormScreen') {
                return { display: "none" }
              }
              if (routeName === 'ChooseRedStampReasonScreen') {
                return { display: "none" }
              }
              if (routeName === 'DocumentReview') {
                return { display: "none" }
              }
              return
              return
            })(route),
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
      <topTab.Screen name="Open" component={Open} initialParams={{id: route.params.id ,
       orderNumber:route.params.orderNumber
        , date:route.params.date , rows:route.params.rows , quantity:route.params.quantity}} />
      {/* <topTab.Screen name="Closed" component={Closed} initialParams={{item: route.params.item }} /> */}
      {/* <topTab.Screen name="All" component={All} initialParams={{item: route.params.item   }} /> */}

    </topTab.Navigator>
  );
}

export const Context1 = React.createContext(null);
export const Context2 = React.createContext(null);

function StackNavA() {
//Context 1
const context1InitialState = {
fullName: null,
destinationCountry: null,
departureCountry: null
};
const [passengerInfo, setPassengerInfo] = useState(context1InitialState);
function setFullName(fullName) {
const newState = { ...passengerInfo, fullName };
setPassengerInfo(newState);
}
function setDestinationCountry(destinationCountry) {
const newState = { ...passengerInfo, destinationCountry };
setPassengerInfo(newState);
}
function setDepartureCountry(departureCountry) {
const newState = { ...passengerInfo, departureCountry };
setPassengerInfo(newState);
}
const context1Setters = {
setFullName,
setDestinationCountry,
setDepartureCountry
}
return (
<Context1.Provider value={{ ...passengerInfo, ...context1Setters }}>
<Stack.Navigator>
<Stack.Screen name="Screen 1" component={Screen1} />
<Stack.Screen name="Screen 2" component={Screen2} />
<Stack.Screen name="Screen 3" component={Screen3} />
<Stack.Screen name="Screen 4" component={Screen4} />
</Stack.Navigator>
</Context1.Provider>
)
}




//   function MainTabNavigator({route}) {
  
//   return (
//   <Tab.Navigator   screenOptions={({route}) => ({ tabBarIcon : ({color}) => screenOptions(route, color),headerShown:false})} initialRouteName="Open">

//       <Tab.Screen name="Open" component={Open}  initialParams={{item: route.params.item  , rows:route.params.rows  }} />
//       <Tab.Screen name="Closed" component={Closed} initialParams={{item: route.params.item , rows:route.params.rows }} />
//       <Tab.Screen name="All" component={All} initialParams={{item: route.params.item , rows:route.params.rows }} />


//       {/* options={({ route }) => ({  code:route.params.code })} */}
//     {/* <Tab.Screen name='OrderDetailScreenOpen' component={OrderDetailScreenOpen} 
//     options={()=>({
//       tabBarIcon: ({ color, size }) => (
//         <Ionicons name='ios-home' color={color} size={size}/>
//       )
//        }) 
//     }   />
//       <Tab.Screen name='OrderDetailScreenClosed' component={OrderDetailScreenClosed } 
//       options={{
//       tabBarIcon: ({ color, size }) => (
//         <Ionicons name='ios-home' color={color} size={size} 
        
//         />
//       )
//     }} />
//       <Tab.Screen name='OrderDetailScreenAll' component={OrderDetailScreenAll}
//         options={{
//       tabBarIcon: ({ color, size }) => (
//         <Ionicons name='ios-person' size={size} color={color} />
//       )
//     }} /> */}

//     </Tab.Navigator>
    
//   )
// }



// const myHeader = () => {
//   useEffect(() => {
//     const navigation = useNavigation()

//       navigation.setOptions({
       
        
//         headerRight: 
//     ({props}) => {
//       let button = !rows ? (

//         <Ionicons  {...props} name={'ios-person'} color={'#000'} size={24} onPress={() => navigation.navigate('SignFormScreen')} />
//       )

//       : (
//         null
//            )

// return button;
//     }
      
//       });
//   }, [navigation]);


//  return (
//    <View style={{ alignItems: "center" }}>
//    <Text style={styles.item}>No data found</Text>
//    <Text style={styles.item}>rows : {rows}</Text>

//    </View>
//  )}



function App() {

  const store = { ...OrderInfoState() };

  return (
    <ApolloProvider client={client}>
    {/* <EDIContext.Provider value = {store} > */}
    <NavigationContainer>
      <Stack.Navigator screenOptions={() => ({
                    headerStyle: {
                        backgroundColor: 'coral',
  
                        
                    },
                    headerTintColor: 'white',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                })}>
 {/* <Stack.Screen name="Hello" component={HelloScreen} options = {{title:"Hello"}} /> */}
<Stack.Screen  name="Home" component={HomeScreen} options = {{title:"Home"}} />
<Stack.Screen name="Login" component={LoginScreen} options = {{title:"Login"}} />
<Stack.Screen name="Warehouses" component={WarehousesScreen} options = {{title:"Warehouses"}} />
<Stack.Screen name="Grid" component={GridScreen} options = {{title:"Grid"}} />
<Stack.Screen name="Arrival" component={ArrivalScreen} options = {{title:i18n.t("Arrival")}} />
   <Stack.Screen name="Express Purchase" component={ExpressPurchaseScreen} options ={{title:i18n.t("Express Purchase")}}/>
  
   <Stack.Screen name="EntryCertificateEDI" component={EntryCertificateEDIScreen}  />
   <Stack.Screen name="AuthorsEDI" component={AuthorsEDIScreen}  />

   <Stack.Screen name="Document Review" component={DocumentReview} />

<Stack.Screen name="Stock" component={StockScreen} options = {{title:i18n.t("Stock")}} />
<Stack.Screen name="Form" component={FormScreen}   options={({ route }) => ({ title: route.params.titre , reference:route.params.reference })} />

<Stack.Screen name="MyTabs" component={MyTabs}
   options={({ route }) => ({ headerStyle: {
        backgroundColor: '#2F95D6',
        borderBottomColor: '#fff',
        borderBottomWidth: 3,
      },  headerShown:false,
     
       headerTintColor: '#fff',
       headerTitleStyle: {
        fontSize: 18,
      
      }, title: route.params.titre , reference:route.params.reference ,rows:route.params.rows 
           
       })} />

     
      </Stack.Navigator>
    </NavigationContainer>
    {/* </EDIContext.Provider> */}
    </ApolloProvider>
  );
}

export default App;


