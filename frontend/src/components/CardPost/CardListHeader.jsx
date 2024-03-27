/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
import { useMode } from "../../context/mode-context";
import { tokens } from "../../constants/theme";
import { Link } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const CardListHeader = ({ text, slug }) => {
   const {
      theme: { palette },
   } = useMode();
   const token = tokens(palette.mode);
   return (
      <Box
         style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
         }}
      >
         <Typography variant="h3" sx={{ marginBlockEnd: 3, fontWeight: 600 }}>
            {text}
         </Typography>
         <Typography
            variant="subtitle1"
            sx={{
               "&:hover": {
                  color: token.greenAccent,
               },
            }}
         >
            <Link
               to={slug}
               style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
               }}
            >
               Xem thêm <ChevronRightIcon />
            </Link>
         </Typography>
      </Box>
   );
};

export default CardListHeader;
