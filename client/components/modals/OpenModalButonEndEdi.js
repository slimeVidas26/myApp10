import React, { useState } from 'react';
import { SafeAreaView,Modal,FlatList,StatusBar, Text,TouchableOpacity, View, StyleSheet,Pressable } from 'react-native';
import { useQuery } from "@apollo/client";
import { REDSTAMPS_QUERY } from '../../gql/Query';


export const OpenModalButtonEndEdi = ()=>{

    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState('Choose Reason');

    const [selectedId, setSelectedId] = useState(null);

    const {data, error, loading} = useQuery(REDSTAMPS_QUERY
      //,{enabled: modalVisible}
    );
  console.log('data' , data)

  if (error) {
    console.error('REDSTAMPS_QUERY error', error);
}

if (loading) {
  console.error('Loading');
}

   
      
      
       const RedstampItem = ({redstamp}) =>{
        const { title , id } = redstamp; 
        //const backgroundColor = item.id === selectedId ? '#696969' : '#696969';
        const color = id === selectedId ? 'red' : 'white';
    
        return (
        <TouchableOpacity onPress = {
          ()=>{console.log(title);
               setSelectedId(id);
               setModalVisible(false);setTitle(title)}} style={styles.item}>
           
           <Text style={styles.itemTitle}>{title}</Text>
           <Text style={[styles.itemCircle , {color}]}>{`\u29BF`}</Text>
           
         
         </TouchableOpacity>
       )
      };



    return(
        <>
        <Pressable style ={styles.input} onPress={() => setModalVisible(!modalVisible)} > 
        <Text style = {styles.chooseReasonText}>{title}</Text>
        </Pressable>

<Modal
animationType="slide"
transparent={true}
visible={modalVisible}
//onDismiss={()=>setModalVisible(false)}
onRequestClose={() => {
  setModalVisible(!modalVisible);
  
}}
>
 <TouchableOpacity
style={{flex:1}}
onPress={() => {
setModalVisible(false)
}}>


<View style={styles.centeredView} >
  
  <View style={styles.modalView} >

  <SafeAreaView style={styles.modalContainer} >
  {loading && <Text>Loading...</Text>}
      {error && <Text>Check console for error logs</Text>}
      {!loading && !error && data && 
   <FlatList
data={data.redstamps}
// renderItem={RedstampItem}
renderItem={({ item }) => (
  <RedstampItem redstamp={item} />)}
keyExtractor={item => item.id}
extraData={selectedId}
/> }
</SafeAreaView>
  </View>
</View>
</TouchableOpacity>
</Modal>
</>
    )
}



const styles = StyleSheet.create({
input: { 
    
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
  chooseReasonText:{
    fontSize: 18,
    textAlign:'center',  
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContainer:{
    flex: 1,
    //marginTop: StatusBar.currentHeight || 0,
   
  },
  modalView: {
     margin: 0,
     padding:0,
    width:375,
    height:555,
    backgroundColor: 'white',
    //borderRadius: 20,
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  item: {
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'stretch',
    // backgroundColor: '#696969',
     backgroundColor: 'black',

     padding: 15,
     marginVertical: 2,
    //margin:20,
    width:375,
    height:75

    //marginHorizontal: 2,
    
  },
  itemTitle: {
    fontSize: 22,
    //textAlign:'right',
    color:'#FFF'
  },
  itemCircle: {
    fontSize: 22,
    //textAlign:'left',
    color:'#FFF'
  },
})