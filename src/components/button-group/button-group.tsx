import { HStack } from '@chakra-ui/react';
import React from 'react';

interface ButtonGroupProps {
    children?: any;
}

const ButtonGroup = ({ children }: ButtonGroupProps) => {
    return <HStack width="100%" justifyContent="center" p="12px 0px"> 
        {children}
    </HStack>
}

export default ButtonGroup;