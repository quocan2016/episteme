import { Box } from "@mui/material";
import renderBlock from "./renderBlock";

const PostRender = ({ blocks }) => {
  return (
    <Box
      sx={{
        maxWidth: "650px",
        width: "100%",
        margin: "20px auto",
      }}>
      {blocks.map((block, index) => {
        const blockRender = renderBlock(block);
        if (!blockRender) return null;
        return (
          <Box key={index} sx={{ padding: "20px 0" }}>
            {blockRender}
          </Box>
        );
      })}
    </Box>
  );
};

export default PostRender;
