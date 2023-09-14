import {Text, VStack} from "@chakra-ui/react";


interface HeaderProps {
    children?: string | any;
    main?: string;
}

const Header = ({ main, children }: HeaderProps) => {
    return <VStack justifyContent="center" alignItems="center">
        <Text fontSize="4xl">{main}</Text>
        <Text textAlign="center">{children}</Text>
    </VStack>
}

export default Header;