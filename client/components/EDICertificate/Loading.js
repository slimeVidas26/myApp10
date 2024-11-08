import {View , StyleSheet , ActivityIndicator} from 'react-native'


export const Loading = ()=>(
<View style={styles.loading}>
          <ActivityIndicator size="large" color="#5500dc" />
        </View>
        );

        const styles = StyleSheet.create({
           
            loading: {
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 18
            }
           
          
          });