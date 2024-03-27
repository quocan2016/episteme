import { Box } from "@mui/material";
import { useTheme } from "@mui/material";
import { tokens } from "../../constants/theme";
const ProgressCircle = ({ progress = "0.70", size = "40" }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const angle = progress * 360;
  return (
    <Box
      sx={{
        background: `radial-gradient(${colors.paper} 55%, transparent 56%),
                conic-gradient(transparent 0deg ${angle}deg, ${colors.greyAccent} ${angle}deg 360deg),
                ${colors.greenAccent}`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export default ProgressCircle;
