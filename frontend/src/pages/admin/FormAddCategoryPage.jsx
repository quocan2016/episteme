import { Box, Button, Grid, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import HeaderAdmin from "../../components/HeaderAdmin";
import slug from "slug";
import { addCategory } from "../../services/categoryService";
import { toast } from "react-toastify";

const initialValues = {
  name: "",
  slug: "",
};

const userSchema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên danh mục"),
});

const FormAddCategoryPage = () => {
  const handleSubmitForm = (values) => {
    const data = {
      ...values,
      slug: values.slug || slug(values.name),
    };
    console.log(data);
    addCategory(data)
      .then(() => toast.success("Thêm danh mục thành công"))
      .catch(() => toast.error("Thêm danh mục thất bại"));
  };

  return (
    <Box m="20px">
      <HeaderAdmin title="Người dùng" subtitle="Thêm người dùng"></HeaderAdmin>
      <Formik
        onSubmit={handleSubmitForm}
        initialValues={initialValues}
        validationSchema={userSchema}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          handleBlur,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing="30px">
              <Grid item sm={6} md={6} lg={6} xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  name="name"
                  label="Tên danh mục"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  error={!!touched.name && !!errors.name}
                  helperText={!!touched.name && errors.name}
                />
              </Grid>
              <Grid item sm={6} md={6} lg={6} xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  name="slug"
                  label="Đường dẫn"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.slug}
                  error={!!touched.slug && !!errors.slug}
                  helperText={!!touched.slug && errors.slug}
                />
              </Grid>
            </Grid>
            <Box display="flex" justifyContent="flex-end" mt="30px">
              <Button
                type="submit"
                color="primary"
                variant="contained"
                sx={{
                  width: {
                    sm: "auto",
                    xs: "100%",
                  },
                }}>
                Thêm danh mục
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default FormAddCategoryPage;
