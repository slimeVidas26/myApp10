import {View ,Text, StyleSheet} from 'react-native'


export const Error = ()=>(
<View style={styles.error}>
          <Text>
            Error fetching data... Check your network connection!
          </Text>
        </View>
        );

        const styles = StyleSheet.create({
           
            error: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 18
              }
           
          
          });