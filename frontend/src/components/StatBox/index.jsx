import { Box, Paper, Typography, useTheme } from "@mui/material";
import { tokens } from "../../constants/theme";
import ProgressCircle from "../ProgressCircle";

const StatBox = ({
  title,
  subtitle,
  progress,
  increase,
  icon,
  height = "130px",
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Paper
      sx={{
        p: "20px",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        height,
      }}>
      <Box display="flex" flexDirection="column">
        <Box>
          {icon}
          <Typography variant="h4">{title}</Typography>
        </Box>
        <Typography variant="subtitle1" sx={{ color: colors.greenAccent }}>
          {subtitle}
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" gap="8px">
        <Box>
          <ProgressCircle progress={progress} />
        </Box>
        <Typography
          variant="subtitle1"
          fontStyle="italic"
          sx={{ color: colors.greenAccent }}>
          {increase}
        </Typography>
      </Box>
    </Paper>
  );
};

export default StatBox;
