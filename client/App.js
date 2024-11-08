import React from 'react'
import { ApolloProvider } from '@apollo/client';
import {client} from './Client';
import { SafeAreaView, View, StatusBar, StyleSheet, Text  ,TextInput, Button , TouchableOpacity} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import DrawerNavigator from './navigation/DrawerNavigator'
import { createStackNavigator } from '@react-navigation/stack'

import LandingStackNavigator from './navigation/stackNavigators/LandingStackNavigator'
import LoginStackNavigator from './navigation/stackNavigators/LoginStackNavigator'
//import { EdiItemApprovalScreen } from './screens/ediDcreens/EdiItemApprovalScreen';
//import { EdiCertificateApprovalScreen } from './screens/ediDcreens/EdiCertificateApprovalScreen';
//import {EndEdiFormScreen} from './screens/ediDcreens/EndEdiFormScreen';
//import { EdiCertificateConfirmationScreen } from './screens/ediDcreens/EdiCertificateConfirmationScreen';
// import { EdiOrderDetailsScreenOpen } from './screens/ediScreens/EdiOrderDetailsScreenOpen';
const RootStack = createStackNavigator()



const App = () => {
  return (
     <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ApolloProvider client={client}>
      <NavigationContainer>
          {/* <DrawerNavigator /> */}
          {/* <LandingStackNavigator /> */}
          {/* <LoginStackNavigator /> */}
          
          <RootStack.Navigator screenOptions={{
      headerShown: false,
    }}>
    <RootStack.Group>
     {/* <RootStack.Screen name="EndEdiFormScreen" component={EndEdiFormScreen} />  */}

    {/* { <RootStack.Screen name="EdiOrderDetailsScreenOpen" component={EdiOrderDetailsScreenOpen} />} */}

      {/* <RootStack.Screen name="EdiItemApprovalScreen" component={EdiItemApprovalScreen} />  */}
       {/* <RootStack.Screen name="EdiCertificateConfirmationScreen" component={EdiCertificateConfirmationScreen} /> */}

    <RootStack.Screen name="Landing" component={LandingStackNavigator} />
      <RootStack.Screen name="PasswordLogin" component={LoginStackNavigator} />
      <RootStack.Screen name="DrawerNavigator" component={DrawerNavigator} />
    </RootStack.Group>

    {/* <RootStack.Group screenOptions={{ presentation: 'modal' }}>
        <RootStack.Screen name="MyModal" component={ModalScreen} />
      </RootStack.Group> */}
     

    </RootStack.Navigator>
      </NavigationContainer>
      </ApolloProvider>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    overflow: 'hidden',
  },
  
})

export default App