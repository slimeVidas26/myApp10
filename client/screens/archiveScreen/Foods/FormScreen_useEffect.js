import React, { useState , useCallback, useEffect } from "react";
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView,
   View,
    FlatList, 
    StyleSheet,
     Text,
      StatusBar,
      Button,
      TouchableOpacity,
    TextInput,ActivityIndicator
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

const ExpressPurchase = ({number , route}) => {

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

  const [product , setProduct] = useState(null)
  const [message, setMessage] = useState('');
  const [shouldShow, setShouldShow] = useState(true);


  useEffect(() => {
    const getProduct = async()=> { 
      let promise = new Promise((resolve, reject) => {
      resolve(DATA.filter(prod => prod.code  === number))});
      
      let result =  await promise; // attendre que la promesse soit résolue (*)
      console.log("result[0]" , result[0])
      if (!number) {
        setShowIcon(false)
        //setShouldShow(false)
        //alert('ShouldShow :'+ !shouldShow)
        setMessage("Please enter number")
        if(shouldShow === false){
          setProduct(null)
      
      }
      
      }else if (number && result[0] ===undefined) {
        setMessage(" Product do not exists")
        onChangeNumber('')
        //alert('ShouldShow :'+ !shouldShow)
        setShowIcon(false)
        setProduct(null)
      }
       else {
        setProduct(result[0])
        console.log(product)
        //alert('ShouldShow :'+ shouldShow)
        onChangeNumber('')
        setShowIcon( false)
        //setShouldShow(false) 
        // setMessage('') 
      }
        }

       
      getProduct();
       
    // }
  }, [number]);

  

  return (
    <View>
    {product && shouldShow ?    
                  (
                     <View>
                      {/* <Text style={styles.text}>{route.params.titre}</Text> */}
                      {/* <Text style={styles.text}>ID:{route.params.id}</Text>  */}
                      <Text style={styles.text}>{number}</Text> 
                      <Text style={styles.text}>{product.code} </Text> 
                      <Text style={styles.text}>{product.product}</Text>
                      <Text style={styles.text}>{product.provider}</Text>
                      </View> 

                  ) : (<View>
                       {/* <Text style={styles.text}>{route.params.titre}</Text> */}
                       {/* <Text style={styles.text}>ID:{route.params.id}</Text>  */}
                       <Text style={styles.textInfo}>{message}</Text> 
                      </View>)
                  
}
    </View>
  );
};


export const FormScreen_useEffect = ( {route , navigation})=>{

  const [number , onChangeNumber] = useState(null);

  const handleClick = () => {
    
    getProduct()
  };
  
  const [text , onChangeText] = useState(null);

  //const {  code , provider , product  } = route.params || { };
  const [shouldShow, setShouldShow] = useState(true);
  const [showIcon, setShowIcon] = useState(false);
  const [placeholder, setPlaceholder] = useState(route.params.titre );


   const clearIcon=(x)=>{
    console.log("x.length",x.length)
    x.length < 1 ? setShowIcon( false)  : setShowIcon( true); 
   } 

  return(
  
    <SafeAreaView>
          {showIcon ?
        (
          <AntDesign style={styles.icon}  name="closesquare" size={24} color="black" />
          
        ) : null}
                    {/* <Searching name="toto"/> */}
                     <TextInput style = {styles.input}
                      autoFocus={true}
                      onChangeText={(number) => { onChangeNumber(number);clearIcon(number)}}
                      placeholder= {placeholder }
                       value = {number}
                      keyboardType="numeric"
                      onSubmitEditing={()=>{handleClick;()=>setShouldShow(!shouldShow)}}
                      />
                      
                      <ExpressPurchase number={number} />

    </SafeAreaView>
  )
}





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
  icon: {
    position: 'absolute',
    right: 15,
    top:20,
    //display:'none'
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
      // backgroundColor: '#f9c2ff',
      borderColor: "#fff",
      borderWidth: 1,
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 20,
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  
});