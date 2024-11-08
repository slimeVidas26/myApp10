import React , {useContext , useState , useEffect} from 'react';
import { Text,FlatList , SafeAreaView,ScrollView ,  View,useWindowDimensions,KeyboardAvoidingView, StyleSheet, TextInput, Button, Alert , Modal , Pressable } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Constants from 'expo-constants';
import { OrderDetail } from '../../../../../../components/arrival/OrderDetail';
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'; 
import { EvilIcons } from '@expo/vector-icons'; 
import  EDIContext  from '../store/EDIContext';


const ReasonOfRefundData = [
            {id: '1',value:'dameged item'},
            {id: '2',value:'Incompatible quantity'},
            {id: '3',value:'Item has expired'},
            {id: '4',value:'Item does not exist in the range'},
            {id: '5',value:'Item not delivered'},
            {id: '6',value:'Voluntary cancellation'},
            {id: '7',value:'General rejection'},
            {id: '8',value:'Kosher problem'},
            {id: '9',value:'Excess supply'},
            {id: '10',value:'Receipt outside the delivery time'},
            {id: '11',value:'without veterinary approval'},
            {id: '12',value:'actually received'}
 
];
export const FormEDIScreen = ({route}) => {

  //const item = route.params.item
  const context = useContext(EDIContext)
  //console.log('context from form' , context)
  //const {isOpen} = context
  const {data , ref , setData  , remindRows  } = context
  

  const {code ,rows ,   product_name ,quantity ,supplied , isOpen ,  boxes  ,isFull , ReasonOfRefund}   = route.params.item
  //const {rows} = route.params;
  //const [rows , setRows] = useState(route.params.rows)

console.log('ref' , ref)


 const setFullOrder = ()=>{
  
  const newState = data.filter((item )=>item.reference=== ref)
   .map((item) => item.order_details.map(order=> {
    
    // 👇️ if id equals 2, update country property
    if (order.code === code && order.isOpen==='true' && order.isFull==='null') {
      //console.log('orderQuantity' , order.quantity)
      
      setValue('Supplied', order.quantity.toString());
      order.isOpen = 'false',
      order.supplied = quantity,
      order.isFull = 'true'
      //console.log('data' , data)
      return {...order, isOpen , supplied , isFull}
    }
    // 👇️ otherwise return the object as is
    return order;
   }));
   setData(newState);
   //console.log('newState' , newState.flat())

   setTimeout(() => {
    navigation.navigate('OrderDetailScreenOpen' , {remindRows , newState });

   },1000);
 

}



const setPartialOrder = ()=>{
  const suppliedValue = getValues("Supplied")
if(suppliedValue == quantity){
  console.log('suppliedValue == quantity' , suppliedValue , quantity  )
  setFullOrder()

}else{
  setModalVisible(true)
  console.log('suppliedValue !== quantity' , suppliedValue , quantity  )
}
}





  const navigation = useNavigation()

  const [listItems, setListItems] = useState(ReasonOfRefundData);
  //const windowHeight = useWindowDimensions().height;

  // const ItemView = ({ modalItem }) => {
  //   return (
  //     // Single Comes here which will be repeatative for the FlatListItems
  //     <View>
  //       <Text style={styles.item} onPress={handleSubmit(onSubmit(modalItem))}>
  //         {modalItem.value}
  //       </Text>
  //     </View>
  //   );
  // };

  const ItemView = ({ item }) => {
    return (
      // Single Comes here which will be repeatative for the FlatListItems
      <View>
        <Text style={styles.item} onPress={() => getModalItem(item)}>
          {item.value}
        </Text>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      //Item Separator
      <View
        style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }}
      />
    );
  };

  const getModalItem = (modalItem) => {
    //Function for click on an item
    //alert('Id : ' + modalItem.id + ' Value : ' + modalItem.value);
    //return modalItem.value
    const reason = modalItem.value;

    const newState = data.filter((item )=>item.reference=== ref)
    .map((item) => item.order_details.map(order=> {
     // 👇️ if id equals 2, update country property
     if (order.code === code ) {
       const suppliedValue = getValues("Supplied")
       //alert(suppliedValue)

       order.isOpen = 'false',
       order.supplied = suppliedValue,
       order.ReasonOfRefund = reason,
       order.isFull = 'false'
       return {...order, isOpen , supplied , ReasonOfRefund , isFull}
     }
 
     // 👇️ otherwise return the object as is

     return order;
    }));
 
 
    setData(newState);
    console.log('newState setPartialOrder' , newState)
    
   navigation.navigate('OrderDetailScreenOpen');
  };

  const [modalVisible, setModalVisible] = useState(false);


  


  
  const { register, setValue ,   handleSubmit , getValues , control, reset, formState: { errors } } = useForm({
    defaultValues: {
       Barcode:code,
       ProductName:product_name,
       Quantity:quantity,
       
    }

   
  });


  const openModal = () => {
    setPartialOrder()
 
  };
  
  // const onSubmit = () => {
  //   //getModalItem(e.target.value);
  //   const newState = data.filter((item )=>item.reference=== ref)
  //  .map((item) => item.order_details.map(order=> {
  //   // 👇️ if id equals 2, update country property
  //   if (order.code === code && order.isOpen==='true') {
  //     const suppliedValue = getValues("Supplied")
  //     const reason = "totobbbb"

  //     order.isOpen = 'false',
  //     order.supplied = suppliedValue,
  //     order.ReasonOfRefund = reason
  //     return {...order, isOpen , supplied , ReasonOfRefund}
  //   }

  //   // 👇️ otherwise return the object as is
  //   return order;
  //  }));


  //  setData(newState);
  // navigation.navigate('OrderDetailScreenOpen');
  // };

  

  const onChange = arg => {
    return {
      value: arg.nativeEvent.text,
    };
  };

  


  console.log('errors', errors); 
  
  return (
  <ScrollView style={styles.scrollView}   contentContainerStyle={styles.contentContainer} >
     <View style={styles.formElement}>
    <Text style={styles.label}>Barcode</Text>
    <Text style={styles.unLink}> {code}</Text>
    </View>
    
    <View style={styles.formElement}>
    <Text style={styles.label}>ProductName</Text> 
    <Text style={styles.unLink} >{product_name}</Text>
    </View>

    <View style={styles.formElement}>
    <Text style={styles.label}>Quantity</Text>
    {/* onPress : isOpen = false , supplied = quantity */}
    <Text style={styles.link} onPress={()=> {setFullOrder()}}> {quantity}</Text>
    </View>


    <View style={styles.formElement}>
    <Text style={styles.label}>Supplied</Text>
      <Controller
        control={control}

       

        defaultValue={isOpen === 'false' && supplied.toString()}
        render={({field: { onChange, onBlur, value }}) => (

          <TextInput
            keyboardType="numeric"
            style={styles.input}
            onBlur={openModal}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="Supplied"
        rules={{ required: true }}
      />
      </View>

      <View style={styles.formElement}>
    <Text style={styles.label}>Reason of Refund</Text>
      <Pressable
        onPress={() => setModalVisible(true)}>
        <Text style={styles.unLink}>Choose Reason Of Refund</Text>
      </Pressable>
    
    <View style={styles.centeredView}>
      <Modal 
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
      
        <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.modalView}>
        <View style = {styles.modalHeader}>
        <EvilIcons onPress={() => setModalVisible(!modalVisible)} style = {styles.icon} name="close-o" size={32} color="white" />
       
            
          
          <Text style = {styles.headerText}>Reason of Refund</Text>
          </View>
        <FlatList
          data={listItems}
          //data defined in constructor
          ItemSeparatorComponent={ItemSeparatorView}
          //Item Separator View
          renderItem={ItemView}
          keyExtractor={(item, index) => index.toString()}
        />
            
      </View>
     
    </SafeAreaView>
      </Modal>
      
    </View>
    </View> 
    </ScrollView>

  );
};

