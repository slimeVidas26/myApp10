import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'


export const EDIcertificateItem = ({ item }) => {
  const navigation = useNavigation()

  console.log('orderId' ,item.id )

  return (
    <TouchableOpacity onPress={() => navigation.navigate('MyTabBar' , {orderId:item.id})}>
      <View style={styles.listItem}>
        <View style={styles.metaInfo}>
          <Text style={styles.title}></Text>
          <Text style={styles.blueText}>{`${item.supplier.name}`}</Text>
        </View>

        <View style={styles.metaInfo}>
          <Text style={styles.blueText}>Boxes:{`${item.totalBoxes}`}</Text>
          <Text style={styles.title}>Supplier Number:{`${item.supplier.number}`}</Text>
        </View>

        <View style={styles.metaInfo}>
          <Text style={styles.blueText}>Quantity:{`${item.totalQuantity}`}</Text>
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



const styles = StyleSheet.create({
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