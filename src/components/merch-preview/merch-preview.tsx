import {useAtom} from "jotai";
import {Box} from "@chakra-ui/react";
import {selectedCoverUrl} from "../../lib/state";
import styles from './merch-preview.module.scss';


interface MerchPreviewProps {
  tshirtUrl: string
}

const MerchPreview = ({tshirtUrl}: MerchPreviewProps) => {
  const [urlSelectedCover] = useAtom(selectedCoverUrl)
  const classes = [styles.merchPreview]


  return <Box backgroundImage={tshirtUrl} className={classes.join(" ")}>
    <div><img className="backgroundshirt" src={tshirtUrl}/>
    </div>

  </Box>
}

export default MerchPreview;