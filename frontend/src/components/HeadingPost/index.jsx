import { Typography } from "@mui/material";

const HeadingPost = ({ data: { text, level, alignment } }) => {
  if (!text) return null;
  return (
    <Typography variant={`h${level}`} sx={{ textAlign: alignment || "right" }}>
      {text}
    </Typography>
  );
};

export default HeadingPost;
