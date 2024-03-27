import { Box, Typography } from "@mui/material";
import "./styles.css";

const ImagePost = ({
  data: {
    caption,
    file: { url },
    stretched,
    withBackground,
    withBorder,
  },
}) => {
  if (!url) return null;
  return (
    <Box
      className={`image-post ${stretched && "image-post--stretched"} ${
        withBackground && "image-post--withBackground"
      } ${withBorder && "image-post--withBorder"}`}>
      <img className="image-post__img" src={url} alt={caption || "image"} />
      {caption && (
        <Typography variant="subtitle1" align="center" mt={2}>
          {caption}
        </Typography>
      )}
    </Box>
  );
};

export default ImagePost;
