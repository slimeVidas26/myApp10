import React, { useContext } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { Context1 } from '../../App';

export function Screen1({ navigation }) {
const context = useContext(Context1)
return (
<View>
<Text>Enter your full name</Text>
<TextInput
placeholder={'Full Name'} value={context.fullName}
onChangeText={(name) => {
context.setFullName(name)
}} />
<Button title={'NEXT'} onPress={() => {
navigation.navigate('Screen 2')
}} />
</View>
);
}
