// import React, { useEffect } from "react";
// import { Text, View, FlatList, Pressable, TouchableOpacity,Image, StyleSheet,Dimensions } from "react-native";
// import { useQuery } from "@apollo/client";
// import { EDI_ORDER_QUERY } from "../../gql/Query";
// import { useNavigation } from "@react-navigation/native";
// import { Feather } from "@expo/vector-icons";




// const spacing = 5;
// const width = (Dimensions.get('window').width - 2) / 2;
// const height = (Dimensions.get('window').height)


// export const EdiOrderDetailsScreenClosed = ({ paramData, onProductCountChange }) => {
//   const { data, loading, error } = useQuery(EDI_ORDER_QUERY, {
//     variables: { orderId: paramData.id },
//   });

//   //console.log("data from OpenOrderQuery" , data)
//   //console.log("data order orderProducts  from OpenOrderQuery" , data)


//   const navigation = useNavigation();

//   // Extract open products and their count
//   const closedProducts = data?.order?.orderProducts.filter(prod => prod.isOpen === false) || [];
//   const closedProductsLength = closedProducts.length;

//   //console.log("openProducts from EdiOrderDetailsScreenOpen" , openProducts)

//   // Utilisez useEffect pour mettre à jour la longueur
//   useEffect(() => {
//     onProductCountChange(closedProducts.length);
//   }, [closedProducts.length]);

//   if (loading) return <Text>Loading...</Text>;
//   if (error) return <Text>Error loading data.</Text>;

//   if (!data || !data.order) {
//     console.warn("Data or order is undefined:", data);
//     return <Text>No order found.</Text>;
//   }

//   const ClosedOrderQueryItem = ({ item }) => {
//     const { code, name, quantityPerBox  ,inStock  , isOpen} = item.product;
//     const supplierName = data.order.supplier.name;
//     const orderId = data.order.id;
//     const productId = item.product.id;
//     const {initialQuantity,finalQuantity} = item;
    


//     console.log("orderId from open" , orderId)
//     console.log("item" , item)

//     return (
//       <TouchableOpacity onPress={() => navigation.navigate("EdiItemApprovalScreenClosed", { paramData: item.product,initialQuantity ,finalQuantity,  supplier: supplierName, orderId, productId })}>
//         <View style={styles.item}>
//           <View style={styles.top}>
//             <View style={styles.left}>
//               <Text style={styles.boxes}>{quantityPerBox}</Text>
//               <Feather name="box" size={26} color="black" />
//             </View>
//             <View>
// <Image   style={styles.img} source={require('../../assets/gamadim.png')}/>
// </View>
//           </View>
//           <View style={styles.bottom}>
//           <Text style={[styles.quantity, { color: initialQuantity === finalQuantity ? 'blue' : 'red' }]}>quantity : {finalQuantity}</Text>
//             <Text style={[styles.reference , { color: initialQuantity === finalQuantity ? 'blue' : 'red' }]}>{name}</Text>
//             <Text style={styles.barcode}>{code}</Text>
//           </View>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         style={styles.flat}
//         data={closedProducts}
//         renderItem={({ item }) => <ClosedOrderQueryItem item={item} />}
//         keyExtractor={(item) => item.id}
//         numColumns={2}
//         columnWrapperStyle={styles.column}
//       />
//       <Pressable style={styles.closeButton} onPress={() => navigation.navigate("EdiCertificateApprovalScreen" , {paramData})}>
//         <Text style={styles.closeButtonText}>Close Certificate from Open</Text>
//       </Pressable>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#7CA1B4",

//     display: 'flex',
//     //gap: '1rem',
//     //flexWrap: "nowrap",
//     flexDirection: 'column',  
//     height:height-300,
//     //marginTop: 14,
//     //alignSelf: "stretch",
//     alignItems:'center',
//     //justifyContent:'flex-end',

//   },

//   flat:{
//   display:'flex',
//     //backgroundColor:'white',
//    //width:'100%',
//   //  marginLeft:20
//    //justifyContent:'center'
//    //alignItems:'center'
//   },

//   item: {
//     display:'flex',
//     backgroundColor:'white',
//    borderColor: "#fff",
//    borderWidth: 1,
//    padding: 18,
//    //alignItems:'stretch',
//    margin:5,
//    borderRadius:20,
//    width:width -8
   
