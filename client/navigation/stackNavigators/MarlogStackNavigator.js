import { createStackNavigator } from '@react-navigation/stack'
import { MarlogScreen } from '../../screens/drawerScreens/marlog/MarlogScreen'

const Stack = createStackNavigator()



const MarlogStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="Marlog" component={MarlogScreen} />
    </Stack.Navigator>
  )
}

export default MarlogStackNavigator