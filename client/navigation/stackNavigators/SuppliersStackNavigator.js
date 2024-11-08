import { createStackNavigator } from '@react-navigation/stack'
import { SuppliersScreen } from '../../screens/suppliers/SuppliersScreen';
import { AddSupplierScreen } from '../../screens/suppliers/AddSupplierScreen';

const Stack = createStackNavigator();  

// const suppliers = [
//   { id: '1', name: 'Supplier 1', address: '123 Main St' },
//   { id: '2', name: 'Supplier 2', address: '456 Elm St' },
//   { id: '3', name: 'Supplier 3', address: '789 Oak St' },
//   // Add more suppliers as needed
// ];

const SuppliersStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: true,
    }}>
      <Stack.Screen name="Suppliers" component={SuppliersScreen} />
      <Stack.Screen name="AddSupplier" component={AddSupplierScreen} />

    </Stack.Navigator>
  )
}

export default SuppliersStackNavigator