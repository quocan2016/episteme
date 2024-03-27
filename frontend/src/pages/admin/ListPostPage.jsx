import { useTheme } from "@emotion/react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { tokens } from "../../constants/theme";
import HeaderAdmin from "../../components/HeaderAdmin";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ActionTable from "../../components/ActionTable";
import { Link, useNavigate } from "react-router-dom";
import DisplayTimeTable from "../../components/DisplayTimeTable";
import ChipCustom from "../../components/ChipCustom";
import { useEffect, useState } from "react";
import {
  deletePost,
  getPosts,
  getPostsForAdmin,
  updatePost,
  updatePostForAdmin,
} from "./../../services/postService";
import { STATUS_POST } from "../../constants/status";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ListPostPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getPostsForAdmin().then((response) => setPosts(response?.data));
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "Id",
    },
    {
      field: "title",
      headerName: "Tên bài viết",
      width: 250,
    },
    {
      field: "author",
      headerName: "Tác giả",
      width: 200,
      renderCell: ({
        row: {
          author: { fullname },
        },
      }) => (
        <Link to="/s">
          <Typography color={colors.greenAccent}>{fullname}</Typography>
        </Link>
      ),
    },
    {
      field: "createAt",
      headerName: "Ngày tạo",
      width: 200,
      renderCell: ({ row: { createAt } }) => (
        <DisplayTimeTable
          time={createAt.split(" ")[0]}
          date={createAt.split(" ")[1]}
        />
      ),
    },
    {
      field: "updateAt",
      headerName: "Ngày cập nhập",
      width: 200,
      renderCell: ({ row: { updateAt } }) => (
        <DisplayTimeTable
          time={updateAt.split(" ")[0]}
          date={updateAt.split(" ")[1]}
        />
      ),
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 150,
      renderCell: ({ row: { status } }) => {
        switch (status) {
          case STATUS_POST.PUBLISHED:
            return <ChipCustom type="success" label={status} />;
          case STATUS_POST.DRAFT:
            return <ChipCustom type="warning" label={status} />;
          case STATUS_POST.SUSPENDED:
            return <ChipCustom type="error" label={status} />;
          case STATUS_POST.DELETED:
            return <ChipCustom type="warning" label={status} />;
        }
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: ({ row }) => {
        const { id, slug, status } = row;
        const [isLock, setIsLock] = useState(status === STATUS_POST.SUSPENDED);
        useEffect(() => {
          if (id != null) {
            if (isLock) {
              updatePostForAdmin(id, {
                ...row,
                status: STATUS_POST.SUSPENDED,
              }).then(() =>
                setPosts((prevPosts) =>
                  prevPosts.map((prevPost) => ({
                    ...prevPost,
                    status:
                      prevPost.id === id
                        ? STATUS_POST.SUSPENDED
                        : prevPost.status,
                  }))
                )
              );
            } else {
              updatePostForAdmin(id, {
                ...row,
                status: STATUS_POST.PUBLISHED,
              }).then(() =>
                setPosts((prevPosts) =>
                  prevPosts.map((prevPost) => ({
                    ...prevPost,
                    status:
                      prevPost.id === id
                        ? STATUS_POST.PUBLISHED
                        : prevPost.status,
                  }))
                )
              );
            }
          }
        }, [id, isLock]);

        const handleRemovePost = (idPost) => {
          Swal.fire({
            title: `Bạn có chắc muốn xóa post có id ${idPost}?`,
            text: "Khi xóa không thể hoàn tác lại!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy",
          }).then((result) => {
            if (result.isConfirmed) {
              updatePostForAdmin(idPost, {
                ...row,
                status: STATUS_POST.DELETED,
              })
                .then(() => {
                  setPosts((prevPosts) =>
                    prevPosts.filter((prevPost) => prevPost.id != idPost)
                  );
                  toast.success("Xóa bài viết thành công");
                })
                .catch(() => toast.error("Xóa bài viết thất bại"));
            }
          });
        };

        return (
          <ActionTable
            view={() => navigate(`/p/${slug}`)}
            lock={() => setIsLock((prev) => !prev)}
            isLock={isLock}
            remove={() => handleRemovePost(id)}
          />
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <HeaderAdmin title="Bài viết" subtitle="Danh sách bài viết" />
      <Box
        mt="40px"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
        }}>
        {posts.length > 0 ? (
          <DataGrid
            columns={columns}
            rows={posts}
            components={{ Toolbar: GridToolbar }}></DataGrid>
        ) : (
          <Box mx="auto" width="50px">
            <CircularProgress />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ListPostPage;
