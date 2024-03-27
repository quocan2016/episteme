import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import TabPanel from "./TabPanel";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { uploadImage } from "../../services/uploadService";
import * as yup from "yup";
import { toast } from "react-toastify";
import { updateAuthorInfo } from "../../services/authorService";

const userInitialValues = {
  id: "",
  email: "",
  avatar: "",
  birthday: "",
  description: "",
  fullname: "",
};

const userSchema = yup.object().shape({
  fullname: yup.string().required("Vui lòng nhập họ tên"),
});

const UpdateAuthorInfoTab = ({ user, value, index }) => {
  const [avatar, setAvatar] = useState(null);
  const [urlAvatar, setUrlAvatar] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    setUserInfo(user);
    setUrlAvatar(user?.image);
  }, [user]);

  const onFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUrlAvatar(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
      setAvatar(file);
    }
  };

  const handleUpdateAvatar = async () => {
    const url = avatar ? await uploadImage(avatar) : "";
    setUrlAvatar(url);
  };

  const handleDeleteAvatar = () => {};

  const handleSubmitForm = async (values) => {
    const cloneValue = { ...values };
    const birthday = dayjs(values.birthday).format("DD/MM/YYYY");
    const data = {
      ...cloneValue,
      birthday: birthday === "Invalid Date" ? null : birthday,
      image: urlAvatar,
    };
    console.log(data);
    updateAuthorInfo(userInfo.id, data)
      .then((response) => {
        toast.success("Cập nhật người dùng thành công");
      })
      .catch((error) => {
        toast.error("Cập nhật người dùng thất bại");
      });
  };

  return (
    <TabPanel value={value} index={index}>
      {userInfo && (
        <Formik
          onSubmit={handleSubmitForm}
          initialValues={userInfo}
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
            <form id="update-info" onSubmit={handleSubmit} autoComplete="off">
              <Grid container columnSpacing={2} rowSpacing={3}>
                <Grid
                  item
                  md={12}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    columnGap: 3,
                    "label[for='image']": {
                      width: {
                        xs: "80px",
                        md: "120px",
                      },
                      height: {
                        xs: "80px",
                        md: "120px",
                      },
                      verticalAlign: "middle",
                      textAlign: "center",
                      cursor: "pointer",
                    },
                    ".update-img-btn": {
                      height: "fit-content",
                    },
                    ".img-label": {
                      display: "block",
                      width: "100%",
                      marginBottom: 1,
                    },
                  }}>
                  <Typography
                    component="span"
                    variant="h5"
                    className="img-label">
                    Ảnh đại diện
                  </Typography>
                  <input
                    type="file"
                    hidden
                    id="image"
                    onChange={onFileUpload}
                  />
                  <label htmlFor="image">
                    <Avatar
                      sx={{
                        width: "100%",
                        height: "100%",
                      }}
                      src={urlAvatar || ""}
                    />
                  </label>
                  <Button
                    variant="outlined"
                    className="update-img-btn"
                    onClick={handleDeleteAvatar}>
                    Xóa
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    flexFlow: "column",
                    rowGap: 3,
                  }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexFlow: "column",
                      gap: 1,
                    }}>
                    <Typography
                      htmlFor="fullname"
                      variant="h5"
                      component="label">
                      Họ và tên
                    </Typography>
                    <TextField
                      name="fullname"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.fullname}
                      error={!!touched.fullname && !!errors.fullname}
                      helperText={
                        !!touched.fullname && errors.fullname
                      }></TextField>
                  </Box>
                </Grid>
                <Grid item md={8} sm={6} xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      flexFlow: "column",
                      gap: 1,
                    }}>
                    <Typography htmlFor="email" variant="h5" component="label">
                      Email
                    </Typography>
                    <TextField
                      name="email"
                      id="email"
                      value={values.email.split("--")[0]}
                      disabled={true}></TextField>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Box
                    sx={{
                      display: "flex",
                      flexFlow: "column",
                      gap: 1,
                    }}>
                    <Typography
                      htmlFor="birthday"
                      variant="h5"
                      component="label">
                      Ngày sinh
                    </Typography>
                    <DemoContainer
                      sx={{
                        width: "100%",
                        padding: 0,
                        "& > div": {
                          width: "100%",
                          padding: 0,
                        },
                      }}
                      components={["DesktopDatePicker"]}>
                      <DemoItem className="desktop-date-picker-container">
                        <DesktopDatePicker
                          sx={{
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "unset!important",
                            },
                          }}
                          format="DD/MM/YYYY"
                          className="desktop-date-picker"
                          value={dayjs(values.birthday)}
                          onChange={(value) => setFieldValue("birthday", value)}
                        />
                      </DemoItem>
                    </DemoContainer>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      flexFlow: "column",
                      gap: 1,
                    }}>
                    <Typography
                      htmlFor="description"
                      variant="h5"
                      component="label">
                      Giới thiệu bản thân
                    </Typography>
                    <TextField
                      rows={3}
                      multiline
                      name="description"
                      id="description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description || ""}
                      error={!!touched.description && !!errors.description}
                      helperText={!!touched.description && errors.description}
                    />
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    columnGap: 2,
                  }}>
                  <Button variant="outlined">Hủy</Button>
                  <Button variant="contained" type="submit">
                    Cập nhật
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      )}
    </TabPanel>
  );
};

export default UpdateAuthorInfoTab;
