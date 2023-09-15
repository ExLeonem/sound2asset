import React, { useState } from "react";
import { VStack, Text } from "@chakra-ui/react";
import Search from "../search/search";
import TagCollection from "../tag-collection/tag-collection";
import Tag from "../tag/tag";
import { artists } from "../../lib/state";
import { useAtom } from "jotai";

interface SelectionProps {
  header?: string;
  atomToUse: any;
  values?: string[];
  onRemove?: (idx: number) => () => void;
  onAdd?: (value: string) => () => void;
  searchable?: boolean;
}

const Selection = ({ header, values, atomToUse, searchable }: SelectionProps) => {
  const [searchString, setSearchString] = useState("");
  const [availableValues, setAvailableValues] = useState<string[]>(
    values || []
  );
  const [selectedValues, setSelectedValues] = useAtom(atomToUse);

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
      {searchable? <Search value={searchString} onChange={(e) => setSearchString(e.target.value)} /> : null}
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
      {filterAvailableValues().length === 0 ? <Text>There are no elements named '{searchString}'</Text> : null}
    </VStack>
  );
};

export default Selection;
