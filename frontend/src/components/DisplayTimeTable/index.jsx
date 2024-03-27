import { Stack, Typography } from "@mui/material";
import React from "react";

const DisplayTimeTable = ({ time, date }) => {
  return (
    <Stack>
      <Typography variant="h6">{time}</Typography>
      <Typography variant="subtitle2">{date}</Typography>
    </Stack>
  );
};

export default DisplayTimeTable;
