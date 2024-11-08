import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

const Refund = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Refund screen!</Text>
  </View>
)

const RefundStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: true,
    }}>
      <Stack.Screen name="Edi" component={Edi} />
    </Stack.Navigator>
  )
}

export default RefundStackNavigator