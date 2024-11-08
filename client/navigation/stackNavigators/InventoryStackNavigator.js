import { createStackNavigator } from '@react-navigation/stack'
import { InventoryScreen } from '../../screens/drawerScreens/inventory/InventoryScreen'

const Stack = createStackNavigator()



const InventoryStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="Inventory" component={InventoryScreen} />
    </Stack.Navigator>
  )
}

export default InventoryStackNavigator