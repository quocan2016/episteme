/* eslint-disable react/prop-types */
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import CardPost from "./CardPost";
import { getPostsByType } from "../../services/postService";

const CardList = ({
  type = "",
  direction = "vertical",
  containerAttributes = {},
  pageNumber = 0,
  pageSize = 4,
  sortBy = "title",
  sortDir = "asc",
}) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPostsByType({ type, pageNumber, pageSize, sortBy, sortDir })
      .then((response) => {
        if (response?.code === 200) setPosts([...response.data.content]);
      })
      .catch((error) =>
        console.log("🚀 ~ file: CardList.jsx:24 ~ error:", error)
      );
  }, [type]);

  return (
    <Grid container spacing={3} {...containerAttributes}>
      {posts &&
        posts.length > 0 &&
        posts.map((post) => {
          const postDirection =
            direction === "vertical"
              ? {
                  md: 3,
                  sm: 6,
                  xs: 12,
                }
              : { xs: 12 };

          return (
            <Grid item {...postDirection} key={post.id}>
              <CardPost postInfo={post} direction={direction} />
            </Grid>
          );
        })}
    </Grid>
  );
};

export default CardList;
