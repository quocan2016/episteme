/* eslint-disable react/prop-types */
import { CardMedia } from "@mui/material";
import { DEFAULT_IMAGE } from "../../constants/default";

const CardPoster = ({ posterPath, width = "100%", height = "140px" }) => {
   return (
      <CardMedia
         component="img"
         alt="image"
         width={width}
         height={height}
         image={posterPath || DEFAULT_IMAGE.POST}
      />
   );
};

export default CardPoster;