//    //marginVertical: 8,
//   // marginHorizontal: 16,
//  },

//  closeButton:{ 
// //height:70,
// backgroundColor:'blue',
// borderRadius:15,
// flexDirection:'row' ,
// justifyContent:'space-evenly',
//  alignItems:'center',
//  width:'95%' ,
// borderRadius:10,
// backgroundColor:'blue',
// padding:18

//  },
//  closeButtonText:{
// color :'white',
// fontSize:22
//  },
// top:{
//   flex:1,
// //backgroundColor:'red',
// flexDirection:'row',
// alignItems:'center',
// justifyContent:'space-between',
// padding:5,
// marginBottom:15

// },
// left:{
//   flex:1,
//   flexDirection:'row',
//   justifyContent:'space-between',
  
// },

// totalBoxes:{
//   flex:1,
//   flexDirection:'row',
//   justifyContent:'flex-start',
  
// },
// boxes:{
// //backgroundColor:'yellow',
// fontSize:18,
// padding:5
// },
// img:{
//   //backgroundColor:'white',
//   width: 100, height: 100
// },
// bottom:{
//   flex:1,
//   //backgroundColor:'yellow',
//   // margin:15,
//   alignSelf:'stretch',
//   textAlign:'right',
  

// },
// quantity:{
//   //backgroundColor:'grey'
//   fontSize:20,
//   // flexBasis:'100%'



// },
// reference:{
//   //backgroundColor:'cyan',
//   fontSize:24,
//   color:'blue'

// },
// barcode:{
//   //backgroundColor:'orange'
//   fontSize:18,


// },
//   listItem: {
//     margin: spacing,
//     backgroundColor:'grey',
//     marginTop: 10,
//     paddingVertical: 0,
//     backgroundColor: '#fff',
//     flexDirection: 'column',
//     //justifyContent: 'space-around',
//     borderRadius: 10,
//   },
//   metaInfo: {
//     flex: 1,

//     //backgroundColor:'yellow',
//      alignItems:'center',
//      justifyContent:'space-between',
//     borderRadius: 2,
//     flexDirection: "row", // main axis
//     //justifyContent: "space-between", // main axis
//     //marginLeft: 10,
//     //marginRight: 10,
//     marginTop: 15,
//     //marginBottom: 0,
//         paddingBottom:40

//   },
//   metaInfo2: {
//     //backgroundColor:'pink',
//     borderRadius: 2,
//     flex: 1,
//     flexDirection: "column", // main axis
//     justifyContent: "space-between", // main axis
//     alignItems:'flex-end',
//     marginLeft: 10,
//     marginRight: 10,
//     marginTop: 0,
//     marginBottom: 0,
//   },

//   blueText: {
//     fontSize: 24,
//     color: 'blue',
//     marginBottom: 5,

//   },

//   title: {
//     fontSize: 20,
//     marginBottom: 20,
//   },
//   // barcode: {
//   //   fontSize: 16,
//   //   marginBottom: 20,
//   // },

//   image: {
//     flex: 1,
//     //justifyContent: 'space-between',
//     //paddingBottom :200,
  
//      //  width : null,
//     //height : 220,
//       //backgroundColor: '#0553',
//      aspectRatio: 1.2, 
//   //   marginBottom : 80,
//      //alignItems: 'flex-end',
//      //position : 'relative',
//      //top:30,
//      //resizeMode: 'contain'
//   },

//   placeholder :{
//     height: "35%",
//     backgroundColor:"yellow",
//     marginBottom : 30,
//     marginTop : 30


//   },

  
//   column: {
//     flexShrink: 1,
//   },
//   row: {
//     flexDirection: "row",
//   },
//   square: {
//     borderColor: "#fff",
//     borderWidth: 1,
//     width: "45%",
//     height: 140,
//     justifyContent: "center",
//     alignItems: "center",
//     width: width,
//     margin: spacing,
//     borderRadius: 10  },

//   text: {
//     color: "black",
//     fontSize: 22,
//     fontWeight: "bold",
    
