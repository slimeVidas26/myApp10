import React from 'react'

import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack'
import { EndEdiFormScreen } from '../../../screens/ediScreens/EndEdiFormScreen';



// import { EdiCertificateApprovalScreen } from '../../../screens/ediDcreens/EdiCertificateApprovalScreen';

const Stack = createStackNavigator()


const EndEdiFormStackNavigator = () => {
  
  return (
     <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
       <Stack.Screen name="EndEdiFormScreen" component={EndEdiFormScreen} />

     </Stack.Navigator>
   
    
  
  )
}


export default EndEdiFormStackNavigator;



