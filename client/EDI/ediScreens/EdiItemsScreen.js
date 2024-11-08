import React from 'react'
import { View, Text  , StyleSheet,Button} from 'react-native'
import { StatusBar } from 'expo-status-bar';

const EdiItems = ({navigation}) =>  {
  
 return (
  <View style={styles.container}>
    <StatusBar style="auto" />
    <Button
      title="Go to EdiItemDetails"
      onPress={() => navigation.navigate('EdiItemDetails')}
    />
  </View>
 )
}

export default EdiItems

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputView: {
    backgroundColor: "#1f1400",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
 
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "blue",
  },
  text:{
    fontSize:20
  }
 
});

