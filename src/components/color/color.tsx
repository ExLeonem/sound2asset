import React from "react";
import { Avatar, Box, HStack, Text } from "@chakra-ui/react";
import styles from "./color.module.scss";
import { GrClose } from 'react-icons/gr';

interface ColorProps {
  children: string;
  onDelete?: () => void;
}

const Color = ({ onDelete, children }: ColorProps) => {
  return (
    <HStack gap={1} className={styles.color} onClick={onDelete}>
      <Box className={styles.colorBuble} backgroundColor={children}>
        <Box className={styles.removeColorIcon}>
            <GrClose size={12}/>
        </Box>
      </Box>
      <Text> {children.slice(1, children.length)}</Text>
    </HStack>
  );
};

export default Color;
