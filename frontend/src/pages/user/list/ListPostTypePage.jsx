import {
  Box,
  Container,
  Grid,
  Pagination,
  Paper,
  Typography,
} from "@mui/material";
import { CardPost } from "../../../components/CardPost";
import { DEFAULT_IMAGE } from "../../../constants/default";
import { tokens } from "../../../constants/theme";
import { useTheme } from "@emotion/react";
import { useEffect, useState } from "react";
import { getPostsByType, searchPost } from "../../../services/postService";
import { useSearchParams } from "react-router-dom";

const PAGE_SZIE = 8;

const ListPostTypePage = ({ type = "", title = "" }) => {
  const { palette } = useTheme();
  const token = tokens(palette.mode);

  const [posts, setPosts] = useState([]);
  const [error, setErrorMessage] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    document.title = "Danh sách bài viết";
  }, []);

  useEffect(() => {
    getPostsByType({
      type,
      pageSize: PAGE_SZIE,
      pageNumber: page - 1,
    })
      .then((response) => {
        const { totalPages, content } = response.data;
        console.log(response);
        setTotalPages(totalPages);
        setPosts(content);
      })
      .catch(() => setErrorMessage("Không tìm thấy bài viết nào"));
  }, [page]);

  const handleChangePagination = (e, value) => {
    setPage(value);
  };

  return (
    <>
      <Paper
        sx={{
          padding: 8,
          textAlign: "center",
          marginBlock: "16px 32px",
          color: "#fff",
          background: `${token.paper} url(${DEFAULT_IMAGE.BACKGROUND}) no-repeat center`,
        }}>
        <Typography variant="h2">{title}</Typography>
      </Paper>
      <Container>
        <Grid container spacing="20px" rowSpacing="50px">
          {posts &&
            posts.length > 0 &&
            posts.map((post) => {
              return (
                <Grid item key={post.id} lg={3} md={6} xs={12}>
                  <CardPost postInfo={post} />
                </Grid>
              );
            })}
        </Grid>
      </Container>
      <Container>
        <Pagination
          onChange={handleChangePagination}
          sx={{
            margin: "50px 0",
            "& .MuiPagination-ul": {
              justifyContent: "center",
            },
          }}
          page={page}
          count={totalPages}
        />
      </Container>
    </>
  );
};

export default ListPostTypePage;
