import {Button, HStack, Input, Text} from "@chakra-ui/react";
import {FiUpload} from 'react-icons/fi';
import styles from './file-upload.module.scss';
import {audioFile} from "../../lib/state";
import {useAtom} from "jotai";

const FileUpload = () => {

  const [uploaded_file, setUpdatedFile] = useAtom(audioFile);

  const uploadImage = () => {
    const element = document.getElementById("file-upload-field");
    if (element) {
      element.click();
    }
  }

  const setFileInState = (e) => {
    if (e.target.files.length!) {
      setUpdatedFile(e.target.files[0])
    }
  }


  return <HStack className={styles.fileUpload} onClick={uploadImage}>
    <Button>
      <FiUpload/>
    </Button>
    <Input id="file-upload-field" type="file" onChange={setFileInState}/>
    <Text>Datei hochladen</Text>
  </HStack>
}

export default FileUpload;