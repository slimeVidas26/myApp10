// import { StyleSheet, Text, View , Button} from 'react-native';
// import { StatusBar } from 'expo-status-bar';
// import { createStackNavigator } from '@react-navigation/stack'
// import { translation } from '../../i18n/supportedLanguages';
// import * as Localization from 'expo-localization';
// import { I18n } from 'i18n-js';

import React from 'react';
import { StyleSheet,ImageBackground, Text, View, Button  , TouchableOpacity ,Pressable, useWindowDimensions} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import { translation } from '../../i18n/supportedLanguages';
import loginBg from '../../assets/landing.png';


// Initialize i18n
const i18n = new I18n(translation);
i18n.locale = Localization.locale;
i18n.enableFallback = true;


// Set the key-value pairs for the different languages you want to support.
//const i18n = new I18n(translation);
// Set the locale once at the beginning of your app.
//i18n.locale = Localization.locale;
//console.log(i18n.locale)
// When a value is missing from a language it'll fallback to another language with the key present.
//i18n.enableFallback = true;
// To see the fallback mechanism uncomment line below to force app to use Japanese language.
 //i18n.locale = 'he';
 //console.log(i18n.locale)


 //client.httpCache.clearAll()
 const Stack = createStackNavigator()


 const LandingScreen = ({navigation})=>{

  const { width } = useWindowDimensions();
  console.log("width" , width)
  const isSmallScreen = width < 600;
      return (
        <ImageBackground
        source={isSmallScreen?loginBg:loginBg } // Replace with your image URL
        style={styles.backgroundImage}
      >
        <View style={isSmallScreen ? styles.containerSmall : styles.containerLarge}>

        <Text style={styles.text}>{`${i18n.t('welcome')} ${i18n.t('name')}`}</Text>
        <Text style={styles.text}>Current locale: {i18n.locale}</Text>
        <Text style={styles.text}>Device locale: {Localization.locale}</Text>
        <StatusBar style="auto" />
        {/* <Pressable style={styles.pressable}  onPress={() => navigation.navigate('PasswordLogin')} >
        <Text style={styles.buttonText}>{i18n.t('login')}</Text>
        </Pressable> */}

        <TouchableOpacity style={styles.btn}  onPress={() => navigation.navigate('PasswordLogin')} >
        <Text style={styles.buttonText}>{i18n.t('login')}</Text>
        </TouchableOpacity>
       </View>
       </ImageBackground>
       
      );

      
    }

    const LandingStackNavigator = () => {
      return (
        <Stack.Navigator screenOptions={{
          headerShown: false,
        }}>
          <Stack.Screen name="Landing" component={LandingScreen} />
        </Stack.Navigator>
      )
    }
    

    const styles = StyleSheet.create({
      backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // Cover the whole screen
      },
      containerSmall: {
        flex: 1,
        backgroundColor: 'rgba(173, 216, 230)',
          alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20, // Added padding for better layout
      },

      containerLarge: {
        flex: 1,
        backgroundColor: 'rgba(173, 216, 230)',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20, // Added padding for better layout
      },

      text: {
        fontSize: 24,
        color: 'lightblue', // Darker text color for better contrast
        marginBottom: 10,
        textAlign: 'center', // Center the text for a cleaner UI
        fontWeight: 'bold',
        textShadowColor: '#000',        // Shadow color
        textShadowOffset: { width: 2, height: 2 }, // Offset the shadow
        textShadowRadius: 4,            // Blur radius
      },

      btn:{
    marginTop: 20,
    backgroundColor: '#10c974', // button background color
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',

    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,

    // Shadow for Android
    elevation: 5,
      },
      
      buttonText:{
        color: 'lightblue', // text color
        fontSize: 20,
        fontWeight: 'bold',
        textShadowColor: '#000',        // Shadow color
        textShadowOffset: { width: 2, height: 2 }, // Offset the shadow
        textShadowRadius: 4,            // Blur radius
      },
     
    });

      export default LandingStackNavigator

