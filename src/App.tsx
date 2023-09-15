import "./App.css";
import Header from "./components/header/header.tsx";
import FileUpload from "./components/file-upload/file-upload.tsx";
import Sidebar from "./components/sidebar/sidebar.tsx";
import {Button, Grid, GridItem, HStack, Text, Textarea, useToast, VStack} from "@chakra-ui/react";
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
  styles,
  dummyTshirtUrls
} from "./lib/state.ts";
import ButtonGroup from "./components/button-group/button-group.tsx";
import CoverPreview from "./components/cover-preview/cover-preview.tsx";
import Selection from "./components/sidebar/selection.tsx";
import MerchPreview from "./components/merch-preview/merch-preview";
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
  const [merch] = useAtom(assets);

  const createCoversAndUpdate = () => {
    api.createCover(fileToUpload, songLyrics);
    setAppState(AppState.COVER);
  }

  const toast = useToast();

  if (appState === AppState.LYRICS) {
    return (
      <>
        <Header main={"Sound2assets"}>
          Das beste Tool der Welt, um dir ganz unkompliziert Merch zu deinem neusten Song zu generieren!
          Damit die KI Material hat um dir zu helfen, lade deinen Song hoch und gib die Lyrics zu deinem Song ein.
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
          <Header main={"Wähle ein Cover"}>
            Hier sind einige von KI erstellte Cover, die zu deinem Lied passen könnten.
          </Header>

          {/* <IconButton position="absolute" right="32px" top="32px" icon={<FaChevronLeft/>} aria-label="open sidebar"/> */}

            <HStack justifyContent="center" padding="32px 0px">
              <Grid
                  templateColumns="repeat(2, 1fr)"
                  templateRows="repeat(2, 1fr)"
                  gap={6}
              >
                <GridItem>
                  <CoverPreview idx={0} url={"https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*"}/>
                </GridItem>
                <GridItem>
                  <CoverPreview idx={1} url={""}/>
                </GridItem>
                <GridItem>
                  <CoverPreview idx={2} url={""}/>
                </GridItem>
                <GridItem>
                  <CoverPreview idx={3} url={""}/>
                </GridItem>
              </Grid>
            </HStack>

          <ButtonGroup>
            <Button onClick={(e) => setAppState(AppState.LYRICS)}>Back</Button>
            <Button onClick={recreateCovers}>Neu erstellen</Button>
            {selectedCover !== -1 ? <Button onClick={e => setAppState(AppState.ASSETS)}>Next</Button> : null}
          </ButtonGroup>
        </VStack>
        <Sidebar />
      </HStack>
    );
  }

  let tshirts = null;
  if (merch.includes(dummyAssetTypes[1])) {
    tshirts =
        <div>
          <HStack justifyContent="center" padding="32px 0px">
            <Grid
                templateColumns="repeat(4, 1fr)"
                gap={6}
            >
              <GridItem>
                <MerchPreview tshirtUrl={dummyTshirtUrls[0]}></MerchPreview>
              </GridItem>
              <GridItem>
                <MerchPreview tshirtUrl={dummyTshirtUrls[1]}></MerchPreview>
              </GridItem>
              <GridItem>
                <MerchPreview tshirtUrl={dummyTshirtUrls[2]}></MerchPreview>
              </GridItem>
              <GridItem>
                <MerchPreview tshirtUrl={dummyTshirtUrls[3]}></MerchPreview>
              </GridItem>
            </Grid>
          </HStack>
          <div align="right">
            <Button onClick={(e) => toast({
              title: 'Bestellung',
              description: "Die T-shirts wurden für dich bestellt. ",
              status: 'success',
              duration: 9000,
              isClosable: true,
            })}>Bestellen</Button>
          </div>
        </div>

  }

  if (appState === AppState.ASSETS) {
    return <>
      <Header main="Poster, Merch & Co">
      Welche Assets sollen erstellt werden?
      </Header>

      <Selection values={dummyAssetTypes} atomToUse={assets}/>
      {tshirts}
      <Header main="Social Media Posts">
        Welche Social Media Posts möchtest du dir generieren lassen?
      </Header>

      <Selection values={dummySocialMediaTypes} atomToUse={socialMediaTypes}/>
      <div align="right">
        <ButtonGroup>
          <Button onClick={(e) => setAppState(AppState.COVER)}>Zurück</Button>
          <Button align="right" onClick={(e) => toast({
            title: 'Daten heruntergeladen',
            description: "Der Merchandise wurde für dich heruntergeladen",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })}>Herunterladen</Button>
        </ButtonGroup>
      </div>

    </>
  }
}

export default App;
