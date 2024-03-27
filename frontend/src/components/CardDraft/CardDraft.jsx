import styled from "@emotion/styled";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { formatDate } from "../../utils/DateUtil";
import { Link } from "react-router-dom";
import { tokens } from "../../constants/theme";
import Swal from "sweetalert2";
import { deletePost } from "../../services/postService";
import { toast } from "react-toastify";

const CardDraftStyled = styled(Box)(({ theme }) => ({
  "&": {
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.palette.mode === "light" ? "#ccc" : "#F8F8FF",
    display: "flex",
    flexDirection: "column",
    padding: 16,
    borderRadius: 4,
  },
  "& .card-draft__footer": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  "& h5": {
    fontWeight: 600,
  },
  "& h6": {
    fontWeight: 500,
  },
  "& .card-draft__date": {
    fontWeight: 400,
    fontSize: 13,
  },
}));

const CardDraft = ({ info, handleDeleteDraftPost }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <CardDraftStyled>
      <Typography variant="h5">{info?.title}</Typography>
      <Typography variant="h6" component="p">
        {info?.description}
      </Typography>
      <Box className="card-draft__footer">
        <Typography
          component="span"
          variant="subtitle1"
          className="card-draft__date">
          {/* {formatDate(info?.createAt)} */}
        </Typography>
        <Box className="card-draft__btns">
          <Link
            style={{ color: colors.blueAccent }}
            to={`/draft/${info?.slug}`}>
            Chỉnh sửa
          </Link>
          <Button onClick={handleDeleteDraftPost}>Xóa</Button>
        </Box>
      </Box>
    </CardDraftStyled>
  );
};

export default CardDraft;
