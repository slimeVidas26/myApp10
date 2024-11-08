import React , {useContext , useState , useEffect , useRef} from 'react';
import { useForm , Controller } from 'react-hook-form';
import { Text,FlatList ,Fieldset , SafeAreaView,ScrollView , Input, View,useWindowDimensions,KeyboardAvoidingView, StyleSheet, TextInput, Button, Alert , Modal , Pressable } from 'react-native';
import { AutoGrowTextInput } from 'react-native-auto-grow-textinput';
//import { OrderInfoContext } from './OrderInfoContext';
import EDIContext from '../store/EDIContext';
//import CheckBox from '@react-native-community/checkbox';
import CheckBox from 'expo-checkbox';
import {Sign} from './Signature';
import { useNavigation } from '@react-navigation/native'
import { TextField } from '@mui/material';

 



export const  SignFormScreen = ({route}) =>{

  const inputRef = useRef(null);

  

  // const CheckBox = React.forwardRef(
  //   ({ label, name, value, onChange, defaultChecked, ...rest }, forwardedRef) => {
  //     const [checked, setChecked] = React.useState(defaultChecked);
  
  //     React.useEffect(() => {
  //       if (onChange) {
  //         onChange(checked);
  //       }
  //     }, [checked]);
  
  //     // return (
  //     //   <div onClick={() => setChecked(!checked)} style={{ cursor: "pointer" }}>
  //     //     <input
  //     //       style={{ display: "none" }}
  //     //       ref={forwardedRef}
  //     //       type="checkbox"
  //     //       name={name}
  //     //       value={value}
  //     //       checked={checked}
  //     //       onChange={e => {
  //     //         setChecked(e.target.checked);
  //     //       }}
  //     //     />
  //     //     [{checked ? "X" : " "}]{label}
  //     //   </div>
  //     // );
  //   }
  // );

  const [toggleCheckBox, setToggleCheckBox] = useState(false) 
  const [title] = useState(route.params.title)  
 
  const context = useContext(EDIContext)
  const {data ,setData ,  ref ,openData ,  searchIcon , initialRows , closedData} = context
//const {arr} = route.params;
//console.log('route.params.arr' , arr)

const [openItem ] = useState(openData().filter((item )=>item.reference === ref))

// useEffect(() => {
 
//   const arr1 =  openData().filter((item )=>item.reference === ref);
//   console.log('arr1 before submit' , arr1)
//   return arr1;
  
// } , []);
 


// [{"date": "09/12/22", "id": "2", "isOpen": true, 
// "order_details": [[Object], [Object], [Object]],
//  "quantity": "654", "reference": "23456", 
//  "rows": "25", "supplied": 0, "supplier": "Gouri"}]
  const [isSelected, setSelection] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const navigation = useNavigation()

  

  // const openDataResult = openData()
//console.log('openDataResult' , openDataResult)

// const arr =  openDataResult.filter((item )=>item.reference === ref);

//console.log('openData()' , openData())
// console.log('arr-zero' , arr[0])


  const { register,control ,watch ,  setValue ,getValues, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      //  Provider:arr[0].supplier,
      //  reference:arr[0].reference,
      //  rows:arr[0].rows,
      //  quantity:arr[0].quantity,
      
   }
  });
  
//   const onSubmit = data => {
//     console.log(data);
//   console.log(errors);
//   navigation.navigate('EntryCertificateEDI' , {searchIcon : route.params.searchIcon})
// }

// const onSubmit = ()=>{

//   const values  =getValues()
//   console.log('values' , values)
  
//      const newState = data.filter((item )=>item.reference=== '12345');
//      const item = newState[0]
//      console.log('item on submit' , item)
//      if(item.isOpen === 'true'){
//       console.log('item condition isOpen === true' , item)
//       item.isOpen = 'false'
//       item.supplied = getValues('Supplied')
//       item.WorkerCode = getValues('WorkerCode')
      

//       console.log('newState' , newState)

 
//       return {...item , supplied , WorkerCode , isOpen}
 
    
//        //return newState;
//       //}));
//      }
//      setData(newState);
//      navigation.navigate('EntryCertificateEDI' , {searchIcon : route.params.searchIcon})

//      //navigation.navigate('EntryCertificateEDIClosed' , {searchIcon : route.params.searchIcon})
//      //console.log('newState' , newState.flat())
//     //navigation.navigate('OrderDetailScreenOpen' , {remindRows , newState });
//   }



