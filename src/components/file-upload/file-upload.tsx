import {Button, HStack, Input, Text} from "@chakra-ui/react";
import {FiUpload} from 'react-icons/fi';
import styles from './file-upload.module.scss';
import {audioFile} from "../../lib/state";
import {useAtom} from "jotai";

const FileUpload = () => {

  const [fileToUpload, setFileToUpload] = useAtom(audioFile);

  const uploadImage = () => {
    const element = document.getElementById("file-upload-field");
    if (element) {
      element.click();
    }
  }

  const setFileInState = (e) => {
    let file = null;
    if (e.target.files!) {
      console.log("File uploaded");
      file = e.target.files;
      setFileToUpload(e.target.files[0])

      const fileReader = new FileReader();
      fileReader.readAsBinaryString(file);
      fileReader.onload = () => {
        let fileBinary = fileReader.result;
        setFileToUpload(btoa(fileBinary as string))
      }
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