import {Box} from "@chakra-ui/react";
import styles from './cover-preview.module.scss';
import { useAtom } from "jotai";
import { coverIdx } from "../../lib/state";

interface CoverPreviewProps {
    idx: number;
}

const CoverPreview = ({ idx }: CoverPreviewProps) => {
    const [selectedCover, setSelectedCover] = useAtom(coverIdx);
    const classes = [styles.coverPreview]

    if (selectedCover === idx) {
        classes.push(styles.active);
    }

    const toggleSelectCover = (e: any) => {
        if (selectedCover === idx) {
            setSelectedCover(-1);
        } else {
            setSelectedCover(idx);
        }
    }


    return <Box className={classes.join(" ")} backgroundColor="grey" onClick={toggleSelectCover}>
  
    </Box>
}

export default CoverPreview;