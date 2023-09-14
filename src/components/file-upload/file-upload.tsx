import {Button, HStack, Text} from "@chakra-ui/react";
import { FiUpload } from 'react-icons/fi';

const FileUpload = () => {

    return <HStack>
        <Button>
            <FiUpload/>
        </Button>
        <Text>Datei hochladen</Text>
    </HStack>
}

export default FileUpload;