import {Input, InputGroup, InputLeftAddon, VStack} from "@chakra-ui/react";
import {useState} from "react";

interface SearhProps {
    collection?: string[];
}

const Search = ({ collection }: SearhProps) => {
    const [searchString, setSearchString] = useState("");

    const filterCollection = (searchString: string) => {
        let searchLength = searchString.length;
        return collection?.map(item => item.slice(0, searchLength)).filter(item => item === searchString)
    }

    return (
      <VStack>
          <InputGroup>
              <InputLeftAddon></InputLeftAddon>
              <Input
                  placeholder={"Search..."}
                  value={searchString}
                  onChange={(e) => setSearchString(e.target.value)}
              />
          </InputGroup>

      </VStack>
    );
}

export default Search;