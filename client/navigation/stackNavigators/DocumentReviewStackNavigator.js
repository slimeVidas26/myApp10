import { createStackNavigator } from '@react-navigation/stack'
import { DocumentReviewScreen } from '../../screens/drawerScreens/documentReview/DocumentReviewScreen'

const Stack = createStackNavigator()



const DocumentReviewStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="DocumentReview" component={DocumentReviewScreen} />
    </Stack.Navigator>
  )
}

export default DocumentReviewStackNavigator