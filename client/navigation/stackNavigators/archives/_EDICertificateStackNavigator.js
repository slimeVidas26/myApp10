import React from 'react'
import { ApplicationProvider, Text, Avatar } from '@ui-kitten/components'
  import { mapping, light as lightTheme } from '@eva-design/eva'
import { createStackNavigator } from '@react-navigation/stack'

import EDICertificateScreen from '../../../screens/ediScreens/EDICertificateScreen'

import PopUp from '../../../screens/ediScreens/PopUpScreen';


const Stack = createStackNavigator()


const EDICertificateStackNavigator = () => {
  return (
     <ApplicationProvider mapping={mapping} theme={lightTheme}>
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
   
      <Stack.Screen name="EDICertificate" component={EDICertificateScreen} />
      <Stack.Screen name="PopUp" component={PopUp} />

     
    </Stack.Navigator>
    </ApplicationProvider>
  )
}

export default EDICertificateStackNavigator



