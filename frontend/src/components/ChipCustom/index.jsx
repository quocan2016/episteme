import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";

const ChipCustom = ({ type = "success", label }) => {
  const typeColor = {
    success: {
      background: "#E9F8E9",
      text: "#65B75F",
    },
    error: {
      background: "#FEEAE4",
      text: "#F25D33",
    },
    warning: {
      background: "#fff1db",
      text: "#cd8e3b",
    },
    disable: {
      background: "#ccc",
      text: "#666",
    },
    admin: {
      background: "#F2EBF7",
      text: "#A77ACB",
    },
    user: {
      background: "#eaf1f1",
      text: "#5a4e4b",
    },
  };

  return (
    <Box
      sx={{
        p: "4px 16px",
        backgroundColor: typeColor[type].background,
        borderRadius: "50px",
        boxShadow: `0 0 1px ${typeColor[type].text}`,
      }}>
      <Typography fontWeight={500} color={typeColor[type].text}>
        {label}
      </Typography>
    </Box>
  );
};

// ChipCustom.propTypes = {
//   type: PropTypes.objectOf(["success", "warning", "error", "admin", "user"]),
//   label: PropTypes.string.isRequired,
//   key: PropTypes.any.isRequired,
// };

export default ChipCustom;
