import {Button, Card, CardBody, CardHeader, HStack, Text, VStack} from "@chakra-ui/react";
import Selection from './selection.tsx';
import { artists, genres, styles } from "../../lib/state.ts";
import ColorSelection from "./color-selection.tsx";
import {BiChevronRight} from "react-icons/bi";

const dummyStyles = [
    "Digital",
    "Graffiti",
    "Vintage",
    "Pen and Ink",
    "Fantasy",
    "Sci-Fi"
  ]

const dummyArtists = [
    "Maurice Sendak",
    "Dr. Seuss (Theodor Geisel)",
    "Norman Rockwell",
    "Yuko Shimizu",
    "Chris Ware",
    "Oliver Jeffers",
    "Quentin Blake",
    "Jim Lee",
    "Audrey Kawasaki",
  ];


const dummyGenres = [
  "Pop",
  "Rock",
  "Hip-Hop",
  "Jazz",
  "Classical",
  "Electronic",
  "R&B",
  "Country",
  "Reggae",
  "Blues",
  "Folk",
  "Metal",
  "Punk",
  "Soul",
  "Funk"
]

interface SidebarProps {}

const Sidebar = ({}: SidebarProps) => {

    return (
        <Card width="40%" height="90vh !important">
            <CardHeader>
                <HStack justifyContent="space-between">
                    <Text fontSize="2xl">Prompt Einstellungen</Text>
                    <Button>
                        <BiChevronRight/>
                    </Button>
                </HStack>
            </CardHeader>
            <CardBody p="0px" overflowY="scroll">
                <VStack width="100%">
                    <ColorSelection />
                    <Selection header="Artists" values={dummyArtists} atomToUse={artists}
                        searchable={true} />
                    <Selection header="Styles" values={dummyStyles} atomToUse={styles}
                        searchable={true} />
                    <Selection header="Genres" values={dummyGenres} atomToUse={genres}
                        searchable={true} />
                </VStack>
            </CardBody>
        </Card>
    );
};

export default Sidebar;
