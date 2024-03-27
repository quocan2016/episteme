import {
  Avatar,
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CommentIcon from "@mui/icons-material/Comment";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Link } from "react-router-dom";
import { tokens } from "../../constants/theme";
import { useAuth } from "../../context/auth-context";
import { checkFollow, follow, unfollow } from "../../services/followService";
import { toast } from "react-toastify";

const InfoAuthor = ({
  author,
  createAt,
  amountView,
  amountBookmark,
  amountComment,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useAuth();
  const [followed, setFollowed] = useState(false);

  const handleFollowAuthor = () => {
    if (user?.id) {
      if (followed) {
        unfollow({
          followerUserId: user?.id,
          followingUserId: author?.id,
        }).then(() => setFollowed(false));
      } else {
        follow({
          followerUserId: user?.id,
          followingUserId: author?.id,
        }).then(() => setFollowed(true));
      }
    } else {
      toast.warning("Vui lòng đăng nhập để theo dõi tác giả");
    }
  };

  useEffect(() => {
    if (user?.id) {
      checkFollow({
        followerUserId: user?.id,
        followingUserId: author?.id,
      }).then((response) => setFollowed(response?.data));
    }
  }, [user]);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
      gap="8px">
      <Box display="flex" alignItems="center" gap="12px">
        <Avatar src={author?.image} />
        <Box display="flex" flexDirection="column">
          <Box display="flex" alignItems="center" gap="12px">
            <Link
              to={`/profile/${author?.id == user?.id ? "me" : author?.id}`}
              style={{ color: colors.text }}>
              {author?.fullname}
            </Link>
            {author?.id !== user?.id && (
              <Button onClick={handleFollowAuthor} sx={{ mb: "auto" }}>
                {followed ? "Đang theo dõi" : "Theo dõi"}
              </Button>
            )}
          </Box>
          <Typography variant="subtitle2">Ngày tạo {createAt}</Typography>
        </Box>
      </Box>
      <Box display="flex" gap="12px" ml="auto">
        <Box display="flex" gap="4px" alignItems="center">
          <VisibilityIcon />
          <Typography>{amountView}</Typography>
        </Box>
        <Box display="flex" gap="4px" alignItems="center">
          <CommentIcon />
          <Typography>{amountComment}</Typography>
        </Box>
        <Box display="flex" gap="4px" alignItems="center">
          <BookmarkIcon />
          <Typography>{amountBookmark}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default InfoAuthor;
