import { Box, Chip, Typography } from "@mui/material";

const PostCategoryStat = ({ categories }) => {
   return (
      <Box component="div">
         <Typography variant="h5" marginBottom={2}>
            Các danh mục liên quan
         </Typography>
         <Box
            component="div"
            sx={{
               display: "flex",
               alignItems: "center",
               flexWrap: "wrap",
               gap: 1,
            }}
         >
            {categories &&
               categories.length > 0 &&
               categories.map((item, index) => {
                  return (
                     <Chip
                        label={item.name}
                        key={index}
                        sx={{
                           cursor: "pointer",
                           height: "fit-content",
                           "& .MuiChip-root span.MuiChip-label": {
                              padding: "2px 8px",
                           },
                        }}
                     />
                  );
               })}
         </Box>
      </Box>
   );
};

export default PostCategoryStat;
