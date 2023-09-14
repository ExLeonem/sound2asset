import { Text, VStack } from "@chakra-ui/react";
import Search from "../search/search.tsx";
import TagCollection from "../tag-collection/tag-collection.tsx";
import Tag from "../tag/tag.tsx";

interface StyleSelectionProps {}

const StyleSelection = ({}: StyleSelectionProps) => {
  return (
    <VStack
      width="100%"
      alignItems="flex-start"
      border="2px solid black"
      p="32px 24px"
    >
      <Text>Style</Text>
      <Search />
      <TagCollection>
        <Tag>Test</Tag>
        <Tag>Another Tag</Tag>
      </TagCollection>
    </VStack>
  );
};

export default StyleSelection;
