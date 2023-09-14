import {Text, VStack} from "@chakra-ui/react";
import Search from "../search/search.tsx";
import TagCollection from "../tag-collection/tag-collection.tsx";
import Tag from "../tag/tag.tsx";


interface StyleSelectionProps {

}

const StyleSelection = ({ }: StyleSelectionProps) => {

    return <VStack alignItems="flex-start">
        <Text>Style</Text>
        <Search/>
        <TagCollection>
            <Tag>Test</Tag>
            <Tag>Another Tag</Tag>
        </TagCollection>
    </VStack>
}

export default StyleSelection;