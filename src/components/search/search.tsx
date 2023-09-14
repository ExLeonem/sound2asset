import {
  Input,
  InputGroup,
  InputLeftAddon,
  VStack,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";

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
