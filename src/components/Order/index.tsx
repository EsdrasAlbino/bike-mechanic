import { HStack, Text, Box, VStack, Circle, Pressable, IPressableProps } from "native-base";
import { ClockAfternoon, Hourglass, CircleWavyCheck } from 'phosphor-react-native';

export type OrderProps = {
    id: string;
    plate: string;
    when: string;
    status: 'open' | 'closed';
}

type Props = IPressableProps & {
    data: OrderProps;
}

export function Order({ data, ...rest }: Props) {

    const statusColor = data.status === 'open' ? '#f97316' : '#166534';

    return (
        <Pressable { ...rest }>
            <HStack
                bg='gray.100'
                mb={4}
                alignItems='center'
                justifyContent='space-between'
                rounded='sm'
                overflow='hidden'
            >
                <Box h='full' w={2} bg={statusColor} />

                <VStack flex={1} my={5} ml={5}>
                    <Text fontSize='md'>
                        License Plate: {data.plate}
                    </Text>

                    <HStack alignItems='center'>
                        <ClockAfternoon size={15} color='#a1a1aa' />
                        <Text color='gray.400' fontSize='xs' ml={1}>
                            {data.when}
                        </Text>
                    </HStack>
                </VStack>

                <Circle bg='gray.200' h={12} w={12} mr={5}>
                    {
                        data.status === 'closed'
                            ? <CircleWavyCheck size={24} color={statusColor} />
                            : <Hourglass size={24} color={statusColor} />
                    }
                </Circle>
            </HStack>
        </Pressable>
    )
}