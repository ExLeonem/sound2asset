import {Box} from "@chakra-ui/react";
import styles from './cover-preview.module.scss';
import { useAtom } from "jotai";
import {coverIdx, selectedCoverUrl} from "../../lib/state";

interface CoverPreviewProps {
    idx: number;
    url: string | undefined
}


const CoverPreview = ({ idx, url }: CoverPreviewProps) => {
    const [selectedCover, setSelectedCover] = useAtom(coverIdx);
    const [urlSelectedCover, setSelectredCoverUrl] = useAtom(selectedCoverUrl)
    const classes = [styles.coverPreview]

    if (selectedCover === idx) {
        classes.push(styles.active);
    }

    const toggleSelectCover = (e: any) => {
        if (selectedCover === idx) {
            setSelectedCover(-1);
            setSelectredCoverUrl("");
        } else {
            setSelectedCover(idx);
            setSelectredCoverUrl(url ? url : "");
        }
    }


    return <Box className={classes.join(" ")} backgroundColor="grey" onClick={toggleSelectCover}>
        <img src={url}/>
    </Box>
}

export default CoverPreview;