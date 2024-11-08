
// import React, { useMemo , useState } from 'react'
// import Modal from "../../components/modals/Modal";
// import { ModalHeader, EdiHeader } from '../../components/headers/Header';
// import { View, StyleSheet, FlatList  , Text } from 'react-native'
// import filter from 'lodash.filter';
// import { MyListEmpty } from '../../components/EDICertificate/MyListEmpty';
// import { RenderSeparator } from '../../components/EDICertificate/RenderSeparator';
// import { Loading } from '../../components/EDICertificate/Loading';
// import { Error } from '../../components/EDICertificate/Error';
// import { useQuery } from "@apollo/client";
// import { EDI_ORDERS_QUERY } from '../../gql/Query';
// import { useNavigation } from '@react-navigation/native'
// import { TouchableOpacity } from 'react-native-gesture-handler'




// const EDICertificateScreen = () => {

//   const navigation = useNavigation()
//   const [isModalOpen, setModalOpen] = useState(false);
//   const { data, error, loading } = useQuery(EDI_ORDERS_QUERY);
//   const [query, setQuery] = useState('');
//   const [fullData, setFullData] = useState([]);

//   if (loading) return <Text>Loading...</Text>;
//   if (error) return <Text>Error loading data</Text>;

//   // const openOrders = data?.orders?.filter(order => order.openOrder === true) || [];
//   const openOrders = useMemo(() => data?.orders?.filter(order => order.openOrder) || [], [data]);
//   const openOrdersLength = openOrders.length;
//   console.log(openOrdersLength)
//  const EDIcertificateItem = ({ item  }) => {
  
    
//     return (
//       <TouchableOpacity onPress={() => navigation.navigate('TabNavigator' , {paramData:item})}>
//         <View style={styles.listItem}>
//           <View style={styles.metaInfo}>
//           <Text style={styles.blueText}></Text>
//             <Text style={styles.blueText}>{`${item.supplier.name}`}</Text>
//           </View>
  
//           <View style={styles.metaInfo}>
//             <Text style={styles.blueText}>Boxes:{`${item.totalBoxes}`}</Text>
//             <Text style={styles.title}>Supplier Number:{`${item.supplier.number}`}</Text>
//           </View>
  
//           <View style={styles.metaInfo}>
//             <Text style={styles.blueText}>TQuantity:{`${item.totalQuantity}`}</Text>
//             <Text style={styles.title}>Edi:{`${item.edi}`}</Text>
//           </View>
  
//           <View style={styles.metaInfo}>
//             <Text style={styles.title}>{`${item.date}`}</Text>
//             <Text style={styles.title}>Order Number: {`${item.reference}`}</Text>
//           </View> 
//         </View>
//       </TouchableOpacity>
//     )
//   }

//   const filterOrders = (orders, query) => {
//   const formattedQuery = query.toLowerCase();
//   return filter(orders, order => {
//     const { supplier, edi, reference } = order;
//     return supplier.name.toLowerCase().includes(formattedQuery) ||
//            supplier.number.toString().includes(formattedQuery) ||
//            edi.toString().includes(formattedQuery) ||
//            reference.toString().includes(formattedQuery);
//   });
// };

// const filteredData = useMemo(() => filterOrders(openOrders, query), [openOrders, query]);


// // const handleSearch = text => {
// //   setModalOpen(true);
// //   setQuery(text);
// //   setFullData(filterOrders(openOrders, text));
// // };

// const handleSearch = text => {
//   setModalOpen(true);
//   setQuery(text);
// };


// if (loading) return <Loading />;
//   if (error) return <Error />;
  

//   return (
    
//       <View style={styles.container}>
//         {isModalOpen == true ?
//           <Modal
//             animationType="fade"
//             transparent={true}
//             visible={isModalOpen}
//           >
//               <ModalHeader
//                 setModalOpen={setModalOpen}
//                 isModalOpen={isModalOpen}
//                 query={query}
//                 handleSearch={handleSearch} />
                
//               <FlatList style={styles.flatList}
//               ItemSeparatorComponent={<RenderSeparator />}
//               //data={isModalOpen == true? (query ? fullData : null):openOrders}
//               data = {filteredData}
//               keyExtractor={(item) => item.id.toString()}   
//                renderItem={({ item }) => <EDIcertificateItem item={item} navigation = {navigation} />}
//               ListEmptyComponent={<MyListEmpty message="No Data Found" />}
//             />
//           </Modal>
//           :
//           !loading && !error && data &&
//             <>
//             {openOrdersLength > 0 &&
//             <EdiHeader setModalOpen={setModalOpen}
//                        setQuery={setQuery}
//                        setFullData={setFullData} />}

//           <FlatList style={styles.flatList}
//             ItemSeparatorComponent={<RenderSeparator />}
//             data={openOrders}
//             keyExtractor={(item) => item.id.toString()}
//             renderItem={({ item }) => <EDIcertificateItem item={item} />}
//             ListEmptyComponent={<MyListEmpty message="No Data Found" />}
//           />
//          </>
//         }
//       </View>
    
//   );

// }

// export default EDICertificateScreen

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 8,
//     alignItems: "center",
//   },
//   flatList: {
//     marginTop: 14,
//     alignSelf: "stretch",
//   },
//   listItem: {
//     marginTop: 10,
//     padding: 10,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//   },
//   metaInfo: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginHorizontal: 10,
//   },
//   title: {
//     fontSize: 20,
//   },
//   blueText: {
//     fontSize: 20,
//     color: 'blue',
//   },
// });


