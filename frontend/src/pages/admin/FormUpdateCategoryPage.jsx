import { Box, Button, Grid, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import HeaderAdmin from "../../components/HeaderAdmin";
import slug from "slug";
import {
  addCategory,
  getCategory,
  updateCategory,
} from "../../services/categoryService";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const userSchema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên danh mục"),
});

const FormUpdateCategoryPage = () => {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState(null);
  console.log(id);
  useEffect(() => {
    getCategory(id).then((response) => setInitialValues(response?.data));
  }, [id]);

  console.log(initialValues);
  const handleSubmitForm = (values) => {
    const data = {
      ...values,
      slug: values.slug || slug(values.name),
    };
    console.log(data);
    updateCategory(id, data)
      .then(() => toast.success("Cập nhật danh mục thành công"))
      .catch(() => toast.error("Cập nhật danh mục thất bại"));
  };

  return (
    <Box m="20px">
      <HeaderAdmin title="Danh mục" subtitle="Cập nhật danh mục"></HeaderAdmin>
      {initialValues && (
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
                  Cập nhật danh mục
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      )}
    </Box>
  );
};

export default FormUpdateCategoryPage;
