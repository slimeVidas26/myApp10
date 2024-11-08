import React , {useState} from 'react'
import OrderInfoState from '../store/OrderInfoState'
import EDIContext from '../store/EDIContext'
import {OrderDetailScreenAll} from './OrderDetailScreenAll' 
import {FormEDIScreen} from './FormEDIScreen' 
import {SignFormScreen} from './SignFormScreen'
import {ChooseRedStampReasonScreen} from './ChooseRedStampReasonScreen'
import { Ionicons } from '@expo/vector-icons'
import {View , StyleSheet} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  data  from "../../../../../../data/Datas";
import { DocumentReview } from '../../DocumentReview'


export const All = ({route}) => {
    const Stack = createNativeStackNavigator();

    const ref = route.params.item.reference;
    const searchIcon = route.params.searchIcon;
    const initialRows = route.params.item.order_details.length;

    //const allState = OrderInfoState();
    //console.log('openState' , openState)

    const allTab =  data.filter((item )=>item.reference=== ref).map((item)=>  item.order_details).flat()

    

  const store = {...OrderInfoState() , ref , searchIcon , initialRows , allTab}
  //console.log('store' , store)
    //EDIContext
//  const [orderInfo, setOrderInfo] = useState({
//   data:data,
//   ref:route.params.item.reference,
//   searchIcon : route.params.searchIcon,
//   initialRows : route.params.item.order_details.length,
//   closedData : data.filter((item )=>item.reference=== route.params.item.reference)
//     });

   

  //  function setData(updateData) {
  //   const newState = { ...orderInfo, updateData };
  //   setOrderInfo(newState);
  //    }

  //    function setClosedData(updateClosedData) {
  //     const newState = { ...orderInfo, updateClosedData };
  //     setOrderInfo(newState);
  //      }


    // const EDIContextSetters = {
    // setData,
    // setClosedData
    // }

  return (
    
<EDIContext.Provider value={store}>
<Stack.Navigator >

  <Stack.Group
  screenOptions={({route , navigation}) => ({
   headerShown:true,
   headerTitleAlign: 'center',
   headerStyle: {
        backgroundColor: '#2F95D6',
        borderBottomColor: '#fff',
        borderBottomWidth: 3,
      },
      headerTintColor: '#fff',
       headerTitleStyle: {
        fontSize: 18,
      },
     
           headerLeft:()=>  <View style={{
        flexDirection: "row",
        padding: 1,
        justifyContent: "space-between",
        alignItems: "center" ,
        }}>
     
        <Ionicons  name="close-circle-outline" size={30} color="#fff"
        onPress={()=>navigation.goBack()} />
      </View>
  })}
  >
  <Stack.Screen   name="OrderDetailScreenAll" component={OrderDetailScreenAll}/>
  <Stack.Screen  name="FormEDIScreen" component={FormEDIScreen} />
  <Stack.Screen   name="SignFormScreen" component={SignFormScreen} />
  <Stack.Screen   name="ChooseRedStampReasonScreen" component={ChooseRedStampReasonScreen} />
  <Stack.Screen name="Document Review" component={DocumentReview} />


  </Stack.Group>
</Stack.Navigator>
</EDIContext.Provider>

  )
}




