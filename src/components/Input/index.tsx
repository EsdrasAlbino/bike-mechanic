import { Input as NBInput, IInputProps } from "native-base";

export function Input({...rest}: IInputProps) {
    return (
        <NBInput 
            bg='white'
            h={14}
            size='md'
            borderWidth={.5}
            fontSize='md'
            fontFamily='body'
            color='black'
            placeholderTextColor='gray.400'
            _focus={
                {
                    borderWidth: 1,
                    borderColor: 'orange.400',
                    bg: 'white',
                }
            }
            {...rest}
        />
    )
}