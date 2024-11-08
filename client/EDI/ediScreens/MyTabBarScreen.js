import React from 'react'

import { Ionicons } from '@expo/vector-icons';
import { EdiOrderDetailHeader } from '../../components/headers/Header';
import { EdiOrderDetailsTab } from '../../components/tabs/EdiOrderDetailsTab';
import { useRoute } from '@react-navigation/native';


 

const MyTabBarScreen = () =>{
  const route = useRoute();
  //const { orderId } = route.params || {};  // Default to an empty object if undefined
  const orderId = "66981a21b7e9ed08923a4105"
  console.log('orderId from eodsn', orderId);
  //console.log('routeParams', route.params);

  
  return (
    <>
    <  EdiOrderDetailHeader orderId={orderId}/>
    <EdiOrderDetailsTab orderId={orderId} />
    </>
  );
}

export default MyTabBarScreen