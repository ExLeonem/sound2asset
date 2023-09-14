import {HStack} from "@chakra-ui/react";


interface TagCollection {
    children: undefined | JSX.Element | JSX.Element[];
}

const TagCollection = ({ children }) => {

  return <HStack >
      {children}
  </HStack>;
};

export default TagCollection;