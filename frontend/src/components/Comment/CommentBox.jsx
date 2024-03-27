import { Avatar, Box, Button, TextField } from "@mui/material";
import "./style.css";
import InputComment from "./InputComment";
import { useState } from "react";
import { addCommentPost } from "../../services/commentService";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth-context";

const CommentBox = ({ type = "comment", handleCommentPost, onClose }) => {
  const [value, setValue] = useState("");
  const { user } = useAuth();

  return (
    <Box className="comment-box__container">
      <Box className="comment-box__form-group">
        {type === "comment" && (
          <Avatar className="form-group__avatar" src={user?.image} />
        )}
        <TextField
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="form-group__input-container"
          maxRows={3}
          multiline
          fullWidth
          InputProps={{ className: "form-group__input" }}
          placeholder="Nhận xét..."
          variant="standard"
        />
      </Box>
      <div className="comment-box__buttons">
        <Button
          type="submit"
          variant="contained"
          onClick={() => {
            if (user?.id) {
              handleCommentPost(value);
              setValue("");
            } else {
              toast.warning("Vui lòng đăng nhập để bình luận");
            }
          }}
          disabled={!value}>
          Bình luận
        </Button>
        <Button variant="outlined" onClick={onClose}>
          Hủy
        </Button>
      </div>
    </Box>
  );
};

export default CommentBox;
