import { createStackNavigator } from '@react-navigation/stack'
import { BottlesScreen, DepositReturnScreen } from '../../screens/drawerScreens/depositReturn/DepositReturnScreen'

const Stack = createStackNavigator()



const DepositReturnStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: true,
    }}>
      <Stack.Screen name="DepositReturn" component={DepositReturnScreen} />
    </Stack.Navigator>
  )
}

export default DepositReturnStackNavigator