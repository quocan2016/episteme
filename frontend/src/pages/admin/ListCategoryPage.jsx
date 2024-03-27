import { useTheme } from "@emotion/react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { tokens } from "../../constants/theme";
import HeaderAdmin from "../../components/HeaderAdmin";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ActionTable from "../../components/ActionTable";
import InfoUserTable from "../../components/InfoUserTable";
import DisplayTimeTable from "../../components/DisplayTimeTable";
import ChipCustom from "../../components/ChipCustom/index";
import { useState } from "react";
import {
  deleteCategory,
  getCategories,
} from "./../../services/categoryService";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ListCategoryPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [categories, setCategories] = useState([]);

  useState(() => {
    getCategories().then((response) => setCategories(response.data));
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "Id",
    },
    {
      field: "name",
      headerName: "Tên",
      width: 250,
    },
    {
      field: "slug",
      headerName: "Đường dẫn",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: ({ row: { id } }) => {
        const navigate = useNavigate();
        const handleRemoveCategory = (idPost) => {
          Swal.fire({
            title: `Bạn có chắc muốn xóa danh mục có id ${idPost}?`,
            text: "Khi xóa không thể hoàn tác lại!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy",
          }).then((result) => {
            if (result.isConfirmed) {
              deleteCategory(idPost)
                .then(() => {
                  setCategories((prev) =>
                    prev.filter((item) => item.id != idPost)
                  );
                  toast.success("Xóa bài viết thành công");
                })
                .catch(() => toast.error("Xóa bài viết thất bại"));
            }
          });
        };
        return (
          <ActionTable
            edit={() => navigate(`/admin/categories/update/${id}`)}
            remove={() => handleRemoveCategory(id)}
          />
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <HeaderAdmin title="Người dùng" subtitle="Danh sách người dùng" />
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
        {categories.length > 0 ? (
          <DataGrid
            columns={columns}
            rows={categories}
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

export default ListCategoryPage;
