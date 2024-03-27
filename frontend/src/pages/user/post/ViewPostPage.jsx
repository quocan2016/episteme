import React, { useCallback, useEffect, useState } from "react";
import { Box, Container, Grid, Typography, useMediaQuery } from "@mui/material";
import InfoAuthor from "../../../components/InfoAuthor";
import ActionPost from "../../../components/ActionPost";
import PostRender from "../../../components/PostRender";
import { getPostBySlug, incrementView } from "../../../services/postService";
import { useParams } from "react-router-dom";
import { addBookmark, removeBookmark } from "../../../services/bookmarkService";
import { useAuth } from "../../../context/auth-context";
import {
  addCommentPost,
  getCommentPost,
} from "../../../services/commentService";
import { toast } from "react-toastify";
import Comment from "../../../components/Comment";
import { STATUS_POST } from "../../../constants/status";
import ErrorPage from "./../error/ErrorPage";

const ViewPostPage = () => {
  const [post, setPost] = useState(null);
  const [notFound, setNotFound] = useState(true);
  const { slug } = useParams();
  const { user } = useAuth();
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  useEffect(() => {
    document.title = "Bài viết";
  });

  useEffect(() => {
    getPostBySlug(slug)
      .then((response) => {
        if (
          user?.id !== response?.data?.author.id &&
          user?.role !== "ADMIN" &&
          response?.data.status != STATUS_POST.PUBLISHED
        ) {
          setNotFound(true);
        } else {
          setPost(response?.data);
          setNotFound(false);
        }
      })
      .catch(() => {
        setNotFound(true);
      });
  }, [slug, user]);

  useEffect(() => {
    if (post && post?.id) {
      const historyPost = JSON.parse(
        sessionStorage.getItem("historyPost") || "[]"
      );
      if (!historyPost.includes(post.id)) {
        sessionStorage.setItem(
          "historyPost",
          JSON.stringify([...historyPost, post.id])
        );
        incrementView(post.id).then(() => {});
      }
    }
  }, [post]);

  if (notFound) return <ErrorPage />;

  return (
    <Container sx={{ mt: "50px", position: "relative" }}>
      <Box
        display="flex"
        maxWidth="700px"
        width="full"
        mx="auto"
        gap="30px"
        alignItems="start">
        {matches && (
          <ActionPost
            post={post}
            slug={slug}
            breakPoint="sm"
            display={{ sm: "flex", xs: "none" }}></ActionPost>
        )}
        <Box
          sx={{
            maxWidth: "650px",
            width: "100%",
            position: "relative",
          }}>
          <InfoAuthor
            author={post?.author}
            createAt={post?.createAt}
            amountView={post?.view}
            amountBookmark={post?.total_bookmark}
            amountComment={post?.total_comment}></InfoAuthor>
          <Typography variant="h2" mt="40px" mb="10px">
            {post?.title}
          </Typography>
          <Typography variant="caption">{post?.description}</Typography>
          <PostRender blocks={JSON.parse(post?.content || "[]")}></PostRender>
          <Box m="20px 0">
            <Comment post={post}></Comment>
          </Box>
        </Box>
      </Box>
      {!matches && (
        <ActionPost
          breakPoint="sm"
          post={post}
          slug={slug}
          display={{ sm: "none", xs: "flex" }}></ActionPost>
      )}
    </Container>
  );
};

export default ViewPostPage;
