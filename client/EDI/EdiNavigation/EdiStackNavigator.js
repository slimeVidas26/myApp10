import React from 'react'
import {  Button  , View , Text , TouchableOpacity } from 'react-native';
import { HeaderBackButton } from '@react-navigation/elements'; // Import the back button
import { createStackNavigator } from '@react-navigation/stack'
//import EDICertificateStackNavigator from './EDICertificateStackNavigator';
import EdiOrderDetailsStackNavigator from './EdiOrderDetailsStackNavigator';
import EntryCertificateStackNavigator from './EntryCertificateStackNavigator';
import EdiItemApprovalStackNavigator from './EdiItemApprovalStackNavigator';
import HomeStackNavigator from '../../navigation/stackNavigators/HomeStackNavigator';
//import EdiCertificateApprovalStackNavigator from './_EdiCertificateApprovalStackNavigator';
//import EdiCertificateConfirmationStackNavigator from './EdiCertificateConfirmationStackNavigator';
//import EndEdiFormStackNavigator from './_EndEdiFormStackNavigator';
import { HomeScreen } from '../../screens/drawerScreens/home/HomeScreen';
import EDICertificateScreen from '../ediScreens/EDICertificateScreen';
// import PopUpScreen from '../../../screens/ediDcreens/PopUpScreen1';
import { useRoute } from '@react-navigation/native';
import { EdiCertificateApprovalScreen } from '../ediScreens/EdiCertificateApprovalScreen';
import { EndEdiFormScreen } from '../ediScreens/EndEdiFormScreen';
import { EdiCertificateConfirmationScreen } from '../ediScreens/EdiCertificateConfirmationScreen';
import { EdiItemApprovalScreen } from '../ediScreens/EdiItemApprovalScreen';
import { EdiItemApprovalScreenClosed } from '../ediScreens/EdiItemApprovalScreenClosed';

import { TabNavigator } from './TabNavigator';

const Stack = createStackNavigator()
const EdiStackNavigator = () => {

  const route = useRoute();
  console.log("routeName" , route.name);

  return (
    <Stack.Navigator
    //  screenOptions={{
    //   headerShown: false
    // }}
    >

 {/* <Stack.Screen   options={{
          headerShown: true,
         }} name="homeScreen" component={EdiStackNavigator} />  */}

      <Stack.Screen    options={({ navigation }) => ({
             header: () => (
              <View style={{backgroundColor:"white" ,flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                {/* Render the back button */}
                <HeaderBackButton onPress={() => navigation.goBack()} />
                
                <Text style={{ flex: 1, marginLeft: 10 , fontSize:19 }}>EDICertificateScreen</Text>

              
              </View>
            ),
          })}
         name="EDICertificateScreen" component={EDICertificateScreen} />
      <Stack.Screen name="EntryCertificate" component={EntryCertificateStackNavigator} />
      {/* <Stack.Screen name="PopUp" component={PopUpScreen} /> */}
      {/* <Stack.Screen name="MyTabBar" component={EdiOrderDetailsStackNavigator} /> */}
     <Stack.Screen name="TabNavigator" component={TabNavigator} />

      <Stack.Screen name="EdiItemApprovalScreen" component={EdiItemApprovalScreen} />
      <Stack.Screen name="EdiItemApprovalScreenClosed" component={EdiItemApprovalScreenClosed} />

      <Stack.Screen name="EdiCertificateApprovalScreen" component={EdiCertificateApprovalScreen} />
      <Stack.Screen name="EdiCertificateConfirmationScreen" component={EdiCertificateConfirmationScreen} />
      <Stack.Screen name="EndEdiFormScreen" component={EndEdiFormScreen} />


    </Stack.Navigator>
  )
}



export default EdiStackNavigator