import { useTheme } from "@emotion/react";
import { Avatar, Badge, Box, Typography, styled } from "@mui/material";
import React from "react";
import { tokens } from "../../constants/theme";

const StyledBadge = styled(Badge)(({ theme, online }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: online ? "#44b700" : "#f44336",
    color: online ? "#44b700" : "#f44336",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      // animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

{
  /* <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
        online={online}>
        <Avatar alt={name} src={avatar} />
      </StyledBadge> */
}

const InfoUserTable = ({ avatar, title, subtitle, online = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box display="flex" gap="8px" alignItems="center">
      <Avatar alt={name} src={avatar} />
      <Box>
        <Typography variant="h6" color={colors.text}>
          {title}
        </Typography>
        <Typography variant="subtitle2">{subtitle}</Typography>
      </Box>
    </Box>
  );
};

export default InfoUserTable;