const styles = StyleSheet.create({

  scrollView: {
    height: '20%',
    width: '100%',
    margin: 20,
    alignSelf: 'center',
    padding: 20,
    borderWidth: 5,
    borderRadius: 5,
    borderColor: 'black',
    backgroundColor: 'lightblue'
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
   // backgroundColor: 'lightgrey',
    paddingBottom: 50
  },
  container: {
    justifyContent: 'flex-start',
    padding: 4,
    backgroundColor: "white",
    
  },
  formElement:{
    paddingBottom:6,
    paddingLeft: 30,
     flexDirection:'column',
     borderBottomColor: 'grey',
    borderBottomWidth: 1,
    height: 90,
    width:'90%'
    
  },
  label: {
    color: 'green',
    margin: 8,
    marginLeft: 0,
    fontSize:18 
  },
  link: {
    color: 'black',
    margin: 8,
    marginLeft: 0,
    fontSize:18 ,
    textDecorationLine: 'underline', 
  },
  unLink: {
    color: 'black',
    margin: 8,
    marginLeft: 0,
    fontSize:18 ,
  },
  button: {
    marginTop: 20,
    color: 'white',
    height: 10,
    backgroundColor: '#ec5990',
    borderRadius: 4,
  },
  
  input: {
    height: 40,
    width:80,
    padding: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    fontSize:18,
    marginBottom: 6

    
  },
  //modal

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 24,
    backgroundColor: 'lightgrey',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color:'white'
  },
  modalHeader:{
    backgroundColor:'orange',
    paddingRight:100,
    paddingLeft:100,
    paddingTop:20,
    paddingBottom:20,
    alignItems:'center',
    borderRadius: 20,
   
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  icon: {
    position: 'absolute',
    left: 18,
    top:20,
  },
});