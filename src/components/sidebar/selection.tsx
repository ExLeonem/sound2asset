import React, { useState } from "react";
import { VStack, Text } from "@chakra-ui/react";
import Search from "../search/search";
import TagCollection from "../tag-collection/tag-collection";
import Tag from "../tag/tag";
import { artists } from "../../lib/state";
import { useAtom } from "jotai";

interface SelectionProps {
  header: string;
  values?: string[];
  onRemove?: (idx: number) => () => void;
  onAdd?: (value: string) => () => void;
  atomToUse: any;
}

const Selection = ({ header, values, atomToUse }: SelectionProps) => {
  const [searchString, setSearchString] = useState("");
  const [availableValues, setAvailableValues] = useState<string[]>(
    values || []
  );
  const [selectedValues, setSelectedValues] = useAtom(artists);

  const filterAvailableValues = () => {
    if (searchString === "" || searchString === undefined) {
        return availableValues;
    }

    return availableValues
        .filter(value => value.toLowerCase().slice(0, searchString.length) === searchString.toLowerCase());
  }

  const addValue = (value: string) => () => {
    setSelectedValues([...selectedValues, value]);
  };

  const removeValue = (idx: number) => () => {
    let modifiedValues = [...selectedValues];
    modifiedValues.splice(idx, 1);
    setSelectedValues(modifiedValues);
  };

  return (
    <VStack width="100%" alignItems="flex-start" p="12px 24px">
      <Text>{header}</Text>
      <Search value={searchString} onChange={(e) => setSearchString(e.target.value)} />
      <TagCollection>
        {filterAvailableValues().map((value, idx) => {
          let isActive = selectedValues.includes(value);
          return (
            <Tag
              key={`tag-${value}`}
              active={isActive}
              onAdd={addValue(value)}
              onRemove={removeValue(idx)}
            >
              {value}
            </Tag>
          );
        })}
      </TagCollection>
    </VStack>
  );
};

export default Selection;