import React, { useState } from 'react'
import Modal from "../../components/modals/Modal";
import { ModalHeader, EdiHeader } from '../../components/headers/Header';
import { View, StyleSheet, FlatList  , Text } from 'react-native'
import filter from 'lodash.filter';
import { MyListEmpty } from '../../components/EDICertificate/MyListEmpty';
import { RenderSeparator } from '../../components/EDICertificate/RenderSeparator';
import { Loading } from '../../components/EDICertificate/Loading';
import { Error } from '../../components/EDICertificate/Error';
import { useQuery } from "@apollo/client";
import { EDI_ORDERS_QUERY } from '../../gql/Query';
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'




const EDICertificateScreen = () => {

  const navigation = useNavigation()
  const [isModalOpen, setModalOpen] = useState(false);
  const { data, error, loading } = useQuery(EDI_ORDERS_QUERY);
  const [query, setQuery] = useState('');
  const [fullData, setFullData] = useState([]);

  if (loading) return <Text>Loading...</Text>;
  
  if (error) return <Text>Error loading data</Text>;

  const openOrders = data?.orders?.filter(order => order.openOrder === true) || [];

 const EDIcertificateItem = ({ item  }) => {
  
    
    return (
      <TouchableOpacity onPress={() => navigation.navigate('TabNavigator' , {paramData:item})}>
        <View style={styles.listItem}>
          <View style={styles.metaInfo}>
            <Text style={styles.blueText}>{`${item.supplier.name}`}</Text>
          </View>
  
          <View style={styles.metaInfo}>
            <Text style={styles.blueText}>Boxes:{`${item.totalBoxes}`}</Text>
            <Text style={styles.title}>Supplier Number:{`${item.supplier.number}`}</Text>
          </View>
  
          <View style={styles.metaInfo}>
            <Text style={styles.blueText}>TQuantity:{`${item.totalQuantity}`}</Text>
            <Text style={styles.title}>Edi:{`${item.edi}`}</Text>
          </View>
  
          <View style={styles.metaInfo}>
            <Text style={styles.title}>{`${item.date}`}</Text>
            <Text style={styles.title}>Order Number: {`${item.reference}`}</Text>
          </View> 
        </View>
      </TouchableOpacity>
    )
  }

  const filterOrders = (orders, query) => {
  const formattedQuery = query.toLowerCase();
  return filter(orders, order => {
    const { supplier, edi, reference } = order;
    return supplier.name.toLowerCase().includes(formattedQuery) ||
           supplier.number.toString().includes(formattedQuery) ||
           edi.toString().includes(formattedQuery) ||
           reference.toString().includes(formattedQuery);
  });
};


const handleSearch = text => {
  setModalOpen(true);
  setQuery(text);
  setFullData(filterOrders(openOrders, text));
};


  
  //   const formattedQuery = text.toLowerCase();
  //   console.log('formattedQuery' , formattedQuery)
  //   const filteredData = filter(openOrders, order => {
  //     console.log("order" , order.edi)
  //     return contains(order, formattedQuery);
  //   });
  //   setModalOpen(true)
  //   setQuery(text);
  //   setFullData(filteredData)
  // };

  // const contains = ({  supplier  , edi    , reference }, query) => {
    
  //   if ( supplier.name.toLowerCase().includes(query) ||
  //         supplier.number.toString().includes(query) ||
  //         edi.toString().includes(query) ||
  //         reference.toString().includes(query)) {
  //           console.log("name" , supplier.name)
  //           console.log("number" , supplier.number)
  //           console.log("edi" , edi)
  //           console.log("reference" , reference)


  //     return true
  //   }

  //   return false;
  // };

  return (
    
      <View style={styles.container}>
        {loading && <Loading/>}
        {error && <Error/>}

        {isModalOpen == true ?
          <Modal
            animationType="fade"
            transparent={true}
            visible={isModalOpen}
          >
              <ModalHeader
                setModalOpen={setModalOpen}
                isModalOpen={isModalOpen}
                query={query}
                handleSearch={handleSearch} />
                
              <FlatList style={styles.flatList}
              ItemSeparatorComponent={<RenderSeparator />}
              data={isModalOpen == true? (query ? fullData : null):openOrders}
              keyExtractor={(item) => item.id.toString()}   
               renderItem={({ item }) => <EDIcertificateItem item={item} navigation = {navigation} />}
              ListEmptyComponent={<MyListEmpty message="No Data Found" />}
            />
          </Modal>
          :
          !loading && !error && data &&
            <>
            <EdiHeader setModalOpen={setModalOpen}
                       setQuery={setQuery}
                       setFullData={setFullData} />

          <FlatList style={styles.flatList}
            ItemSeparatorComponent={<RenderSeparator />}
            data={openOrders}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <EDIcertificateItem item={item} />}
            ListEmptyComponent={<MyListEmpty message="No Data Found" />}
          />
         </>
        }
      </View>
    
  );

}

export default EDICertificateScreen

const styles = StyleSheet.create({
  
  
  container: {
    flex: 1,
    padding: 8,
    flexDirection: "column", // main axis
    justifyContent: "center", // main axis
    alignItems: "center", // cross axis
    //backgroundColor: colors.background_dark
  },

  flatList: {
    //width: '100%',
    marginTop: 14,
    alignSelf: "stretch",
  },

  //ediItem
  listItem: {
    marginTop: 10,
    paddingVertical: 0,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'space-around',
    borderRadius: 10,
  },
  metaInfo: {
    borderRadius: 2,
    flex: 1,
    flexDirection: "row", // main axis
    justifyContent: "space-between", // main axis
    marginLeft: 10,
    marginRight: 10,
    marginTop: 0,
    marginBottom: 0,
  },

  title: {
    fontSize: 20,
    marginBottom: 20,
  },

  blueText: {
    fontSize: 20,
    color: 'blue',
  }
});






