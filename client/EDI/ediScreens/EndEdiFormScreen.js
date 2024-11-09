import React, { useState, useRef } from 'react';
import { SafeAreaView,Modal,FlatList,StatusBar, Text, TextInput,TouchableOpacity, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, View,ScrollView, StyleSheet,Pressable, Button, Alert } from 'react-native';
import Signature from 'react-native-signature-canvas';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { Picker } from '@react-native-picker/picker';
import { OpenModalButtonEndEdi } from '../../components/modals/OpenModalButonEndEdi';
import { translation } from '../../i18n/supportedLanguages';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';





const i18n = new I18n(translation)
// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.enableFallback = true;
// To see the fallback mechanism uncomment line below to force app to use Japanese language.
// i18n.locale = 'ja';

export function EndEdiFormScreen({navigation , data}) { 

  const [reason, setReason] = useState('Choose Reason');
  const [lastName, setLastName] = useState('');
  const [name, setName] = useState('isaac'); 
  const [phone , setPhone] = useState('0502822879');
  const [car, setCar] = useState('5544239'); 
  const [signature, setSignature] = useState('');
  const [comment, setComment] = useState(''); 



  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState({}); 
  const [isFormValid, setIsFormValid] = useState(false); 
  const [isScrollEnabled, setIsScrollEnabled] = useState(true);

  const signRef = useRef(null);


  const ApproveButtons = () => {
    return (
      
    <View style={styles.approve } >

      
        <Pressable style={styles.nextButton} onPress={handleSubmit} >
          <Text style={styles.approveButtonText}>Next</Text>
        </Pressable>
        <Pressable style={styles.cancelButton}
          onPress={() => { navigation.goBack() }}>
          <Text style={styles.approveButtonText}>Cancel</Text>
        </Pressable>

      </View>
    
    )
  }

  // const handleSubmit = () => {
    const validateForm = () => {
      let errors = {};
    console.log('Signature:', signature);
    if (!name) { 
			errors.name = 'Name is required.'; 
		}
        // Validate phone field 
		if (!phone) { 
			errors.phone = 'Phone is required.'; 
		 } 
        if (!car) { 
			errors.car = 'Car is required.'; 
		} else if (car.length < 6) { 
			errors.car = 'Car must be at least 6 characters.'; 
		} 

    

        if (!signature) { 
			errors.signature = 'Signature is required.'; 
		 } 
 
    setErrors(errors); 
		setIsFormValid(Object.keys(errors).length === 0); 
    
  };

  const handleSubmit = () => { 
		if (isFormValid ) { 
			// Form is valid, perform the submission logic 
			console.log('Form submitted successfully!');
            navigation.navigate('EdiCertificateConfirmationScreen') 
            
		} else { 
			// Form is invalid, display error messages 
			console.log('Form has errors. Please correct them.'); 
            validateForm()
           
            
		} 
	}; 



  // Called after end of stroke
  const handleEnd = () => {
    signRef.current.readSignature();
  };

  const handleSignature = (sig) => {
    console.log('Captured Signature:', sig);
    setSignature(sig);
  };
  

  const handleClear = () => {
    setSignature('');
    signRef.current.clearSignature();
  };

  return (
    
    <KeyboardAwareScrollView scrollEnabled={isScrollEnabled}>
    <View style={styles.inner}>

        <Text style={styles.title}>Edi Certificate Confirmation</Text>
        <Text style={styles.ref}>Reference : 4707342</Text>
           <Text style = {styles.sidePlaceholder}>{name ? "Name*" : ""}</Text>
        	<TextInput 
				style={[styles.input , { borderBottomColor: errors.name ? 'red' : styles.input.borderBottomColor } ] } 
				placeholder="Name*"
				value={name} 
				onChangeText= {setName}
			/> 
      <Text style = {styles.error}>
        {name ? errors.name==='' : errors.name}
        </Text>
     
        <Text style = {styles.sidePlaceholder}>{phone ? "Phone*" : " "}</Text>
      <TextInput 
        style={[styles.input , { borderBottomColor: errors.phone ? 'red' : styles.input.borderBottomColor } ] }
        placeholder="Phone"
				value={phone} 
				onChangeText={setPhone} 
			/> 
       <Text style = {styles.error}>
           {phone ? errors.phone==='' : errors.phone}
            </Text>
     

      <Text style = {styles.sidePlaceholder}>{car ? "Car*" : " "}</Text>
      <TextInput 
				style={[styles.input , { borderBottomColor: errors.car ? 'red' : styles.input.borderBottomColor } ] }  
				placeholder="Car"
				value={car} 
				onChangeText={setCar} 
				//secureTextEntry 
			/> 
       <Text style = {styles.error}>
             {car ? errors.car ==='' : errors.car}
                </Text>



        <View style={[styles.signatureContainer , { borderBottomColor: errors.signature ? 'red' : styles.signatureContainer.borderBottomColor }]}>
          <Signature
            ref={signRef}
            //onEnd={handleEnd}
            onEnd={() => { handleEnd(); setIsScrollEnabled(true); }} 
            //onOK={handleSignature}
            onOK={(sig) => { handleSignature(sig); setIsScrollEnabled(true); }}
            onBegin={() => setIsScrollEnabled(false)} 
            onEmpty={() => {setSignature('');setIsScrollEnabled(false)}}
            //onEmpty={() => setIsScrollEnabled(true)} 
            descriptionText="Sign"
            clearText="Clear"
            confirmText="Save"
            webStyle={styles.signatureWebStyle}
          />
          
        </View>
        <Text style = {styles.error}>
             {signature ? errors.signature ==='' : errors.signature}
                </Text>


        <View style={styles.formGroup}>
        <Text style = {styles.redStamp}>
          Red Stamp
        </Text>
        <OpenModalButtonEndEdi data = {data}/>
      </View>

      <Text style = {styles.sidePlaceholder}>{comment ? "Comment*" : " "}</Text>
       <TextInput 
				style={[styles.input , { borderBottomColor: errors.comment ? 'red' : styles.input.borderBottomColor } ] }  
				placeholder="Comment"
				value={comment} 
				onChangeText={setComment} 
				//secureTextEntry 
			/> 
       <Text style = {styles.error}>
             {comment ? errors.comment ==='' : errors.comment}
                </Text>
      
      <ApproveButtons/>
      </View>
      </KeyboardAwareScrollView>
     
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // padding: 16,
    //marginTop: StatusBar.currentHeight || 0,
  },

  inner: {
    padding: 16,
    flex: 1,
    justifyContent: 'space-around',
  },
  
  formGroup: {
    marginBottom: 16,
  },
  title:{
    color:'blue',
    fontSize:22,
    textAlign:'right',
    marginBottom:30
  },
  sidePlaceholder:{
    position:'relative',
    top:24,
    right:10,
    zIndex:100,
    fontSize:16,
    textAlign:'right',
  },
  
  ref:{
    fontSize:18,
    textAlign:'right',
    marginBottom:20

  },
  redStamp:{
    position:'relative',
     top : 22,
     left: 10,
     color:'red',
     zIndex:100,
     fontSize:16
  },
  // centeredView: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
  // },

  // modalContainer:{
  //   flex: 1,
  //   //marginTop: StatusBar.currentHeight || 0,
   
  // },
  // modalView: {
  //    margin: 0,
  //    padding:0,
  //   width:375,
  //   height:555,
  //   backgroundColor: 'white',
  //   //borderRadius: 20,
  //   alignItems: 'center',
  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 4,
  //   elevation: 5,
  // },
  // modalText: {
  //   marginBottom: 15,
  //   textAlign: 'center',
  // },
  // item: {
  //   flex:1,
  //   flexDirection:'row',
  //   justifyContent:'space-between',
  //   alignItems:'stretch',
  //   backgroundColor: '#696969',
  //    padding: 15,
  //    marginVertical: 2,
  //   //margin:20,
  //   width:375,
  //   height:75

  //   //marginHorizontal: 2,
    
  // },
  // itemTitle: {
  //   fontSize: 22,
  //   //textAlign:'right',
  //   color:'#FFF'
  // },
  // itemCircle: {
  //   fontSize: 22,
  //   //textAlign:'left',
  //   color:'#FFF'
  // },
  
  input: { 
    flex:1,
		height: 70, 
		borderBottomColor:'#ccc',
    backgroundColor:'#ccc' ,
		//borderWidth: 1, 
    borderBottomWidth:1,
		//marginBottom: 12, 
		paddingHorizontal: 10, 
		borderRadius: 8, 
		fontSize: 18, 
    textAlign:'center',
    justifyContent:'center',
    
	}, 
  // chooseReasonText:{
  //   fontSize: 18,
  //   textAlign:'center',  
  // },
  // label: {
  //   fontSize: 16,
  //   marginBottom: 8,
  // },
  // input: {
  //   height: 40,
  //   borderColor: '#ccc',
  //   borderWidth: 1,
  //   paddingHorizontal: 8,
  //   borderRadius: 4,
  // },
  signatureContainer: {
    borderBottomColor:'#ccc',
    borderBottomWidth:1,
    //borderColor: '#ccc',
    // backgroundColor:'red',
    // borderWidth: 1,
    height: 180,
    
  },
  // signatureWebStyle: `
  //   .m-signature-pad {
  //     box-shadow: none; 
  //     border: none; 
  //   }
  //   .m-signature-pad--body {
  //     border: none;
  //     background-color: #ccc;
  //   }
  //   .m-signature-pad--footer {
  //     display: none;
  //     margin: 0px;
  //   }
  //   body,html {
  //     width: 100%; height: 100%;
  //   }
  // `,
 signatureWebStyle : {
    style: `
      .m-signature-pad {
        box-shadow: none; 
        border: none; 
      }
      .m-signature-pad--body {
        border: none;
        background-color: #ccc;
      }
      .m-signature-pad--footer {
        display: none;
        margin: 0px;
      }
      body,html {
        width: 100%; height: 100%;
      }
    `
  },
  
  approve: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop:10
  },
  approveButtonText: {
    color: 'white',
    fontSize: 20,
    //fontWeight: 'bold',
  },
  cancelButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 180,
    padding: 15,
    backgroundColor: '#36454F',
    borderRadius: 15,
  },
  nextButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 180,
    padding: 15,
    backgroundColor: 'green',
    borderRadius: 15,

  },
  error: { 
		color: 'red', 
		fontSize: 16, 
		marginBottom: 10, 
        //backgroundColor:'red'
	}, 
});

