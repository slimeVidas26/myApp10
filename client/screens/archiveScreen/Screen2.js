import React, { useContext } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { Context1 } from '../../App';


export function Screen2({ navigation }) {
const context = useContext(Context1)
return (
<View>
<Text>Enter your destination country</Text>
<TextInput
placeholder={'Destination Country'} value={context.destinationCountry}
onChangeText={(dest) => {
context.setDestinationCountry(dest)
}} />
<Button title={'NEXT'} onPress={() => {
navigation.navigate('Screen 3')
}} />
</View>
);
}
