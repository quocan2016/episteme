import { Box, Button, IconButton, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useTheme } from "@emotion/react";
import { tokens } from "../../constants/theme";
import { useAuth } from "../../context/auth-context";
import {
  addBookmark,
  getBookmarkForUser,
  removeBookmark,
} from "../../services/bookmarkService";
import { toast } from "react-toastify";

const ActionPost = ({ breakPoint = "md", display, slug, post }) => {
  const [url, setUrl] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [like, setLike] = useState(false);
  const [bookmark, setBookmark] = useState(null);
  const { user } = useAuth();

  const handleBookmark = async () => {
    if (user && post) {
      const data = {
        user: {
          id: user.id,
        },
        post: {
          id: post.id,
        },
      };
      if (bookmark?.id) {
        const response = await removeBookmark(bookmark.id);
        setBookmark(null);
      } else {
        const response = await addBookmark(data);
        setBookmark(response?.data);
      }
    } else {
      toast.warning("Vui lòng đăng nhập để lưu bài viết");
    }
  };

  useEffect(() => {
    if (user?.id && post?.id) {
      getBookmarkForUser(user.id, post.id)
        .then((response) => setBookmark(response.data))
        .catch(() => {});
    }
  }, [user, post]);

  useEffect(() => {
    setUrl(`${window.location.href}`);
  }, [slug]);

  return (
    <Stack
      sx={{
        width: {
          [breakPoint]: "40px",
          xs: "100%",
        },
        display,
        gap: "8px",
        zIndex: "9999",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: {
          [breakPoint]: "column",
          xs: "row",
        },
        position: {
          [breakPoint]: "sticky",
          xs: "fixed",
        },
        top: {
          [breakPoint]: "0",
          xs: "unset",
        },
        bottom: {
          [breakPoint]: "unset",
          xs: "0",
        },
        left: {
          [breakPoint]: "unset",
          xs: "0",
        },
        right: {
          [breakPoint]: "unset",
          xs: "0",
        },
        padding: {
          [breakPoint]: "120px 0",
          xs: "10px",
        },
        backgroundColor: {
          [breakPoint]: "unset",
          xs: colors.paper,
        },
        "& .react-share__ShareButton": {
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        "& .react-share__ShareButton:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.08)!important",
        },
      }}>
      <IconButton
        sx={{ width: "40px", height: "40px" }}
        onClick={() => setLike((prev) => !prev)}>
        {like ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
      </IconButton>
      <IconButton
        sx={{ width: "40px", height: "40px" }}
        onClick={handleBookmark}>
        {bookmark && bookmark?.id ? (
          <BookmarkOutlinedIcon />
        ) : (
          <BookmarkBorderOutlinedIcon />
        )}
      </IconButton>
      {url && (
        <>
          <FacebookShareButton
            url={url}
            style={{ width: "40px", height: "40px" }}>
            <FacebookOutlinedIcon />
          </FacebookShareButton>
          <TwitterShareButton
            url={url}
            style={{ width: "40px", height: "40px" }}>
            <TwitterIcon />
          </TwitterShareButton>
        </>
      )}
    </Stack>
  );
};

export default ActionPost;
