import {Badge} from "@chakra-ui/react";

interface TagProps {
    children: string;
    variant?: "solid" | "outline"
}

const Tag = ({ variant, children }: TagProps) => {

    return <Badge variant={variant} padding="12px 24px">
        {children}
    </Badge>
}

export default Tag;