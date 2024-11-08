
import { translation } from '../../i18n/supportedLanguages';
import { createStackNavigator } from '@react-navigation/stack';
// import { PasswordLoginScreen } from '../../screens/passwordLoginScreen';
import { PasswordLoginScreen } from '../../screens/PasswordLoginScreen';

const Stack = createStackNavigator()


import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';


// Set the key-value pairs for the different languages you want to support.
const i18n = new I18n(translation);

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;

// When a value is missing from a language it'll fallback to another language with the key present.
i18n.enableFallback = true;
// To see the fallback mechanism uncomment line below to force app to use Japanese language.
 i18n.locale = 'he';

const LoginStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: true,
    }}>
            {/* <Stack.Screen name="Login" component={LoginScreen} /> */}

      <Stack.Screen name="PasswordLogin" component={PasswordLoginScreen} />

    </Stack.Navigator>
  )
}

export default LoginStackNavigator
