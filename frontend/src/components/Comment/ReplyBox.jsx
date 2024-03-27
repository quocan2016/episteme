import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import InputComment from "./InputComment";
import { useEffect, useState } from "react";
import CommentBox from "./CommentBox";
import { getAuthor } from "../../services/authorService";
import {
  addCommentReplyPost,
  deleteComment,
} from "../../services/commentService";
import { toast } from "react-toastify";
import ReplyBoxSub from "./ReplyBoxSub";
import { useAuth } from "../../context/auth-context";
import Swal from "sweetalert2";

const ReplyBox = ({ comment, postId, onDelete }) => {
  const { id, content, userId, createAt, comments } = comment;
  const [openReplyInput, setOpenReplyInput] = useState(false);
  const [userComment, setUserComment] = useState();
  const [listSubCmtReply, setListSubCmtReply] = useState(comments || []);
  const { user } = useAuth();

  useEffect(() => {
    getAuthor(userId).then((response) => setUserComment(response.data));
  }, [userId]);

  const handleCommentPost = (value) => {
    addCommentReplyPost(postId, id, {
      content: value,
      userId,
    })
      .then((response) => {
        toast.success("Thêm bình luận thành công");
        setListSubCmtReply((prev) => [...prev, response.data]);
        handleCloseReplyInput();
      })
      .catch(() => toast.error("Thêm bình luận thất bại"));
  };

  const handleCloseReplyInput = () => {
    setOpenReplyInput(false);
  };

  const handleReplyClick = () => {
    if (user?.id) {
      setOpenReplyInput(true);
    } else {
      toast.warning("Vui lòng đăng nhập để bình luận");
    }
  };

  const handleDeleteCmt = (idCmtSub) => {
    Swal.fire({
      title: `Bạn có chắc muốn xóa bình luận này?`,
      text: "Khi xóa không thể hoàn tác lại!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteComment(idCmtSub)
          .then((response) => {
            setListSubCmtReply((prev) =>
              prev.filter((cmtItem) => cmtItem.id !== idCmtSub)
            );
            toast.success("Xóa bình luận thành công");
          })
          .catch(() => toast.error("Xóa bình luận thất bại"));
      }
    });
  };

  return (
    <div className="reply-box__container">
      <div className="reply__info">
        <Avatar className="reply-info__avatar" src={userComment?.image} />
        <div className="reply-info__bottom">
          <Typography
            className="reply-info__username"
            variant="h6"
            component="span"
            fontWeight={400}>
            {userComment?.fullname}
          </Typography>
        </div>
      </div>
      <div className="reply-content__container">
        <InputComment
          className="reply__content"
          defaultValue={content}
          inputProps={{
            readOnly: true,
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}>
          <Box>
            <Button variant="text" onClick={handleReplyClick}>
              Trả lời
            </Button>
            {user?.id === userId && (
              <Button variant="text" onClick={onDelete}>
                Xóa
              </Button>
            )}
          </Box>
          <Typography
            className="reply-info__create-date"
            variant="subtitle2"
            component="span">
            {createAt}
          </Typography>
        </Box>
        <Stack spacing={2}>
          {listSubCmtReply &&
            listSubCmtReply.length > 0 &&
            listSubCmtReply.map((item) => (
              <ReplyBoxSub
                key={item.id}
                comment={item}
                onDelete={() => handleDeleteCmt(item.id)}></ReplyBoxSub>
            ))}
        </Stack>
        {openReplyInput && (
          <CommentBox
            type="reply"
            onClose={handleCloseReplyInput}
            handleCommentPost={handleCommentPost}
          />
        )}
      </div>
    </div>
  );
};

export default ReplyBox;
