import React from 'react'

import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack'



import { EdiCertificateApprovalScreen } from '../../../screens/ediScreens/EdiCertificateApprovalScreen';
// import { EndEdiFormScreen } from '../../../screens/ediDcreens/EndEdiFormScreen';

const Stack = createStackNavigator()


const EdiICertificateApprovalStackNavigator = () => {
  
  return (
     <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
       <Stack.Screen name="EdiCertificateApprovalScreen" component={EdiCertificateApprovalScreen} />
       {/* <Stack.Screen name="EndEdiFormScreen" component={EndEdiFormScreen} /> */}

     </Stack.Navigator>
   
    
  
  )
}


export default EdiICertificateApprovalStackNavigator;



