import React, { useContext } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { Context1 } from '../../App';

export function Screen3({ navigation }) {
const context = useContext(Context1)
return (
<View>
<Text>Enter your departure country</Text>
<TextInput
placeholder={'Departure Country'} value={context.departureCountry}
onChangeText={(depart) => {
context.setDepartureCountry(depart)
}} />
<Button title={'NEXT'} onPress={() => { navigation.navigate('Screen 4') }} />
</View>
);
}