//const newState =  data.filter((item )=>item.reference === ref);


  const onSubmit = async()=>{
    //e.preventDefault();
    //console.log('getValues' , getValues())

    const elem =   openItem[0]
      console.log('elem isOpen on submit' , elem)
    
//console.log('arr inside submit' , arr)
    // const values  =getValues()
    // console.log('values' , values)
    try {
      
      if(elem.isOpen === true  && isSelected){
  //     console.log('elem condition isOpen === true' , elem)
  elem.isOpen = false
  elem.WorkerCode = getValues('WorkerCode')
  elem.Remarks = getValues('Remarks')
  elem.supplied = getTotalSupplied()
  elem.GivingRedStamp = getValues('GivingRedStamp')
  elem.RedStampReason = displayRedStampReason()


  //     console.log('newState' , newState)
console.log('elem' , elem)
  const result = await  {...elem , isOpen:false,
     supplied:elem.supplied ,
      WorkerCode: getValues('WorkerCode') ,
      Remarks:getValues('Remarks') ,
      GivingRedStamp:getValues('GivingRedStamp') ,
      RedStampReason:getValues('RedStampReason') 
     }
     //}));
       //console.log('newState[0]',newState[0])
       setData(result);
       console.log('data' , data)

       navigation.navigate('EntryCertificateEDI' , {searchIcon : route.params.searchIcon})
     return result
      }
      else{
       //     console.log('elem condition isOpen === true' , elem)
  elem.isOpen = false
  elem.WorkerCode = getValues('WorkerCode')
  elem.Remarks = getValues('Remarks')
  elem.supplied = getTotalSupplied()
  // elem.GivingRedStamp = getValues('GivingRedStamp')
  // elem.redStampReason = getValues('redStampReason')


  //     console.log('newState' , newState)
console.log('elem' , elem)
  const result = await  {...elem , isOpen:false, supplied:elem.supplied , WorkerCode: getValues('WorkerCode') ,Remarks:getValues('Remarks')  }
     //}));
       //console.log('newState[0]',newState[0])
       setData(result);
       console.log('data' , data)

       navigation.navigate('EntryCertificateEDI' , {searchIcon : route.params.searchIcon})
     return result 
      }

     
    } catch (error) {
      console.log(error)
    }
        
        //console.log('newState[0].supplied' , getValues('Supplied'))
     

       
  
       //navigation.navigate('EntryCertificateEDIClosed' , {searchIcon : route.params.searchIcon})
       //console.log('newState' , newState.flat())
      //navigation.navigate('OrderDetailScreenOpen' , {remindRows , newState });
    }


  const workerValidation = ()=>{
    {
      const singleValue = getValues("WorkerCode");
      if(singleValue === '559944'){
        setValue("WorkerCode", "Isaac")
      }
      else{
        showAlert()
      }
     
      }
    
  }

  //get total supplied
  

  const getTotalSupplied = ()=>{
  const initialValue = 0;
    const result = openItem.map((item) => item.order_details.map(order=> order.quantity)).flat();
     console.log('result' , result)
    const sumWithInitial = result.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          initialValue
        );
        console.log('sumWithInitial',sumWithInitial)
        return sumWithInitial;
   }

   console.log('getTotalSupplied' , getTotalSupplied())
  // const getTotalSupplied = ()=>{
  //   const array = signFormData[0].order_details.map((order)=>order.quantity)
  
  //   // 0 + 1 + 2 + 3 + 4
  //   const initialValue = 0;
  //   const sumWithInitial = array1.reduce(
  //     (accumulator, currentValue) => accumulator + currentValue,
  //     initialValue
  //   );
    
  //   return sumWithInitial;
  //   // Expected output: 10
  
  // }


  //show error workerValidation
  const showAlert = () =>
  Alert.alert(
    'Invalid code', 
  );

  const displayRedStampReason =  ()=>{
   
    let result =   route.params.titre ;
    //console.log('result from displayRedStampReason ' , result)
     //setValue('RedStampReason', result);
     //const result1 = getValues('RedStampReason')
     //console.log('result1' , result1)
    return result;
}

  
    //  const signFormData = openData().filter((item )=>item.reference=== ref)
    //  console.log('signFormData',signFormData)
  
