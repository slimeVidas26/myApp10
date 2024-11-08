import * as React from 'react'
import { useState } from 'react'
import { View, StyleSheet, Image, Text,Modal ,  TouchableOpacity ,Dimensions, Button , TextInput } from 'react-native'
import { createDrawerNavigator, DrawerContentScrollView,DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import Icon from 'react-native-vector-icons/FontAwesome'
import {useNavigation} from '@react-navigation/native';

import HomeStackNavigator from './stackNavigators/HomeStackNavigator'
import EdiStackNavigator from '../EDI/EdiNavigation/EdiStackNavigator'
import MarlogStackNavigator from './stackNavigators/MarlogStackNavigator'
import InventoryStackNavigator from './stackNavigators/InventoryStackNavigator'
import DepositReturnStackNavigator from './stackNavigators/DepositReturnStackNavigator'
import TransfertStackNavigator from './stackNavigators/TransfertStackNavigator'
import DocumentReviewStackNavigator from './stackNavigators/DocumentReviewStackNavigator'
import LandingStackNavigator from './stackNavigators/LandingStackNavigator'
import EntryCertificateStackNavigator from '../EDI/EdiNavigation/EntryCertificateStackNavigator'
//import PopupScreen from '../screens/ediDcreens/PopUpScreen1'
import SuppliersStackNavigator from './stackNavigators/SuppliersStackNavigator'

// import MyRewardsStackNavigator from './stackNavigators/MyRewardsStackNavigator'
// import LocationsStackNavigator from './stackNavigators/LocationsStackNavigator'
// import BottomTabNavigator from './BottomTabNavigator'




const Drawer = createDrawerNavigator()
const height = (Dimensions.get('window').width - 2 * 10);
const navigation = useNavigation


// const DrawerContent = ({ navigation }) => {
//   const openModal = () => {
//     // Navigate to the screen with the modal
//     navigation.navigate('ModalScreen');
//   };

//   return (
//     <View>
//       <View style={{ padding: 20 }}>
//         <Text>Drawer Content</Text>
//       </View>
//       <Button title="Open Modal" onPress={openModal} />
//     </View>
//   );
// };

// const ModalScreen = () => {
//   return (
//     <View style={{height:height,backgroundColor:'green' ,justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Modal Screen</Text>
//     </View>
//   );
// };
const handleOpenPopup = ()=>(
  <Modal  transparent={true} animationType="fade">
     <TouchableOpacity style={styles.modalBackground} activeOpacity={1} onPress={handleClosePopup}>
       <View style={styles.popupContainer}>
       <View style={styles.inputView}>
     <TextInput
       style={styles.TextInput}
       placeholder="*Number"
       placeholderTextColor="#808080"
       secureTextEntry={false}
       onChangeText={(number) => setNumber(number)} 
       keyboardType="numeric" 
     />
   </View>

   <View style={styles.inputView}>
     <TextInput
       style={styles.TextInput}
       placeholder="*Quantity"
       placeholderTextColor="#808080"
       secureTextEntry={false}
       onChangeText={(quantity) => setQuantity(quantity)} 
       keyboardType="numeric" 
     />
   </View>

   <View style = {styles.btnZone}>
   <TouchableOpacity style={styles.closeButton}
     onPress={() => {setModalVisible(false);navigation.goBack()}}>
     <Text style={styles.closeButtonText}>Next</Text> 
   </TouchableOpacity>
         <TouchableOpacity onPress={handleClosePopup} style={styles.closeButton}>
           <Text style={styles.closeButtonText}>Cancel</Text>
         </TouchableOpacity>
         </View>
       </View>
     </TouchableOpacity>
     
   </Modal>
   )

   const handleClosePopup = () => {
    //setIsVisible(false);
    console.log('handleClosePopup')
  };


const DrawerNavigator = () => {

  const navigation = useNavigation();
  // return (
  //   <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
  //     <Drawer.Screen name="ModalScreen" component={ModalScreen} />
  //   </Drawer.Navigator>
  // );

  return (
    <Drawer.Navigator   screenOptions={({ navigation }) => ({
      drawerStyle: {
      position:'absolute',
      top:80
    },
    
    headerTitleStyle: {
        fontWeight: 'bold',
        position :'absolute',
        right:-300 
      },
      drawerPosition: "right",
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.headerRight}>
            <Icon name="bars" size={20} color="#fff" />
          </TouchableOpacity>
        ),
        headerLeft: () => null
        
      })}>
 
    <Drawer.Screen name="Home" component={HomeStackNavigator}
     options={{ drawerLabel: 'Home Page' ,title: 'Dahan Isaac',
    headerTintColor: '#fff'}}/>
    <Drawer.Screen name="EDICertificate" component={EdiStackNavigator} 

    options={{headerLeft: () => (
           <TouchableOpacity onPress={()=>navigation.navigate('EntryCertificate')} style={styles.headerLeft}>
          <Icon name="pencil-square-o" size={30} color="#fff" />  
          </TouchableOpacity> 
        ),}}
    />
    <Drawer.Screen name="Marlog" component={MarlogStackNavigator} />
    <Drawer.Screen name="Inventory" component={InventoryStackNavigator} />
    <Drawer.Screen name="DepositReturn" component={DepositReturnStackNavigator} />
    <Drawer.Screen name="TransfertCertificate" component={TransfertStackNavigator} />
    <Drawer.Screen name="DocumentReview" component={DocumentReviewStackNavigator} />
    <Drawer.Screen name="Suppliers" component={SuppliersStackNavigator}
    options={{headerLeft: () => (
      <TouchableOpacity onPress={()=>navigation.navigate('AddSupplier')} style={styles.headerLeft}>
     <Icon name="pencil-square-o" size={30} color="#fff" />  
     </TouchableOpacity> 
   ),}}
    />

    <Drawer.Screen name="Disconnect" component={LandingStackNavigator} />

    {/* <Drawer.Screen name="MyModal" component={ModalScreen} /> */}


      {/* <Drawer.Screen name="HomeTabs" component={BottomTabNavigator} />
      <Drawer.Screen name="MyRewardsStack" component={MyRewardsStackNavigator} />
      <Drawer.Screen name="LocationsStack" component={LocationsStackNavigator} /> */}
    </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({
  //modal
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
     justifyContent: 'center',
     
  },
  inputView: {
    backgroundColor: "#d3d3d3",
    borderRadius: 30,
    width: "70%",
    height: 55,
    marginBottom: 20,
    alignItems: "center",
    marginHorizontal:50
  },
 
  TextInput: {
    height: 60,
    flex: 1,
    padding: 5,
    marginLeft: 10,
    fontSize : 20,
    borderRadius : 25,
  },
  loginBtn: {
    width: "60%",
    borderRadius: 25,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "blue",
    marginHorizontal:80
   
  },

  closeBtn: {
    width: "60%",
    borderRadius: 25,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "grey",
    marginHorizontal:80
   
  },

  loginText :{
    fontSize : 20,
    color :'white'
  },
  text:{
    fontSize:30,
    paddingBottom:30,
    color : "blue"
  },
  
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    
  
  },
  headerRight: {
    marginRight: 15,
  },
  headerLeft: {
    marginLeft: 15,
    
  },
  // drawer content
  drawerLabel: {
    fontSize: 14,
  },
  drawerLabelFocused: {
    fontSize: 14,
    color: '#551E18',
    fontWeight: '500',
  },
  drawerItem: {
    height: 50,
    justifyContent: 'center'
  },
  drawerItemFocused: {
    backgroundColor: '#ba9490',
  },
})

export default DrawerNavigator