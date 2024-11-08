
import { createStackNavigator } from '@react-navigation/stack'
import { TransfertScreen } from '../../screens/drawerScreens/transfert/TransfertScreen'

const Stack = createStackNavigator()



const TransfertStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: true,
    }}>
      <Stack.Screen name="TransfertCertificate" component={TransfertScreen} />
    </Stack.Navigator>
  )
}

export default TransfertStackNavigator