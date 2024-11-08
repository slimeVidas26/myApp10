import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal,TextInput ,  TouchableOpacity } from 'react-native';

const PopUpScreen = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleOpenPopup = () => {
    setIsVisible(true);
  };

  const handleClosePopup = () => {
    setIsVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Previous Screen Content</Text>
      
      <TouchableOpacity onPress={handleOpenPopup} style={styles.button}>
        <Text style={styles.buttonText}>Open Pop-up</Text>
      </TouchableOpacity>

      <Modal visible={isVisible} transparent={true} animationType="fade">
        <TouchableOpacity style={styles.modalBackground} activeOpacity={1} onPress={handleClosePopup}>
          <View style={styles.popupContainer}>
          <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="*Number"
          placeholderTextColor="#808080"
          secureTextEntry={false}
          onChangeText={(number) => setNumber(number)} 
          keyboardType="numeric" 
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="*Quantity"
          placeholderTextColor="#808080"
          secureTextEntry={false}
          onChangeText={(quantity) => setQuantity(quantity)} 
          keyboardType="numeric" 
        />
      </View>

      <View style = {styles.btnZone}>
      <TouchableOpacity style={styles.closeButton}
        onPress={() => {setModalVisible(false);navigation.goBack()}}>
        <Text style={styles.closeButtonText}>Next</Text> 
      </TouchableOpacity>
            <TouchableOpacity onPress={handleClosePopup} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
        
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PopUpScreen;