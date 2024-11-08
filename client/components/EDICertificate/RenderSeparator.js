import { View, StyleSheet } from 'react-native'


export const RenderSeparator = () => {
  return (
    <View
      style={styles.separator}
    />
  )
}

const styles = StyleSheet.create({
  separator: {
    height: 5,
    width: '100%',
    backgroundColor: '#CED0CE',
    marginTop: 8
  }
})