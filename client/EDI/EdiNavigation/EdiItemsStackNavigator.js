import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import EdiItems from '../ediDcreens/EdiItemsScreen';
const Stack = createStackNavigator()

const EdiItemsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="EdiItems" component={EdiItems} />

    </Stack.Navigator>
  )
}

export default EdiItemsStackNavigator



