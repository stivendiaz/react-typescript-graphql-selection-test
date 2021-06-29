import { FC } from "react";
import { Button } from "@material-ui/core";
import { ArrowDownward } from "@material-ui/icons";

interface ISortByArrowProps {
  handleOnClick: any;
  title: string;
  isActive: any;
}

const SortByArrow: FC<ISortByArrowProps> = ({
  handleOnClick,
  title,
  isActive,
}) => (
  <Button onClick={handleOnClick} variant="text" color="inherit">
    {title}
    <ArrowDownward
      sx={{
        width: 20,
        cursor: "pointer",
        transform: isActive && "rotate(180deg)",
        transition: "all 0.3s ease",
      }}
    />
  </Button>
);
export default SortByArrow;
