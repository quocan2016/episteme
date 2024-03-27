/* eslint-disable react/prop-types */
import { Box, Button } from "@mui/material";
import { tokens } from "../../constants/theme";
import { useMode } from "../../context/mode-context";
import CardList from "./CardList";
import { useState } from "react";

const headerBtnsEx = [
   {
      heading: "Dành cho bạn",
      slug: "",
   },
   {
      heading: "Theo tác giả",
      slug: "listByAuthor",
   },
   {
      heading: "Mới nhất",
      slug: "/newestBLogs",
   },
   {
      heading: "Sôi nổi",
      slug: "popularPosts",
   },
   {
      heading: "Đánh giá cao nhất",
      slug: "highestRateBlogs",
   },
];

const CustomCardListDirection = ({
   headerBtns = headerBtnsEx,
   cardDirection = "vertical",
}) => {
   const [slug, setSlug] = useState("");
   return (
      <>
         <Box
            sx={{
               mb: 3,
            }}
         >
            {headerBtns &&
               headerBtns.length > 0 &&
               headerBtns.map((heading) => {
                  return (
                     <MyHeaderButton
                        key={heading.slug}
                        text={heading.heading}
                        to={heading.slug}
                        onClick={() => {
                           setSlug(heading.slug);
                        }}
                     />
                  );
               })}
         </Box>
         <CardList direction={cardDirection} type={slug} />
      </>
   );
};

const MyHeaderButton = ({ text, onClick = () => {} }) => {
   const { theme } = useMode();
   const token = tokens(theme.palette.mode);

   return (
      <Button
         variant="outlined"
         component="span"
         sx={{
            borderColor: "transparent",
            borderBottomColor: "currentColor",
            color: token.text,
         }}
         onClick={onClick}
      >
         {text}
      </Button>
   );
};

export default CustomCardListDirection;
