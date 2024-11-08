import { gql, useQuery } from '@apollo/client';
import {Text} from 'react-native'

// const HELLO_QUERY = gql`
// query Query {
//   hello
// }
// `;

const HELLO_QUERY = gql`
    query Query($firstName: String , $lastName : String) {
        hello(firstName: $firstName , lastName : $lastName)
    }
`;

export const HelloScreen = ()=> {
    //const { data, loading, error } = useQuery(HELLO_QUERY);

    const { data, loading, error } = useQuery(HELLO_QUERY, {
        variables: {firstName: "Jacob" , lastName : "Dahan"},
    });

    if (loading) return <Text>Loading...</Text>;
    if (error) {
        console.error('HELLO_QUERY error', error);
    }

    return <Text>
        {loading && 'Loading...'}
        {error && 'Error (check console logs)'}
        {!loading && !error && data?.hello}
    </Text>;
}