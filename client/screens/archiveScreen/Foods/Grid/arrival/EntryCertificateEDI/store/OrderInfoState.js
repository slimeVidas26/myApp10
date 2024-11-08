import { useState } from 'react';
import {Text , View , StyleSheet } from 'react-native'






import data from '../../../../../../data/Datas'


const OrderInfoState = () => {


    const [OrderInfo, setOrderInfo] = useState({
        data : data , 
        closedData : data.filter((item)=>item.isOpen===false),

        inputPlaceholder :'Search Order',
        message : '',  
    })

    //console.log('OrderInfo' , OrderInfo)

     //functions
    //  function setData(updateData){
    //     const newState = { ...data, updateData };
    //     setOrderInfo(OrderInfo.data === newState);
    //      }

         function setData(updateData) {
            const newState = { ...OrderInfo, updateData };
            setOrderInfo(newState);
             }

        const  openData = () =>data.filter((item)=>item.isOpen===true)
         
        const  closedData = () =>data.filter((item)=>item.isOpen===false)

            

        return {
            data : OrderInfo.data,
           closedData,
           inputPlaceholder:OrderInfo.inputPlaceholder,
           message:OrderInfo.message,
           setData,
           openData
           
          }
  };

 
  
  
  export default OrderInfoState;
  