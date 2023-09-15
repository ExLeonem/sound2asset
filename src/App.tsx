import "./App.css";
import Header from "./components/header/header.tsx";
import FileUpload from "./components/file-upload/file-upload.tsx";
import Sidebar from "./components/sidebar/sidebar.tsx";
import {
    Button,
    Grid,
    GridItem,
    HStack,
    Spinner,
    Text,
    Textarea,
    useToast,
    VStack
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

    const [merch] = useAtom(assets);

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
                <Header main={"sound2assets"}>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed <br />{" "}
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
                    erat, sed diam voluptua.
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
                    <Header main={"Select a cover"}>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                    </Header>

                    {/* <IconButton position="absolute" right="32px" top="32px" icon={<FaChevronLeft/>} aria-label="open sidebar"/> */}
                    <HStack justifyContent="center" padding="32px 0px">
                        {requestIsLoading ? <Spinner /> : null}
                        {requestIsLoading ? null : <AlbumCoverPreview />}
                    </HStack>

                    <ButtonGroup>
                        <Button onClick={(e) => setAppState(AppState.LYRICS)}>Back</Button>
                        <Button onClick={recreateCovers}>Re-generate</Button>
                        {selectedCover !== -1 ? <Button
                            onClick={e => setAppState(AppState.ASSETS)}>Next</Button> : null}
                    </ButtonGroup>
                </VStack>
                <Sidebar />
            </HStack>
        );
    }
    let tshirts = null;
    if (merch.includes(dummyAssetTypes[1])) {
        tshirts =
            <HStack justifyContent="center" padding="32px 0px">
                <Grid
                    templateColumns="repeat(4, 1fr)"
                    gap={6}
                >
                    <GridItem>
                        <MerchPreview tshirtUrl={dummyTshirtUrls[0]}></MerchPreview>
                    </GridItem>
                    <GridItem>
                        <MerchPreview tshirtUrl={dummyTshirtUrls[0]}></MerchPreview>
                    </GridItem>
                    <GridItem>
                        <MerchPreview tshirtUrl={dummyTshirtUrls[0]}></MerchPreview>
                    </GridItem>
                    <GridItem>
                        <MerchPreview tshirtUrl={dummyTshirtUrls[0]}></MerchPreview>
                    </GridItem>
                </Grid>
            </HStack>
    }

    if (appState === AppState.ASSETS) {
        return <>
            <Header main="Welche Assets sollen erstellt werden?">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            </Header>

            <Selection values={dummyAssetTypes} atomToUse={assets} />
            {tshirts}
            <Header main="Social Media Posts">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            </Header>

            <Selection values={dummySocialMediaTypes} atomToUse={socialMediaTypes} />

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
