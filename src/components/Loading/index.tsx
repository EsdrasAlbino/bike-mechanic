import { Center, Spinner } from 'native-base';

export function Loading() {
    return(
        <Center flex={1} bg='trueGray.50'>
            <Spinner color='orange.500'/>
        </Center>
    )
}