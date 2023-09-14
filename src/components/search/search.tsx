import {
  AspectRatio,
  FormControl,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  VStack,
} from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { useState } from "react";
import { BsSearch, BsPlusLg } from "react-icons/bs";

interface SearchProps {
  value?: string;
  onChange?: (e: any) => void
}

const Search = ({ value, onChange }: SearchProps) => {

  return (
    <VStack>
      <InputGroup>
        <InputLeftAddon>
          <BsSearch />
        </InputLeftAddon>
        <Input placeholder="Search..." value={value} onChange={onChange}/>
      </InputGroup>
    </VStack>
  );
};

export default Search;
