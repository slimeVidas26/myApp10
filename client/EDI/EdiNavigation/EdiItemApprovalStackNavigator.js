import React from 'react'

import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack'

import { EdiOrderDetailHeader } from '../../components/headers/Header';

import { EdiOrderDetailsTab } from '../../components/tabs/EdiOrderDetailsTab';
import { EdiItemApprovalScreen } from '../ediScreens/EdiItemApprovalScreen';

const Stack = createStackNavigator()


const EdiItemApprovalStackNavigator = () => {
  
  return (
     <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
       <Stack.Screen name="EdiItemApprovalScreen" component={EdiItemApprovalScreen} />

     </Stack.Navigator>
  )
}


export default EdiItemApprovalStackNavigator;



