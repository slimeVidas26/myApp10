import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import EntryCertificate from '../ediScreens/EntryCertificateScreen';

const Stack = createStackNavigator()


const EntryCertificateStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
     
      <Stack.Screen name="EntryCertificate" component={EntryCertificate} />

    </Stack.Navigator>
  )
}

export default EntryCertificateStackNavigator



