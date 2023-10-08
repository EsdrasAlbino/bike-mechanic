import { VStack, Text, Button, IButtonProps } from "native-base";

type Props = IButtonProps & {
    title: string;
    isActive?: boolean;
    type: 'open' | 'closed';
}

export function Filter({title, isActive = false, type, ...rest}: Props) {

    const colorType = type === 'open' ? '#f97316' : '#166534';

    return ( 
        <Button
            variant='outline'
            borderWidth={isActive ? 1 : 0}
            borderColor={colorType}
            bgColor='gray.100'
            flex={1}
            size='sm'
            {...rest}
        >
            <Text color={isActive ? colorType : 'gray.300'} fontSize='xs' textTransform='uppercase'>
                {title}
            </Text>

        </Button>
    )
}