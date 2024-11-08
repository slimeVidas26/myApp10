import React, { useContext } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { Context1 } from '../../App';


export function Screen4({ navigation }) {
const context = useContext(Context1)
const {
fullName,
destinationCountry,
departureCountry,
} = context
return (
<View>
<Text>Departure country</Text>
<Text>{departureCountry}</Text>
<Text>Destination country</Text>
<Text>{destinationCountry}</Text>
<Text>Passenger Name</Text>
<Text>{fullName}</Text>
<Text>Is the above info correct?</Text>
<Button title={'YES'} onPress={() => {
alert("Yay everything worked well!")
navigation.popToTop()
}} />
<Button title={'NO'} onPress={() => {
alert("It's okay you can enter the information again")
navigation.popToTop()
}} />
</View>
);
}
