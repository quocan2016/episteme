import { Box, CircularProgress } from "@mui/material";
import React from "react";

const LoadingPage = () => {
  return (
    <Box
      sx={{
        maxWidth: "200px",
        mx: "50px auto",
      }}>
      <CircularProgress />
    </Box>
  );
};

export default LoadingPage;
