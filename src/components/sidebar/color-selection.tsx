import { useState } from "react";
import {
  Box,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import TagCollection from "../tag-collection/tag-collection";
import { BsPlusLg } from "react-icons/bs";
import { useAtom } from "jotai";
import { colors as globalColors } from "../../lib/state";
import Color from "../color/color";

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
    console.log(color);
    setColors([...colors, color]);
  };

  const removeColor = (idx: number) => () => {
    let modifiedColors = [...colors];
    modifiedColors.splice(idx, 1);
    setColors(modifiedColors);
  };

  return (
    <VStack
      width="100%"
      alignItems="flex-start"
      border="2px solid black"
      p="32px 24px"
    >
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
              onChange={(e) => null}
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
        <IconButton
          icon={<BsPlusLg />}
          aria-label="add color"
          onClick={addColor}
        />
      </HStack>

      {/* Colors selected */}
      <TagCollection>
        {colors.map((color, idx) => (
          <Color key={`color-${color}`} onDelete={removeColor(idx)}>
            {color}
          </Color>
        ))}
      </TagCollection>
    </VStack>
  );
};

export default ColorSelection;
