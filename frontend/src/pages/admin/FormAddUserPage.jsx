import {
  Box,
  Button,
  FormHelperText,
  Grid,
  IconButton,
  Select,
  TextField,
  MenuItem,
  InputLabel,
  FormControl,
  Switch,
  FormControlLabel,
  Avatar,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import HeaderAdmin from "../../components/HeaderAdmin";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { DateField } from "@mui/x-date-pickers/DateField";
import dayjs from "dayjs";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { uploadImage } from "../../services/uploadService";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { STATUS_USERS } from "../../constants/status";
import { addUsers } from "../../services/userService";
import { toast } from "react-toastify";
import { format } from "date-fns";

const initialValues = {
  fullname: "",
  email: "",
  password: "",
  birthday: null,
  status: "",
  role: "USER",
  description: "",
  image: "",
};

const userSchema = yup.object().shape({
  fullname: yup.string().required("Vui lòng nhập họ tên"),
  email: yup
    .string()
    .email("Vui lòng nhập đúng định dạng email")
    .required("Vui lòng nhập email"),
  password: yup.string().required("Vui lòng nhập password"),
  birthday: yup.date().required("Vui lòng chọn ngày sinh"),
  status: yup.string().required("Vui lòng chọn trạng thái"),
});

const FormAddUserPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [image, setImage] = useState(null);
  const [urlImage, setUrlImage] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  console.log(isAdmin);

  const handleSubmitForm = async (values) => {
    const url = image ? await uploadImage(image) : "";
    const cloneValue = { ...values };
    const data = {
      ...cloneValue,
      role: isAdmin ? "ADMIN" : "USER",
      birthday: dayjs(values.birthday).format("DD/MM/YYYY"),
      image: url,
    };
    console.log(data);
    addUsers(data)
      .then((response) => {
        console.log(response);
        toast.success("Thêm người dùng thành công");
      })
      .catch((error) => {
        toast.error("Thêm người dùng thất bại");
      });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUrlImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
      setImage(file);
    }
  };

  const handleDeleteImage = (e) => {
    e.stopPropagation();
    setImage(null);
    setUrlImage(null);
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
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing="30px">
              <Grid item xs={12}>
                <Box
                  position="relative"
                  sx={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    border: "1px dotted #ccc",
                    mx: "auto",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    "&:hover .btn-delete-image": {
                      visibility: "unset",
                    },
                    "& .btn-delete-image:hover": {
                      backgroundColor: "rgba(0,0,0,0.7)",
                    },
                  }}>
                  {!urlImage ? (
                    <ImageOutlinedIcon
                      sx={{
                        width: "30px",
                        height: "30px",
                      }}
                    />
                  ) : (
                    <Avatar
                      sx={{ width: "100%", height: "100%" }}
                      alt={image.name}
                      src={urlImage}
                    />
                  )}

                  {urlImage && (
                    <IconButton
                      className="btn-delete-image"
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%,-50%)",
                        backgroundColor: "rgba(0,0,0,0.7)",
                        visibility: "hidden",
                        color: "#eee",
                        zIndex: 999,
                      }}
                      onClick={handleDeleteImage}>
                      <DeleteOutlinedIcon />
                    </IconButton>
                  )}

                  <label
                    style={{
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      left: 0,
                      right: 0,
                      cursor: "pointer",
                      zIndex: 99,
                    }}>
                    <input
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                      type="file"
                    />
                  </label>
                </Box>
              </Grid>
              <Grid item sm={6} md={6} lg={6} xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  name="fullname"
                  label="Họ và tên"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.fullname}
                  error={!!touched.fullname && !!errors.fullname}
                  helperText={!!touched.fullname && errors.fullname}
                />
              </Grid>
              <Grid item sm={6} md={6} lg={6} xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  name="email"
                  label="Email"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  error={!!touched.email && !!errors.email}
                  helperText={!!touched.email && errors.email}
                />
              </Grid>
              <Grid item sm={6} md={6} lg={6} xs={12}>
                <Box position="relative">
                  <TextField
                    sx={{
                      "& input": {
                        pr: "40px",
                      },
                    }}
                    autoComplete="off"
                    fullWidth
                    type={`${showPassword ? "text" : "password"}`}
                    name="password"
                    label="Mật khẩu"
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    error={!!touched.password && !!errors.password}
                    helperText={!!touched.password && errors.password}
                  />
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    sx={{
                      position: "absolute",
                      right: "8px",
                      top: "10px",
                    }}>
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </Box>
              </Grid>
              <Grid item sm={6} md={6} lg={6} xs={12}>
                <DateField
                  typeof="text"
                  name="birthday"
                  fullWidth
                  variant="outlined"
                  label="Ngày sinh"
                  format="DD/MM/YYYY"
                  value={values.birthday}
                  onChange={(value) => setFieldValue("birthday", value)}
                  onBlur={handleBlur}
                  error={!!touched.birthday && !!errors.birthday}
                  helperText={!!touched.birthday && errors.birthday}
                />
              </Grid>
              <Grid item sm={6} md={6} lg={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="status">Trạng thái</InputLabel>
                  <Select
                    label="Trạng thái"
                    labelId="status"
                    name="status"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.status}
                    error={!!touched.status && !!errors.status}>
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {Object.values(STATUS_USERS).map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                  {!!touched.status && errors.status && (
                    <FormHelperText sx={{ color: "#f44336" }}>
                      {errors.status}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item sm={6} md={6} lg={6} xs={12}>
                <FormControlLabel
                  control={
                    <Switch onChange={() => setIsAdmin((prev) => !prev)} />
                  }
                  label="Admin"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  multiline
                  rows={4}
                  name="description"
                  label="Mô tả"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
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
                Thêm người dùng
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default FormAddUserPage;
