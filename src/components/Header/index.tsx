import { Heading, HStack, IconButton, StyledProps } from "native-base";
import { CaretLeft } from 'phosphor-react-native';

import { useNavigation } from '@react-navigation/native';

type Props = StyledProps & {
    title: string;
}

export function Header({title, ...rest}: Props) {
    const navigation = useNavigation();

    function handleGoBack() {
        navigation.goBack();
    }

    return (
        <HStack 
            w='full'
            justifyContent='space-between'
            alignItems='center'
            bg='trueGray.50'
            pb={6}
            pt={12}
            {...rest}
        >
            <IconButton 
                icon={<CaretLeft color='#f97316' size={24}/>}
                onPress={handleGoBack}
            />

            <Heading color='gray.900' textAlign='center' fontSize='lg' flex={1} ml={-6}>
                {title}
            </Heading>

        </HStack>
    )
}