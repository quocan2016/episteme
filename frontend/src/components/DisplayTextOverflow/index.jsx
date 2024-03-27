import { Tooltip, Typography } from "@mui/material";
import React from "react";

const DisplayTextOverflow = ({ text, width, style = {} }) => {
  return (
    <Tooltip title={text}>
      <Typography
        sx={{
          width: width,
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          ...style,
        }}>
        {text}
      </Typography>
    </Tooltip>
  );
};

export default DisplayTextOverflow;
