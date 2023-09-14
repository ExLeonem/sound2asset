import { useState } from "react";
import {
  Box,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import TagCollection from "../tag-collection/tag-collection";
import { BsPlusLg } from "react-icons/bs";
import { useAtom } from "jotai";
import { colors as globalColors } from "../../lib/state";

interface ColorSelectionProps {}

const ColorSelection = ({}: ColorSelectionProps) => {
  const [color, setColor] = useState("#0000");
  const [colors, setColors] = useAtom(globalColors);

  const openColorDialog = () => {
    let element = document.getElementById("colorSelection");
    if (element) {
      element.click();
    }
  };

  const addColor = () => {
    setColors([...colors, color]);
  }

  const removeColor = () => {
    
  }


  return (
    <VStack alignItems="flex-start" border="2px solid black" p="32px 24px">
      <Text>Farben auswählen</Text>

      <HStack>
        <Stack position="relative">
          <InputGroup as={Box}>
            <InputLeftAddon children={<Text>HEX</Text>} />
            <Input
              type="text"
              value={color}
              placeholder={color}
              onClick={openColorDialog}
            />
          </InputGroup>

          <Input
            id="colorSelection"
            type="color"
            value={color}
            position="absolute"
            marginTop="12px"
            left="0"
            zIndex="-4"
            onChange={(e) => setColor(e.target.value)}
          />
        </Stack>
        <IconButton icon={<BsPlusLg />} aria-label="add color" onClick={addColor()}/>
      </HStack>

      {/* Colors selected */}
      <TagCollection>

      </TagCollection>
    </VStack>
  );
};

export default ColorSelection;
