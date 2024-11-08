//import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Pressable,Keyboard, Image,Alert ,  TextInput, TouchableOpacity } from 'react-native';
import React, { useState , useEffect } from "react";
import { translation } from '../../i18n/supportedLanguages';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import Modal from '../../components/modals/Modal';
import { Feather } from '@expo/vector-icons';
import { OpenModalButtonApproval } from '../../components/modals/OpenModalButonApproval';
import { useRoute } from '@react-navigation/native';
import { gql, useMutation } from '@apollo/client';


// Define the mutation
 const UPDATE_ORDER_PRODUCT_STATUS_MUTATION = gql`
   mutation UpdateOrderProductStatus($orderId:ID!, $finalQuantity:Int! ,  $productId: ID!, $isOpen: Boolean!) {
     updateOrderProductStatus(orderId: $orderId ,
                              finalQuantity: $finalQuantity ,
                              productId: $productId,
                               isOpen: $isOpen) {
       id
       orderProducts {
         product {
           id
           name
           code
           quantityPerBox
            inStock
         }
         isOpen
         finalQuantity
         initialQuantity
        
       }
     }
   }
 `;



// Set the key-value pairs for the different languages you want to support.
const i18n = new I18n(translation);

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;

// When a value is missing from a language it'll fallback to another language with the key present.
i18n.enableFallback = true;
// To see the fallback mechanism uncomment line below to force app to use Japanese language.
i18n.locale = 'he';






