import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/header/header.tsx";
import FileUpload from "./components/file-upload/file-upload.tsx";
import Sidebar from "./components/sidebar/sidebar.tsx";
import Tag from "./components/tag/tag.tsx";
import {BsChevronDoubleLeft, BsChevronDoubleRight} from "react-icons/bs"
import {
  Button,
  HStack,
  Textarea,
  VStack,
  Text,
  Grid,
  GridItem,
  flexbox,
  Flex,
  Slide,
  useDisclosure,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { AppState, assets, coverIdx, dummyAssetTypes, dummySocialMediaTypes, lyrics, socialMediaTypes, stage, sidebarOpen } from "./lib/state.ts";
import ButtonGroup from "./components/button-group/button-group.tsx";
import CoverPreview from "./components/cover-preview/cover-preview.tsx";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Selection from "./components/sidebar/selection.tsx";

function App() {
  const [appState, setAppState] = useAtom(stage);
  const [songLyrics, setSongLyrics] = useAtom(lyrics);
  const [selectedCover, setSelectedCover] = useAtom(coverIdx);
  const { isOpen, onToggle } = useDisclosure()

  const styles = {
    container: {
      display: 'flex'
    },
    sidebarButton : {
      border: 'none',
      marginTop: '30px',
      backgroundColor: 'white',
      fontSize: 'x-large',
      zIndex: 10
    }
  }

  if (appState === AppState.LYRICS) {
    return (
      <>
        <Header main={"sound2assets"}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed <br />{" "}
          diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
          erat, sed diam voluptua.
        </Header>

        <VStack alignItems="flex-start" marginTop="32px" gap={4}>
          <FileUpload />
          <Textarea
            placeholder="Lyrics eingeben..."
            value={songLyrics}
            onChange={(e) => setSongLyrics(e.target.value)}
          />
        </VStack>

        <ButtonGroup>
          <Button onClick={(e) => setAppState(AppState.COVER)}>Next</Button>
        </ButtonGroup>
      </>
    );
  }

  if (appState === AppState.COVER) {
    return (
      <HStack alignItems="flex-start" justifyContent="space-between">
        <VStack>
          <Header main={"Select a cover"}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          </Header>

          {/* <IconButton position="absolute" right="32px" top="32px" icon={<FaChevronLeft/>} aria-label="open sidebar"/> */}

          <HStack justifyContent="center" padding="32px 0px">
            <Grid
              templateColumns="repeat(2, 1fr)"
              templateRows="repeat(2, 1fr)"
              gap={6}
            >
              <GridItem>
                <CoverPreview idx={0} />
              </GridItem>
              <GridItem>
                <CoverPreview idx={1} />
              </GridItem>
              <GridItem>
                <CoverPreview idx={2} />
              </GridItem>
              <GridItem>
                <CoverPreview idx={3} />
              </GridItem>
            </Grid>
          </HStack>

          <ButtonGroup>
            <Button onClick={(e) => setAppState(AppState.LYRICS)}>Back</Button>
            {selectedCover !== -1 ? <Button>Re-generate</Button> : null}
            {selectedCover !== -1 ? <Button onClick={e => setAppState(AppState.ASSETS)}>Next</Button> : null}
          </ButtonGroup>
        </VStack>
        <div style={styles.container}>
          <Button style={styles.sidebarButton} onClick={onToggle}>
            {!isOpen ? <BsChevronDoubleLeft/> : <BsChevronDoubleRight/>}
            </Button>
            <Slide in={isOpen} style={{ zIndex: 3 }}>
              <Sidebar/>
            </Slide>
        </div>
      </HStack>
    );
  }

  if (appState === AppState.ASSETS) {
    return <>
      <Header main="Welche Assets sollen erstellt werden?">
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
      </Header>

      <Selection values={dummyAssetTypes} atomToUse={assets}/>

      <Header main="Social Media Posts">
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
      </Header>

      <Selection values={dummySocialMediaTypes} atomToUse={socialMediaTypes}/>

      <ButtonGroup>
        <Button onClick={(e) => setAppState(AppState.COVER)}>Back</Button>
        <Button onClick={(e) => setAppState(AppState.PREVIEW)}>Next</Button>
      </ButtonGroup>
    </>
  }

  return <>
    <Text fontSize="3xl">Congratulations</Text>
    <Text fontSize="lg">Here are your assets.</Text>

    <HStack>

    </HStack>

    <ButtonGroup>
      <Button>Back</Button>
      <Button>Download</Button>
    </ButtonGroup>
  </>;
}

export default App;
