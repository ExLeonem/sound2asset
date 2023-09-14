import { Badge } from "@chakra-ui/react";
import { useState } from "react";
import styles from "./tag.module.scss";

interface TagProps {
  children: string;
  active?: boolean;
  variant?: "solid" | "outline";
  onAdd?: () => void;
  onRemove?: () => void;
}

const Tag = ({ variant="solid", active, children, onAdd, onRemove }: TagProps) => {
  const [isActive, setIsActive] = useState(active || false);


  const toggleActive = () => {
    if (!isActive && onAdd) {
      onAdd();
    } else if (isActive && onRemove) {
      onRemove();
    }

    setIsActive(!isActive);
  };

  const classes = [styles.tag];
  if (isActive) {
    classes.push(styles.active);
  }

  return (
    <Badge className={classes.join(" ")} variant={variant} onClick={toggleActive}>
      {children}
    </Badge>
  );
};

export default Tag;
