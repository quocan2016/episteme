import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { tokens } from "../../constants/theme";

const HeaderAdmin = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box mb="30px">
      <Typography variant="h2" fontWeight="bold" mb="5px">
        {title}
      </Typography>
      <Typography variant="h5" color={colors.greenAccent}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default HeaderAdmin;
