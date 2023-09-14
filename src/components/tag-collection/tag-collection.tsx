import {HStack} from "@chakra-ui/react";


interface TagCollectionProps {
    children: undefined | JSX.Element | JSX.Element[];
}

const TagCollection = ({ children }: TagCollectionProps) => {

  return <HStack wrap="wrap">
      {children}
  </HStack>;
};

export default TagCollection;