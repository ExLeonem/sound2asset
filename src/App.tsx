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
Spinner,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import {useAtom} from "jotai";
import {
    albumCoverUrls,
    AppState,
    artists,
    assets,
    audioFile,
    colors,
    coverIdx,
    dummyAssetTypes,
    dummySocialMediaTypes,
    dummyTshirtUrls,
    genres,
    lyrics,
    socialMediaTypes,
    stage,
    styles
} from "./lib/state.ts";
import ButtonGroup from "./components/button-group/button-group.tsx";
import CoverPreview from "./components/cover-preview/cover-preview.tsx";
import Selection from "./components/sidebar/selection.tsx";
import MerchPreview from "./components/merch-preview/merch-preview";
import Api from "./lib/api.ts";
import {useState} from "react";

const api = new Api("https://39ad-217-24-207-26.ngrok-free.app");

function App() {
  const [requestIsLoading, setRequestIsLoading] = useState(false);
  const [appState, setAppState] = useAtom(stage);
  const [songLyrics, setSongLyrics] = useAtom(lyrics);
  const [selectedCover, setSelectedCover] = useAtom(coverIdx);
  const [fileToUpload, setFileToUpload] = useAtom(audioFile);
  const [selectedStyles, setSelectedStyles] = useAtom(styles);
  const [selectedGenres, setSelectedGenres] = useAtom(genres);
  const [selectedArtists, setSelectedArtists] = useAtom(artists);
  const [selectedColors, setSelectedColors] = useAtom(colors);
  const [loadedCoverUrls, setLoadedCoverUrls] = useAtom(albumCoverUrls)
  const toast = useToast();
  const { isOpen, onToggle } = useDisclosure()
  const [merch] = useAtom(assets);

  const sliderStyles = {
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

  const createCoversAndUpdate = () => {
    setRequestIsLoading(true);
    api.createCover(fileToUpload, songLyrics)
        .then((res) => res.json().then(result => {
          console.log("Got json");
          setLoadedCoverUrls(result);
          setAppState(AppState.COVER)
          setRequestIsLoading(false);
        }))
        .catch(err => {
          toast({
            title: "A wild error appeared.",
            description: "Please check the logs.",
            status: "error",
            position: "top-right",
            duration: 9000,
            isClosable: true
          });
          setRequestIsLoading(false);
        })
  }
  const displayLogo =  <img style={{width: 50 + 'px', borderRadius: 20 + '%'}} src="https://ideogram.ai/api/images/direct/jW2V5BFJShSYaf3Ed0l2Lw"></img>

  if (appState === AppState.LYRICS) {

    let form = null;
    if (!requestIsLoading) {
      form = <>
        <FileUpload />
        <Textarea
            placeholder="Lyrics eingeben..."
            value={songLyrics}
            onChange={(e) => setSongLyrics(e.target.value)}
        />
      </>;
    }

    return (
      <>
        <div align='center'>{displayLogo}</div>
        <Header main={"Sound2Assets"}>
          Verwandle deine Melodien in trendige Artikel!
          Unser hochmodernes KI-Tool gestaltet einzigartige Merchandise-Artikel, inspiriert von deinen Lieblingsliedtexten und der Audiodatei.

          Damit wird deine musikalische Leidenschaft auf ganz neue Art tragbar und teilbar.
        </Header>

        <VStack alignItems={requestIsLoading ? "center": "flex-start"} marginTop="32px" gap={4}>
          {requestIsLoading ? <Spinner /> : null}
          {form}
        </VStack>

        <ButtonGroup>
          <Button onClick={createCoversAndUpdate}>Next</Button>
        </ButtonGroup>
      </>
    );
  }

    console.log(loadedCoverUrls);

    const recreateCovers = () => {
        let promptConfig = {
            artists: selectedArtists,
            styles: selectedStyles,
            genres: selectedGenres,
            colors: selectedColors
        };
        setRequestIsLoading(true);
        api.recreateCover(fileToUpload, songLyrics, promptConfig)
            .then((res) => res.json().then(result => {
                console.log("Got json");
                setLoadedCoverUrls(result);
                setAppState(AppState.COVER)
                setRequestIsLoading(false);
            }))
            .catch(err => {
                console.log(err)
                toast({
                    title: "A wild error appeared.",
                    description: "Please check the logs.",
                    status: "error",
                    position: "top-right",
                    duration: 9000,
                    isClosable: true
                })
                setRequestIsLoading(false);
            })
    }

  if (appState === AppState.COVER) {
    const AlbumCoverPreview = () => {
      return (
          <Grid
              templateColumns="repeat(2, 1fr)"
              templateRows="repeat(2, 1fr)"
              gap={6}
              zIndex={5}
          >
            {loadedCoverUrls.imageUrls.map((url, idx) => <GridItem>
              <CoverPreview key={`cover-preview-${idx}`} idx={idx} url={url} />
            </GridItem>)}
          </Grid>
      )
    }

    return (
      <HStack alignItems="flex-start" justifyContent="space-between">
        <VStack>
          {displayLogo}
          <HStack>
            <Header main={"Wähle ein Cover"}>
              Hier sind einige von KI erstellte Cover, die zu deinem Lied passen könnten.

            </Header>
            <Button style={sliderStyles.sidebarButton} onClick={onToggle}>
              {!isOpen ? <BsChevronDoubleLeft/> : <BsChevronDoubleRight/>}
            </Button>
          </HStack>

          {/* <IconButton position="absolute" right="32px" top="32px" icon={<FaChevronLeft/>} aria-label="open sidebar"/> */}
          <HStack justifyContent="center" padding="32px 0px">
              {requestIsLoading ? <Spinner /> : null}
              {requestIsLoading ? null : <AlbumCoverPreview />}
          </HStack>

          <ButtonGroup >
            <Button zIndex={10} onClick={(e) => setAppState(AppState.LYRICS)}>Zurück</Button>
            <Button zIndex={10} onClick={recreateCovers}>Neu erstellen</Button>
            {selectedCover !== -1 ? <Button zIndex={10} onClick={e => setAppState(AppState.ASSETS)}>Next</Button> : null}
          </ButtonGroup>
        </VStack>
        <div style={sliderStyles.container}>

          <Slide in={isOpen} style={{ zIndex: 3 }}>
            <Sidebar/>
          </Slide>
        </div>
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
      <VStack>
        {displayLogo}
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
      </VStack>
    </>
  }
}

export default App;