export const EdiItemApprovalScreenClosed = ({ navigation }) => {

  //console.log("data from ediItemApprovalScreen" , data)
const route = useRoute();
// console.log("route.params form ediItemApprovalScreen",route.params)
const { paramData ,initialQuantity , finalQuantity ,  supplier , orderId  } = route.params || {};
//  console.log("paramData from ediItemApprovalScreen ", paramData)
//  console.log("orderId from ediItemApprovalScreen ", orderId)

const productId = paramData.id
//const quantity = paramData.quantity
//  console.log("productId from ediItemApprovalScreen ", productId)
//  console.log("initialQuantity from ediItemApprovalScreen ", initialQuantity)


  //Use the useMutation hook
  const [updateOrderProductStatus, { data, loading, error }] = useMutation(UPDATE_ORDER_PRODUCT_STATUS_MUTATION);

  const handleUpdateStatus = async () => {
    try {
      const response = await updateOrderProductStatus({ variables: { orderId , finalQuantity:counter , productId, isOpen:false } });
      console.log('Order product status updated:', response.data.updateOrderProductStatus);

    } catch (err) {
      console.error('Error updating orderProduct status:', error);
    }
  };

  

  const [isModalOpen, setModalOpen] = useState(true);
  const initialCount = initialQuantity;
  const [counter, setCounter] = useState(finalQuantity);
  // const [isOpen, setIsOpen] = useState(true);


  const InfoProduct = ({initialCount , counter})=>{
    return(
      <View style={styles.infoProductZone}>
            <View style={styles.detailsContainer}>
              <Text style={styles.compagny}>{supplier}</Text>
              <Text style={[styles.productName, { color: counter === initialCount ? 'blue' : styles.productName.color }]}>
                {paramData.name}</Text>
              <Text style={styles.productCode}>
                {paramData.code} </Text>
              <Text style={styles.productQuantityInStock}>
                Quantity in stock:{paramData.inStock}</Text>
              <View style={styles.box}>
                <View style={styles.oneBox}>
                  <Text style={styles.boxes}>0</Text>
                  <Feather name="box" size={26} color="black" />
                </View>

                <View style={styles.oneBox}>
                  <Text style={styles.boxes}>{paramData.quantityPerBox}</Text>
                  <Feather name="box" size={26} color="black" />
                </View>
                <View style={styles.oneBox}>
                  <Text style={styles.boxes}>0</Text>
                  <Feather name="box" size={26} color="black" />
                </View>
              </View>
            </View>
            <View style={styles.imageContainer}>
              <Image
                style={styles.productImage}
                //source={{ uri: 'https://via.placeholder.com/150' }} // Replace with your product image URL
                source={require('../../assets/gamadim.png')} // Replace with your product image URL
              />

            </View>

          </View>
    )
  }


  const Counter = ({initialCount , counter })=>{
    console.log("initialCount" ,initialCount )
    console.log("counter", counter)
    //console.log("finalQuantity", finalQuantity)


  
    const minLimit = 0;

    const maxLimit = initialCount;
    const [selected, setSelected] = useState(null)
    const [matching, setMatching] = useState(false)


    const changeColor = (btn) => {
      setSelected(btn);
    };


  const decrementCounter = () => {
    if (counter > minLimit) {
      setCounter(counter - 1);
      changeColor('minus');
    }
  };

  const incrementCounter = () => {
    if (counter < maxLimit) {
      setCounter(counter + 1);
      changeColor('plus');
      console.log("counter" , counter)
    }
  };

  const handleQuantity = () => {
    console.log('counter before' , counter)
    setCounter(initialCount);
    setMatching(true)
  };

  useEffect(() => {
    handleQuantity
    console.log('counter after update', counter);  // This will log the updated counter value
  }, [counter]);  // This useEffect will trigger every time `counter` changes

  const handleChange = (number) => {
    
    const newValue = parseInt(number, 10);
    if (!isNaN(newValue) && newValue >= minLimit && newValue <= maxLimit) {
      setCounter(newValue);
      console.log("counter" , counter)

      
    }
      else {
       Alert.alert('Invalid input', `Enter a number between ${minLimit} and ${maxLimit}`);
     }
  };
  
    return(
      <>
       <TouchableOpacity style={styles.quantityBefore} onPress={handleQuantity}  >
            <Text style={styles.before}>
              Initial Quantity:{initialQuantity}
            </Text>
          </TouchableOpacity>
     
      <View style={styles.counterZone}>
      <Pressable style={[styles.unitsButton, { backgroundColor: initialCount === counter ? 'blue' : styles.unitsButton.backgroundColor }]}
        onPress={Keyboard.dismiss}>
        <Text style={[styles.unitButtonText]}>Units</Text>
      </Pressable>
  
      <View style={styles.counter}>
  
        <Pressable
          onPress={decrementCounter} style={[styles.counterButton, selected === "minus" ? styles.selected : styles.notSelected, { borderColor: counter === 0 || counter === initialCount ? '#d4d4d4' : styles.selected.borderColor }]}
        >
          <Feather name="minus" size={60} color={initialCount === counter ? 'blue' : counter === 0 ? '#f2f2f2' : 'red'} />
        </Pressable>
  
  
        <TextInput style={[styles.TextCounter, { color: initialCount === counter ? 'blue' : styles.TextCounter.color }]}
          value={ String(counter)}
          keyboardType="numeric"
          onChangeText={handleChange} />
  
        <Pressable
          onPress={incrementCounter} style={[styles.counterButton, selected === "plus" ? styles.selected : styles.notSelected, { borderColor: initialCount === counter ? '#f2f2f2' : styles.selected.borderColor }]}>
          <Feather name="plus" size={60} color={initialCount === counter ? '#f2f2f2' : 'red'} /></Pressable>
      </View>
  
      {initialCount !== counter &&
         <>
        {/* <View style={styles.noMatching}> */}
          {/* <Text style={styles.noMatchingText}>
            No Matching Quantity</Text> */}
            <OpenModalButtonApproval data = {data}/>

        {/* </View> */}

        </>

        
      }
  
          </View>
          </>
    )
  }

  const ApproveButtons = ()=>{

    const [isOpen, setIsOpen] = useState(true);

    // Effect to handle navigation after state change
    useEffect(() => {
      console.log("isOpen changed:", isOpen); // Logs whenever isOpen changes
        if (!isOpen) {
            console.log("isOpen is now ",isOpen);
            handleUpdateStatus()
            navigation.navigate("EdiOrderDetailsScreenOpen", {
              paramData,
              initialQuantity,
              finalQuantity: counter,  // Pass the final quantity
              supplier,
              orderId,
              productId,
            });
        }
    }, [isOpen]); // Dependency array to run the effect when isOpen changes

    const handleIsOpen = () => {
        // Set isOpen to false
        setIsOpen(!isOpen);  // State will be updated to false
        console.log('isOpen from handleIsOpen' , isOpen)
        console.log("toto")
        
        // The console log may still show the old state due to React's async state update
        console.log("Setting isOpen to false", isOpen); 
    };

    // const handleIsOpen = () => {
    //   // Set isOpen to true only if it is currently false
    //   if (isOpen===true) {
    //     setIsOpen(false);
    //   }
    //   console.log("isOpen", isOpen);
    // };
    return(
      <View style={styles.approve} >
      {/* <Pressable onPress={() =>{handleUpdateStatus; navigation.navigate('EdiOrderDetailsScreenOpen')}} style={styles.nextButton} disabled={loading}> */}
      <Pressable onPress={handleIsOpen} style={styles.nextButton} disabled={loading} >
        <Text style={styles.approveButtonText}>Next</Text>
      </Pressable>
      <Pressable style={styles.cancelButton}
        onPress={() => { setModalOpen(false); navigation.goBack() }}>
        <Text style={styles.approveButtonText}>Cancel</Text>
      </Pressable>
   
    </View>
    )
  }

  

  return (

    <View style={styles.modalContainer}>
      {isModalOpen == true ?
        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalOpen}
        >

          {/* INFO PRODUCT ZONE */}
                 <InfoProduct initialCount={initialCount} counter={counter}/>

          {/* COUNTER ZONE */}
                <Counter initialCount={initialCount} counter={counter}/>
               
          {/* APPROVE BUTTONS */}
              <ApproveButtons/>
        </Modal>        :
        <View><Text>{null}</Text></View>

      }
    </View>

  );
}



