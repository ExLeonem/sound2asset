import {useAtom} from "jotai";
import {
  Box, NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper
} from "@chakra-ui/react";
import {selectedCoverUrl} from "../../lib/state";
import styles from './merch-preview.module.scss';


interface MerchPreviewProps {
  tshirtUrl: string
}

const MerchPreview = ({tshirtUrl}: MerchPreviewProps) => {
  const [urlSelectedCover] = useAtom(selectedCoverUrl)
  const classes = [styles.merchPreview]


  return <Box className={classes.join(" ")}>
    <div><img style={{zIndex: 0, position: 'relative',width: 200 + 'px', height: 200 + 'px' }} src={tshirtUrl}/>
      <img style={{zIndex: 2, width: 90 + 'px', height: 90 + 'px', position: 'relative', top: -150 + 'px', left: 55 + 'px'}}
           src={urlSelectedCover}/>
    </div>
    <div align="left">
      Anzahl
      <NumberInput defaultValue={0} min={0} max={20}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </div>

  </Box>
}

export default MerchPreview;