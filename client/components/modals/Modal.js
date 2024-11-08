import React from 'react';
import { View, StyleSheet, Button, Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Modal = ({ children, onClose }) => {
  return (
    <View style={styles.overlay}>
      <View style={styles.modal}>
        {children}
        {/* <Button title="X" style={styles.closeButton} onPress={onClose}/> */}


      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex:1,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    //backgroundColor: 'rgb(128, 128, 128)',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    height:windowHeight
  },
  modal: {
    backgroundColor: 'white',
    //backgroundColor: 'white',
    //marginTop:20,
    //padding: 10,
    borderRadius: 40,
    //position: 'relative',
    //minWidth: '95%',
    //maxWidth: 500
    height:windowHeight
  },
 
});



export default Modal;