const styles = StyleSheet.create({

  infoProductZone: {
    //height:400,
    display: 'flex',
    flexDirection: 'row',
    //backgroundColor: '#d4d4d4',
    alignItems: 'center',
    // justifyContent: 'center',
    //paddingVertical:10
  },
  modalContainer: {
    //height:400,
    display: 'flex',
    flexDirection: 'row',
     backgroundColor: '#d4d4d4',
    alignItems: 'center',
    justifyContent: 'center',
    //paddingTop:10
  },
  detailsContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'green',
    marginVertical: 20
  },
  compagny: {
    fontSize: 20,
    //fontWeight: 'bold',
    marginBottom: 8,
     //backgroundColor:'red',
     width:'100%'
  },
  productName: {
    //backgroundColor:'yellow',
    fontSize: 20,
    width: '100%',
    //fontWeight: 'bold',
    marginBottom: 8,
    color: 'red'
  },
  productCode: {
    //backgroundColor:'red',
    width: '100%',
    fontSize: 18,
    //fontWeight: 'bold',
    marginBottom: 8,
    //color:'blue'
  },
  productQuantityInStock: {
    width: '100%',
    //backgroundColor:'red',
    fontSize: 18,
    //fontWeight: 'bold',
    marginBottom: 8,
    //color:'blue'
  },
  

  productImage: {
    flex: 1,
    width: 150,
    height: 150,
    resizeMode: 'cover',
    //marginLeft: 16,
  },

  img: {
    backgroundColor: 'white',
    width: 100, height: 168,
    alignSelf: 'flex-end'
  },
  boxes: {
    //backgroundColor:'yellow',
    fontSize: 18,
    marginRight: 4

  },
  box: {
    //flex:1,
    width: '100%',
    //backgroundColor:'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },

  oneBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline'
  },
  imageContainer: {
    flex: 2,
    flexDirection: 'column',
    //backgroundColor:'yellow',
    //marginBottom:20,
  },

  quantityBefore: {
    //backgroundColor:'green',
    marginTop: 10
  },

  before: {
    //backgroundColor:'red',
    alignSelf: 'flex-end',
    //paddingRight:20,
    fontSize: 20
  },
  TextCounter: {
    //height: 60,
    flex: 1,
    padding: 5,
    marginTop: 30,
    margin: 12,
    fontSize: 55,
    borderRadius: 25,
    color: 'red',
    //backgroundColor:'yellow',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },

  text: {
    fontSize: 30,
    paddingBottom: 30,
    color: "blue"
  },
  counterZone: {
    marginVertical:30,
    flexDirection: 'column',
    justifyContent: 'space-around',
    //width:400,
    //marginBottom:50
  },
  counter: {
    //backgroundColor:'pink',
    flexDirection: 'row',
    //justifyContent:'space-around',
    alignItems: 'center',
    marginBottom: 20
  },
  approve: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  nextButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 180,
    padding: 15,
    backgroundColor: 'green',
    borderRadius: 15,

  },
  cancelButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 180,
    padding: 15,
    backgroundColor: '#36454F',
    borderRadius: 15,
  },
  counterButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    marginTop: 20,
    padding: 15,
    backgroundColor: '#d4d4d4',
    borderWidth: 2,
    borderRadius: 15
  },

  selected: {
    color: '#fff',
    //backgroundColor: '#00867d',
    //border: '1px solid #00867d'
    borderWidth: 1,
    borderColor: 'red'
  },
  notSelected: {
    color: '#00867d',
    backgroundColor: '#d4d4d4',
    borderColor: 'red'

    //border: '1px solid #f2f2f2'
  },


  unitsButton: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //width:'90%',
    marginTop: -10,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 15,
  },
  approveButtonText: {
    color: 'white',
    fontSize: 20,
    //fontWeight: 'bold',
  },
  unitButtonText: {
    color: 'white',
    fontSize: 25,
    //fontWeight: 'bold',
  },

  noMatching: {
    display: 'flex',
    backgroundColor: '#d4d4d4',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: 'center'
  },
  noMatchingText: {
    fontSize: 20,
    color: 'black'
  }

});
