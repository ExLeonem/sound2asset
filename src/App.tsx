import "./App.css";
import Header from "./components/header/header.tsx";
import FileUpload from "./components/file-upload/file-upload.tsx";
import Sidebar from "./components/sidebar/sidebar.tsx";
import {Button, Grid, GridItem, HStack, Text, Textarea, VStack,} from "@chakra-ui/react";
import {useAtom} from "jotai";
import {
  AppState,
  artists,
  assets,
  audioFile,
  colors,
  coverIdx,
  dummyAssetTypes,
  dummySocialMediaTypes,
  genres,
  lyrics,
  socialMediaTypes,
  stage,
  styles
} from "./lib/state.ts";
import ButtonGroup from "./components/button-group/button-group.tsx";
import CoverPreview from "./components/cover-preview/cover-preview.tsx";
import Selection from "./components/sidebar/selection.tsx";
import Api from "./lib/api.ts";

const api = new Api("localhost/");

function App() {
  const [appState, setAppState] = useAtom(stage);
  const [songLyrics, setSongLyrics] = useAtom(lyrics);
  const [selectedCover, setSelectedCover] = useAtom(coverIdx);
  const [fileToUpload, setFileToUpload] = useAtom(audioFile);
  const [selectedStyles, setSelectedStyles] = useAtom(styles);
  const [selectedGenres, setSelectedGenres] = useAtom(genres);
  const [selectedArtists, setSelectedArtists] = useAtom(artists);
  const [selectedColors, setSelectedColors] = useAtom(colors);

  const createCoversAndUpdate = () => {
    api.createCover(fileToUpload, songLyrics);
    setAppState(AppState.COVER);
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
          <Button onClick={createCoversAndUpdate}>Next</Button>
        </ButtonGroup>
      </>
    );
  }

  const recreateCovers = () => {
    let promptConfig = {
      artists: selectedArtists,
      styles: selectedStyles,
      genres: selectedGenres,
      colors: selectedColors
    };
    api.recreateCover(fileToUpload, songLyrics, promptConfig);
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
            <Button onClick={recreateCovers}>Re-generate</Button>
            {selectedCover !== -1 ? <Button onClick={e => setAppState(AppState.ASSETS)}>Next</Button> : null}
          </ButtonGroup>
        </VStack>
        <Sidebar />
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
      <Button>Restart</Button>
      <Button>Download</Button>
    </ButtonGroup>
  </>;
}

export default App;
