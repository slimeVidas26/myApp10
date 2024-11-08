import React from 'react'

import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack'



import { EdiCertificateConfirmationScreen } from '../../../screens/ediScreens/EdiCertificateConfirmationScreen';
const Stack = createStackNavigator()


const EdiICertificateConfirmationStackNavigator = () => {
  
  return (
     <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
       <Stack.Screen name="EdiCertificateConfirmationScreen" component={EdiCertificateConfirmationScreen} />

     </Stack.Navigator>
   
    
  
  )
}


export default EdiICertificateConfirmationStackNavigator;