//   },
//   logoText: {
//     color: "black",
//     fontSize: 25,
//     fontWeight: "bold",
//     textAlign:'center',
//     top:'50%'
    
//   },
//   icon: {
//     position: 'absolute',
//     right: 15,
//     top:20,
//     display:'none'
//   },
//   number: {
//     color: "red",
//     fontSize: 25,
//     fontWeight: "bold",
//   },
  
//     card: {
     
//       width: width,
//       margin: spacing,
      
//       // borderColor: "#fff",
//       // borderWidth: 1,
//       // width: "45%",
//       // // height: 140,
//        justifyContent: "center",
//        alignItems: "center",
//        borderRadius:10,
//        padding:5
//     },
  
  
//     title: {
//       fontSize: 20,
//     },
//     input: {
//       height: 40,
//       margin: 12,
//       borderWidth: 1,
//       padding: 10,
//     },
  
// });

import React, { useEffect, useMemo } from "react";
import { Text, View, FlatList, Pressable, TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";
import { useQuery } from "@apollo/client";
import { EDI_ORDER_QUERY } from "../../gql/Query";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const itemWidth = (screenWidth - 2) / 2;

export const EdiOrderDetailsScreenClosed = ({ paramData, onProductCountChange }) => {
  const { data, loading, error } = useQuery(EDI_ORDER_QUERY, { variables: { orderId: paramData.id } });
  const navigation = useNavigation();

  // Memoriser les produits fermés pour éviter le calcul à chaque rendu
  const closedProducts = useMemo(() => data?.order?.orderProducts.filter(prod => !prod.isOpen) || [], [data]);
  const closedProductsLength = closedProducts.length;

  useEffect(() => {
    onProductCountChange(closedProductsLength);
  }, [closedProductsLength]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading data.</Text>;
  if (!data || !data.order) {
    console.warn("Data or order is undefined:", data);
    return <Text>No order found.</Text>;
  }

  const ClosedOrderQueryItem = ({ item }) => {
    const { code, name, quantityPerBox } = item.product;
    const { initialQuantity, finalQuantity } = item;
    const textColor = initialQuantity === finalQuantity ? 'blue' : 'red';

    return (
      <TouchableOpacity onPress={() => navigation.navigate("EdiItemApprovalScreen", {
        paramData: item.product,
        initialQuantity,
        finalQuantity,
        supplier: data.order.supplier.name,
        orderId: data.order.id,
        productId: item.product.id,
      })}>
        <View style={styles.item}>
          <View style={styles.top}>
            <View style={styles.left}>
              <Text style={styles.boxes}>{quantityPerBox}</Text>
              <Feather name="box" size={26} color="black" />
            </View>
            <Image style={styles.img} source={require('../../assets/gamadim.png')} />
          </View>
          <View style={styles.bottom}>
            <Text style={[styles.quantity, { color: textColor }]}>Quantity: {finalQuantity}</Text>
            <Text style={[styles.reference, { color: textColor }]}>{name}</Text>
            <Text style={styles.barcode}>{code}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flat}
        data={closedProducts}
        renderItem={({ item }) => <ClosedOrderQueryItem item={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.column}
      />
      <Pressable style={styles.closeButton} onPress={() => navigation.navigate("EdiCertificateApprovalScreen", { paramData })}>
        <Text style={styles.closeButtonText}>Close Certificate from Closed</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#7CA1B4",
    alignItems: 'center',
    height: screenHeight - 300,
  },
  item: {
    backgroundColor: 'white',
    borderWidth: 1,
    padding: 18,
    margin: 5,
    borderRadius: 20,
    width: itemWidth - 8,
  },
  flat: {
    display: 'flex',
  },
  closeButton: {
    backgroundColor: 'blue',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
    padding: 18,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 22,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    marginBottom: 15,
  },
  left: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boxes: {
    fontSize: 18,
    padding: 5,
  },
  img: {
    width: 100,
    height: 100,
  },
  bottom: {
    alignSelf: 'stretch',
    textAlign: 'right',
  },
  quantity: {
    fontSize: 20,
  },
  reference: {
    fontSize: 24,
  },
  barcode: {
    fontSize: 18,
  },
  column: {
    flexShrink: 1,
  },
});


