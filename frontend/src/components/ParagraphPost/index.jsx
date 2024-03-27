import { Typography } from "@mui/material";
import parse from "html-react-parser";

const ParagraphPost = ({ data: { text, alignment } }) => {
  if (!text) return <br></br>;
  return (
    <Typography variant="body1" sx={{ textAlign: alignment }}>
      {parse(text)}
    </Typography>
  );
};

export default ParagraphPost;
