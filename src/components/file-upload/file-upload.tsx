import {Button, HStack, Input, Text} from "@chakra-ui/react";
import { FiUpload } from 'react-icons/fi';
import styles from './file-upload.module.scss';

const FileUpload = () => {

    const uploadImage = () => {
        let element = document.getElementById("file-upload-field");
        if(element) {
            element.click();
        }
    }


    return <HStack className={styles.fileUpload} onClick={uploadImage}>
        <Button>
            <FiUpload/>
        </Button>
        <Input id="file-upload-field" type="file"/>
        <Text>Datei hochladen</Text>
    </HStack>
}

export default FileUpload;