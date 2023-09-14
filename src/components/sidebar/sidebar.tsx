import { Card, CardBody, CardHeader, Text, VStack } from "@chakra-ui/react";
import ColorSelection from "./color-selection.tsx";
import StyleSelection from "./style-selection.tsx";

interface SidebarProps {}

const Sidebar = ({}: SidebarProps) => {
  return (
    <Card>
      <CardHeader>
        <Text fontSize="2xl">Prompt Einstellungen</Text>
      </CardHeader>
      <CardBody p="0px">
        <VStack width="100%" border="2px solid black">
          <ColorSelection />
          <StyleSelection />
        </VStack>
      </CardBody>
    </Card>
  );
};

export default Sidebar;
