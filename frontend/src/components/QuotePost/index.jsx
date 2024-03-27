import { Box, SvgIcon, Typography } from "@mui/material";
import parse from "html-react-parser";

const QuotePost = ({ data: { text, caption, alignment } }) => {
  return (
    <Box
      sx={{
        margin: "24px 0",
        padding: "24px 33px 24px 46px",
        backgroundColor: "rgba(56, 182, 255,0.1)",
        border: "unset",
        borderLeft: "3px solid rgba(56, 182, 255,1)",
      }}>
      <Box position="relative" mb="12px">
        <SvgIcon sx={{ position: "absolute", top: "-4px", left: "-24px" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="120"
            height="120"
            fill="currentColor"
            className="bi bi-quote"
            viewBox="0 0 16 16">
            <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z" />
          </svg>
        </SvgIcon>
        <Typography
          variant="body1"
          sx={{ fontStyle: "italic", fontSize: "20px" }}
          align={alignment}>
          {parse(text)}
        </Typography>
      </Box>
      <Typography variant="subtitle1" align="right">
        {caption}
      </Typography>
    </Box>
  );
};

export default QuotePost;