//console.log('ClosedData',closedData)

  
  return (
    <>
      <ScrollView style={styles.scrollView}   contentContainerStyle={styles.contentContainer} >
    <View style={styles.formElement}>
    <Text style={styles.label}>Warehouse</Text>
    <Text style={styles.unLink}>Raanana</Text>
    </View>

      {/* <input type="text" placeholder="Warehouse" {...register("Warehouse", {required: true, max: 0, maxLength: 80})} /> */}
      <View style={styles.formElement}>
    <Text style={styles.label}>Supplier</Text>
    <Text style={styles.unLink}
    {...register("Supplier", {required: false})} 
    >{openItem[0].supplier}</Text>
    </View>
      {/* <input type="text" placeholder="Provider" {...register("Provider", {required: true, maxLength: 100})} /> */}
      <View style={styles.formElement}>
    <Text style={styles.label}>Reference</Text>
    <Text style={styles.unLink}
    {...register("reference", {required: false})} 
    >{openItem[0].reference}</Text>
    </View> 
      {/* <input type="text" placeholder="Reference" {...register("Reference", {required: true, pattern: /^\S+@\S+$/i})} /> */}
      <View style={styles.formElement}>
    <Text style={styles.label}>Worker Code</Text>
      <Controller
        control={control}
        render={({field: { onChange, onBlur, value }}) => (
          <TextInput
          {...register("WorkerCode")}
           //disabled={disabled}
            keyboardType="numeric"
            style={styles.input}
            onBlur={workerValidation}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="WorkerCode"
        rules={{ required: true }}
      />
      {errors.WorkerCode && alert('WorkerCode is required')}
      </View>
      {/* <input type="text" placeholder="Worker Code" {...register("Worker Code", {required: true, maxLength: 12})} /> */}
      <View style={[styles.formElement]}>
    <Text style={styles.label}>Remarks</Text>
      <Controller
        control={control}
        render={({field: { onChange, onBlur, value }}) => (

         <AutoGrowTextInput style={styles.remarks} placeholder='Some text here'
            maxHeight={ 120 }
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="Remarks"
        rules={{ required: false }}
      />
      </View>
      {/* <input type="text" placeholder="Remarks" {...register("Remarks", {})} /> */}
      <View style={styles.formElement}>
    <Text style={styles.label}>Rows</Text>
    <Text style={styles.unLink}
    {...register("rows", {required: false})} 
>{openItem[0].rows}</Text>
    </View>

    <View style={styles.formElement}>
    <Text style={styles.label}>Quantity</Text>
    <Text style={styles.unLink}
    {...register("quantity", {required: false})} 
>{openItem[0].quantity}</Text>
    </View>

    <View style={styles.formElement}>
      <Text style={styles.label}>Supplied</Text>
    
      <Controller
        control={control}
        //disabled={disabled}
        //defaultValue={userData ? userData.name : ''}
        defaultValue={getTotalSupplied}
        render={({field: { onChange, onBlur, value }}) => (
          <Text
          {...register("Supplied")}
          keyboardType="numeric"
           
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}

           onPress = {()=>navigation.navigate('ChooseRedStampReasonScreen') } style={styles.unLink}
           >
      {getTotalSupplied()}
      </Text> 
        )}
        name="Supplied"
        rules={{ required: true }}
      />
      </View>

    {/* <View style={styles.formElement}>
    <Text style={styles.label}>Supplied</Text>
    <Text style={styles.unLink}>{getTotalSupplied()}</Text>
    </View> */}

   

    <View style={styles.box}>
    <Text style={styles.label}>Red Stamp</Text>
    <CheckBox
          innerRef={inputRef}
          {...register("redStamp")}
          name="redStamp"
          value={isSelected}
          label=" Example 2 (custom checkbox)"
          style = {{marginTop:12}}
          onValueChange={setSelection}
        />
    {/* <Text>Is CheckBox selected: {isSelected ? '👍' : '👎'}</Text> */}
    </View>
    {isSelected &&
    <>
      <View style={[styles.formElement]}>
    <Text style={styles.label}>Giving Red Stamp</Text>
      <Controller
        control={control}
        render={({field: { onChange, onBlur, value }}) => (

         <AutoGrowTextInput style={styles.remarks} placeholder='Some text here'
         {...register("GivingRedStamp")}
            maxHeight={ 120 }
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="GivingRedStamp"
        rules={{ required: false }}
      />
      </View>
     

      <View style={styles.formElement}>
      <Text style={styles.label}>Red Stamp Reason</Text>
    
      <Controller
        control={control}
        disabled={disabled}
        //defaultValue={userData ? userData.name : ''}
        defaultValue='Choose Red Stamp Reason'
        render={({field: { onChange, onBlur, value }}) => (
          <Text
          //editable = {false}
          {...register("RedStampReason")}
          keyboardType="numeric"
           placeholder = 'Click to Choose Red Stamp Reason'
            onBlur={onBlur}
            //onChangeText={value => onChange(value)}
            value={value}

           onPress = {()=>navigation.navigate('ChooseRedStampReasonScreen') } style={styles.unLink}>
           
      {displayRedStampReason()}
      </Text> 
        )}
        name="RedStampReason"
        rules={{ required: true }}
      />
      </View>

     
    </>
    }
   

    
      </ScrollView>

    <View style={styles.formElement}>
    <Text style={styles.label}>Signature</Text>
    </View>



      <Controller
        control={control}
        disabled={disabled}
        //defaultValue={userData ? userData.name : ''}
        defaultValue='signa'
        render={({field: { onChange, onBlur, value }}) => (
          <Sign/>
        )}
        name="signature"
      />
     


        



      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </>
  );
}

const styles = StyleSheet.create({

  box :{
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection:'row',
    //backgroundColor:'red',
    width: '90%',
    height:50,
    paddingBottom:6,
    paddingLeft: 30,
     borderBottomColor: 'grey',
    borderBottomWidth: 1,
    maxHeight:180 ,
  },

  scrollView: {
    height: '20%',
    width: '100%',
    margin: 1,
    alignSelf: 'center',
    padding: 20,
    borderWidth: 1,
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
    width:'90%',
    maxHeight:180 
    
  },
  label: {
    color: 'green',
    margin: 8,
    marginLeft: 0,
    fontSize:18 
  },
  remarks:{
    alignItems: 'center',
    width: '100%',
    //backgroundColor: 'white',
    borderRadius: 5,
    textAlignVertical:'top',
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
    width:'auto',
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