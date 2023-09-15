import { Card, CardBody, CardHeader, Text, VStack } from "@chakra-ui/react";
import Selection from './selection.tsx';
import { artists, genres, styles } from "../../lib/state.ts";
import ColorSelection from "./color-selection.tsx";
import sidebarStyles from './sidebar.module.scss'

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
    <Card width="30%" className={sidebarStyles.Sidebar}>
      <CardHeader>
        <Text fontSize="2xl">Prompt Einstellungen</Text>
      </CardHeader>
      <CardBody p="0px">
        <VStack width="100%">
          <ColorSelection/>
          <Selection header="Artists" values={dummyArtists} atomToUse={artists} searchable={true}/>
          <Selection header="Styles" values={dummyStyles} atomToUse={styles} searchable={true}/>
          <Selection header="Genres" values={dummyGenres} atomToUse={genres} searchable={true}/>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default Sidebar;
