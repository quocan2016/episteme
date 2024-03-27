/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
import { formatDate } from "../../utils/DateUtil";

const CardFooter = ({ info }) => {
   if (!info) return null;
   return (
      <Box className="card__footer">
         <Typography variant="h5">{formatDate(info?.createAt)}</Typography>
         <Typography className="dot" />
         <Typography
            variant="h6"
            sx={{
               flex: 1,
               display: "-webkit-box",
               webkitLineClamp: 1,
               webkitBoxOrient: "vertical",
               overflow: "hidden",
               textOverflow: "ellipsis",
            }}
         >
            {info?.author?.fullname || ""}
         </Typography>
      </Box>
   );
};

export default CardFooter;
