import React, { useState , useRef , useEffect} from "react";
import { AntDesign ,  Ionicons } from '@expo/vector-icons';
import { SafeAreaView,
         StyleSheet,
         TouchableOpacity,
          TextInput , 
          Text , View
   } from 'react-native';


import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import { translation } from "../../i18n/supportedLanguages";

import ExpressPurchase from "../../components/arrival/ExpressPurchase";
import EntryCertificate from "../../components/arrival/EntryCertificate";
import RefundCertificate from "../../components/arrival/RefundCertificate";
import SupplierOrder from "../../components/arrival/SupplierOrder";
import EntryCertificateEDI from "../../components/arrival/EntryCertificateEDI";
import ConfirmationOfReceiptOfGoods from "../../components/arrival/ConfirmationOfReceiptOfGoods";
import ConfirmationOfRefundCertificate from "../../components/arrival/ConfirmationOfRefundCertificate";
import { OrderDetail } from "../../components/arrival/OrderDetail";


 const i18n = new I18n(translation)
// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;

// When a value is missing from a language it'll fallback to another language with the key present.
i18n.enableFallback = true;
// To see the fallback mechanism uncomment line below to force app to use Japanese language.
// i18n.locale = 'ja';




export const FormScreen = ( {route , navigation })=>{

  const [text , onChangeText] = useState(null);
   const [number , onChangeNumber] = useState('');
  //const {  code , provider , product  } = route.params || { };
  const [showIcon, setShowIcon] = useState(false);
  const [placeholder, setPlaceholder] = useState(route.params.titre );

  

  const childRef = useRef(null);

  const handleClick = () => { 
    switch (route.params.titre) {
      case "Express Purchase Recommandation":
        childRef.current.expressPurchaseRecommandation();
        childRef.current.clearInput();
        break;

        case "Entry Certificate-EDI":
        childRef.current.EntryCertificateEDIFunc();
        //childRef.current.clearInput();
        break;
    
      default:
        break;
    }
    
  };

  const handleClear = () => { 
    childRef.current.clearInput();
  };


   const clearIcon=(x)=>{
    x.length < 1 ? setShowIcon( false)  : setShowIcon( true) 
   } 

   const project = () => {

    if(route.params.reference) {
      
      return <OrderDetail 
      reference = {route.params.reference}
      supplier = {route.params.supplier}
      order_details = {route.params.order_details}
      placeholder = {route.params.placeholder}
       />;
        
    }
    
    switch(route.params.titre) {

     

    case "Express Purchase Recommandation":
       return <ExpressPurchase  ref={childRef}
       setShowIcon = {setShowIcon} 
       onChangeNumber = {onChangeNumber} 
        number = {number}/>;

      case "Entry Certificate":   return <EntryCertificate />;
      case "Refund Certificate": return <RefundCertificate />;
      case "Supplier Order":  return <SupplierOrder />;

      case "Entry Certificate-EDI":  
      return <EntryCertificateEDI ref={childRef} 
      setShowIcon = {setShowIcon} 
       onChangeNumber = {onChangeNumber} 
        number = {number} />;

      case "Confirmation Of Receipt Of Goods":  return <ConfirmationOfReceiptOfGoods />;
      case "Confirmation Of Refund Certificate":  return <ConfirmationOfRefundCertificate />;

      default: return <Text>No project match</Text>
    }
    
  }

  return(
  
    <SafeAreaView>

              <TextInput style = {styles.input}
                      autoFocus={true}
                      onChangeText={(number) => { onChangeNumber(number);clearIcon(number)}}
                      placeholder= {placeholder }
                       value = {number}
                      keyboardType="numeric"
                onSubmitEditing={handleClick } 
                />
                {showIcon ?
           ( <TouchableOpacity onPress={handleClear}>
            <View>
              {route.params.searchIcon? 
              (
                <Ionicons style={styles.icon } name="search" size={24} color="black" />)
             :(<AntDesign  style={styles.icon }  name="closesquare" size={24} color="black" />)}
            </View>
          </TouchableOpacity>
        ) : null}

          
        { project() }
                     

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
  
  icon: {
    position: 'absolute',
    right: 18,
    top:-44,
    //display:'none'
    cursor:'pointer'
  },
    
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  
});