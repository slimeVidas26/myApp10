import React, { useState , forwardRef, useImperativeHandle} from "react";
import { SafeAreaView,
   View,
    StyleSheet,
     Text,ActivityIndicator
   } from 'react-native';

import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import { translation } from "../../i18n/supportedLanguages";


 const i18n = new I18n(translation)
// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;

// When a value is missing from a language it'll fallback to another language with the key present.
i18n.enableFallback = true;
// To see the fallback mechanism uncomment line below to force app to use Japanese language.
// i18n.locale = 'ja';



const ExpressPurchase = forwardRef((props, ref) => {

    const { number , onChangeNumber , setShowIcon } = props;

    const [product , setProduct] = useState(null);
    const [message, setMessage] = useState('');
    const [shouldShow, setShouldShow] = useState(true);
    const [loading, setLoading] = useState(false);
  
    const startLoading = ()=> {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  
  
    const DATA = [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        code : '12345',
        product: 'Rice Basmati',
        provider : "Gouri"
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        code : '23456',
        product: 'Ricota',
        provider : "Gad"
  
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d74',
        code : '34567',
        product: 'Biscottes',
        provider : "Vilifood"
  
      },
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b9',
        code : '45678',
        product: 'Arribo',
        provider : "Sides"
  
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fb491aa97f63',
        code : '56789',
        product: 'Shampoo',
        provider : "Fisher"
  
      },
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53obb28b9',
        code : '67890',
        product: 'Tusso',
        provider : "Densher"
  
      },
      {
        id: '3ac68afc-c605-48d3-a4t8-fb491aa97f63',
        code : '78910',
        product: 'Corn Flakes',
        provider : "Gouri"
  
      },
    ];
  
  
    useImperativeHandle(ref, () => ({
     
     
      async expressPurchaseRecommandation(){    
        let promise = new Promise((resolve, reject) => {
        resolve(DATA.filter(prod => prod.code  === number))});
        
        let result =  await promise; // attendre que la promesse soit résolue (*)
  
  
        if (number==='') {
          setShouldShow(false)
          setMessage("")
          setShowIcon(false)
          if(shouldShow === false){
            setProduct(null);
          }
          
          
        
        }else if (number && result[0] ===undefined) {
          startLoading()
          setShouldShow(false)
          setMessage(" Supplier do not exists")
          setShowIcon(false)          
          setProduct(null)
        }
         else {
          startLoading()
          setShouldShow(true) 
          setShowIcon( false)
          setProduct(result[0])
         
        }
          },
          clearInput() {
            setTimeout(() => onChangeNumber(''), 50); 
          },
  
         
    }));
  
    return (
      <SafeAreaView>
  
      {loading ? (
            <ActivityIndicator
              //visibility of Overlay Loading Spinner
              visible={loading}
              //Text with the Spinner
              textContent={'Loading...'}
              //Text style of the Spinner Text
              textStyle={styles.spinnerTextStyle}
            />
          ) : (
            <>
            {product && shouldShow ?    
                    ( <View>
                        {/* <Text style={styles.text}>{route.params.titre}</Text> */}
                        {/* <Text style={styles.text}>ID:{route.params.id}</Text>  */}
                        <Text style={styles.text}>{number}</Text> 
                        <Text style={styles.text}>{product.code} </Text> 
                        <Text style={styles.text}>{product.product}</Text>
                        <Text style={styles.text}>{product.provider}</Text>
                     </View> ) 
                    :
                     (<View>
                         {/* <Text style={styles.text}>{route.params.titre}</Text> */}
                         {/* <Text style={styles.text}>ID:{route.params.id}</Text>  */}
                         <Text style={styles.textInfo}>{message}</Text> 
                    </View>)
      }
            
            </>
          )}
  
  
     
      </SafeAreaView>
    );
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#7CA1B4",
      alignItems: "center",
      justifyContent: "center",
    },
    row: {
      flexDirection: "row",
    },
    square: {
      borderColor: "#fff",
      borderWidth: 1,
      width: "45%",
      height: 140,
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      color: "blue",
      fontSize: 20,
      fontWeight: "bold",
    },
    textInfo: {
      color: "red",
      fontSize: 20,
      fontWeight: "bold",
    },
    
    number: {
      color: "red",
      fontSize: 25,
      fontWeight: "bold",
    },
    card: {
      width: "80%",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40,
      backgroundColor: "#e6ffff",
    },
      item: {
        borderColor: "#fff",
        borderWidth: 1,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      title: {
        fontSize: 20,
      },
    
    
  });

  export default ExpressPurchase