import { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useMode } from "../../../context/mode-context";
import { tokens } from "../../../constants/theme";
import { register } from "../../../services/authService";
import { useAuth } from "../../../context/auth-context";

const initialValues = {
  fullname: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const userSchema = yup.object().shape({
  fullname: yup.string().required("Vui lòng nhập họ và tên"),
  email: yup
    .string()
    .email("Vui lòng nhập đúng định dạng email")
    .required("Vui lòng nhập email"),
  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .min(6, "Mật khẩu phải có ít nhất 6 kí tự")
    .max(32, "Mật khẩu phải ít hơn hoặc bằng 32 kí tự"),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Xác nhận mật khẩu phải trùng với mật khẩu"
    )
    .required("Vui lòng nhập xác nhận mật khẩu"),
});

const RegisterPage = ({ title }) => {
  const navigate = useNavigate();
  const { theme } = useMode();
  const token = tokens(theme.palette.mode);
  const { setUser } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    document.title = title;
  }, []);

  const handleSubmitForm = async (values) => {
    const registerData = {
      email: values.email,
      password: values.password,
      fullname: values.fullname,
    };
    await register(registerData)
      .then((res) => {
        setUser(res.data.infoUser);
        localStorage.setItem("token_episteme", res.data.token);
        navigate("/");
        setErrorMessage("");
      })
      .catch((error) => {
        setErrorMessage("Đăng ký thất bại");
      });
  };
  return (
    <>
      <Container
        sx={{
          position: "fixed",
          inset: 0,
        }}>
        <Grid
          container
          alignItems={"center"}
          justifyContent={"center"}
          sx={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
          }}>
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                color: token.textColor,
              }}>
              <Typography
                variant="h3"
                sx={{
                  textAlign: "center",
                  textTransform: "uppercase",
                  marginBottom: 4,
                }}>
                Đăng ký
              </Typography>
              {errorMessage && (
                <Typography
                  variant="h6"
                  component="p"
                  marginBottom={3}
                  sx={{ color: "red" }}>
                  {errorMessage}
                </Typography>
              )}
              <Formik
                initialValues={initialValues}
                validationSchema={userSchema}
                onSubmit={handleSubmitForm}>
                {({ touched, errors, handleChange, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      id="fullname"
                      name="fullname"
                      label="Họ và tên"
                      type="text"
                      sx={{
                        width: "100%",
                        marginBottom: 2,
                      }}
                      onChange={handleChange}
                      error={!!touched.fullname && !!errors.fullname}
                      helperText={!!touched.fullname && errors.fullname}
                    />
                    <TextField
                      id="email"
                      name="email"
                      label="Email"
                      type="text"
                      sx={{
                        width: "100%",
                        marginBottom: 2,
                      }}
                      onChange={handleChange}
                      error={!!touched.email && !!errors.email}
                      helperText={!!touched.email && errors.email}
                    />
                    <TextField
                      id="password"
                      name="password"
                      label="Mật khẩu"
                      type="password"
                      sx={{
                        width: "100%",
                        marginBottom: 2,
                      }}
                      onChange={handleChange}
                      error={!!touched.password && !!errors.password}
                      helperText={!!touched.password && errors.password}
                    />
                    <TextField
                      id="confirmPassword"
                      name="confirmPassword"
                      label="Xác nhận mật khẩu"
                      type="password"
                      sx={{
                        width: "100%",
                        marginBottom: 2,
                      }}
                      onChange={handleChange}
                      error={
                        !!touched.confirmPassword && !!errors.confirmPassword
                      }
                      helperText={
                        !!touched.confirmPassword && errors.confirmPassword
                      }
                    />
                    <Button
                      type="submit"
                      size="large"
                      variant="outlined"
                      sx={{
                        display: "block",
                        color: "#fff",
                        backgroundColor: token.greenAccent,
                        borderColor: token.greenAccent,
                        marginX: "auto",
                        fontSize: "14px",
                        marginBottom: 3,
                        "&:hover": {
                          backgroundColor: "#fff",
                          color: token.greenAccent,
                          borderColor: token.greenAccent,
                        },
                      }}>
                      Đăng ký
                    </Button>
                  </form>
                )}
              </Formik>
              <Box
                sx={{
                  position: "relative",
                  marginBottom: 3,
                  left: "50%",
                  transform: "translateX(-50%)",
                }}>
                <Divider></Divider>
                <Typography
                  variant="subtitle2"
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontWeight: 400,
                    padding: "4px 8px",
                    backgroundColor: token.background,
                  }}>
                  Hoặc
                </Typography>
              </Box>
              <Typography
                component="p"
                textAlign="center"
                sx={{
                  "& a[href='/login']": {
                    color: token.greenAccent,
                  },
                }}>
                Đã có tài khoản?{" "}
                <Link to="/login" style={{ color: token.greenAccent }}>
                  Đăng nhập
                </Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default RegisterPage;
