import {Text, VStack} from "@chakra-ui/react";
import ColorSelection from "./color-selection.tsx";
import StyleSelection from "./style-selection.tsx";

interface SidebarProps {

}

const Sidebar = ({ }: SidebarProps) => {
    return <VStack>
        <Text>Prompt Einstellungen</Text>
        <ColorSelection/>
        <StyleSelection/>
    </VStack>
}

export default Sidebar;