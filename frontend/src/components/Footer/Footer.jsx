import {
   Box,
   Container,
   Divider,
   Grid,
   Paper,
   Typography,
} from "@mui/material";
import logoSVG from "../../assets/img/logo.svg";
import { useMode } from "../../context/mode-context";
import { tokens } from "../../constants/theme";
import EmailIcon from "@mui/icons-material/Email";
import { Link } from "react-router-dom";

const Footer = () => {
   const { theme } = useMode();
   const token = tokens(theme.palette.mode);
   return (
      <Paper
         sx={{
            backgroundColor: token.paper,
            paddingBlock: 3,
         }}
      >
         <Container>
            <Grid container spacing={5}>
               <Grid item lg={2} md={2} xs={12}>
                  <Box
                     display="flex"
                     alignItems="center"
                     flexDirection="column"
                     gap={3}
                  >
                     <img
                        src={logoSVG}
                        alt="Episteme"
                        style={{
                           // width: "70%",
                           // height: "69px",
                           objectFit: "cover",
                        }}
                     />
                     <Box
                        display="flex"
                        alignItems="center"
                        flexDirection="column"
                        gap={1}
                     >
                        <Typography component="span" variant="h5">
                           Episteme
                        </Typography>
                        <Typography
                           component="span"
                           variant="h5"
                           sx={{
                              fontSize: {
                                 xs: "10px",
                                 md: "12px",
                              },
                           }}
                        >
                           Learn, Grow & Inspire
                        </Typography>
                     </Box>
                  </Box>
               </Grid>
               <Grid item xs={6} md={3} sm={4}>
                  <Box
                     display="flex"
                     gap={2}
                     flexDirection="column"
                     sx={{
                        "& > *": {
                           color: token.text,
                        },
                        "& li:hover": {
                           color: token.greenAccent,
                           cursor: "pointer",
                        },
                     }}
                  >
                     <Typography
                        component="h6"
                        variant="h5"
                        textTransform="uppercase"
                     >
                        Tài nguyên
                     </Typography>
                     <Box
                        component="ul"
                        display="flex"
                        gap={1}
                        flexDirection="column"
                        margin={0}
                        padding={0}
                        sx={{
                           listStyle: "none",
                        }}
                     >
                        <Box component="li">
                           <Typography component="span" variant="h6">
                              Bài viết
                           </Typography>
                        </Box>
                        <Box component="li">
                           <Typography component="span" variant="h6">
                              Tác giả
                           </Typography>
                        </Box>
                        <Box component="li">
                           <Typography component="span" variant="h6">
                              Tags
                           </Typography>
                        </Box>
                     </Box>
                  </Box>
               </Grid>
               <Grid item xs={6} md={3} sm={4}>
                  <Box
                     display="flex"
                     gap={2}
                     flexDirection="column"
                     sx={{
                        "& > *, & a": {
                           color: token.text,
                        },
                        "& li:hover, & li:hover a": {
                           color: token.greenAccent,
                           cursor: "pointer",
                        },
                     }}
                  >
                     <Link to="/aboutUs">
                        <Typography
                           component="h6"
                           variant="h5"
                           textTransform="uppercase"
                        >
                           Về chúng tôi
                        </Typography>
                     </Link>
                     <Box
                        component="ul"
                        display="flex"
                        gap={1}
                        flexDirection="column"
                        margin={0}
                        padding={0}
                        sx={{
                           listStyle: "none",
                        }}
                     >
                        <Box component="li">
                           <Link to="/aboutUs#dev">
                              <Typography component="span" variant="h6">
                                 Đội ngũ phát triển
                              </Typography>
                           </Link>
                        </Box>
                        <Box component="li">
                           <Typography component="span" variant="h6">
                              Điều khoản sử dụng
                           </Typography>
                        </Box>
                        <Box component="li">
                           <Link to="aboutUs#episteme">
                              <Typography component="span" variant="h6">
                                 Về chúng tôi
                              </Typography>
                           </Link>
                        </Box>
                     </Box>
                  </Box>
               </Grid>
               <Grid item xs={6} md={3} sm={4}>
                  <Box
                     display="flex"
                     gap={2}
                     flexDirection="column"
                     sx={{
                        "& > *": {
                           color: token.text,
                        },
                        "& li:not-lastchild:hover": {
                           color: token.greenAccent,
                           cursor: "pointer",
                        },
                     }}
                  >
                     <Typography
                        component="h6"
                        variant="h5"
                        textTransform="uppercase"
                     >
                        Liên hệ
                     </Typography>
                     <Box
                        component="ul"
                        display="flex"
                        gap={1}
                        flexDirection="column"
                        margin={0}
                        padding={0}
                        sx={{
                           listStyle: "none",
                        }}
                     >
                        <Box component="li">
                           <Typography
                              component="span"
                              variant="h6"
                              sx={{
                                 display: "flex",
                                 alignItems: "center",
                                 gap: 1,
                              }}
                           >
                              <EmailIcon />
                              <span>episteme.blog.contact@gmail.com</span>
                           </Typography>
                        </Box>
                        <Box component="li">
                           <Typography
                              component="span"
                              variant="h6"
                           ></Typography>
                        </Box>
                        <Box component="li">
                           <Typography
                              component="span"
                              variant="h6"
                           ></Typography>
                        </Box>
                     </Box>
                  </Box>
               </Grid>
               <Grid item xs={12} marginX="auto">
                  <Divider></Divider>
               </Grid>
               <Grid item xs={12} alignItems="center">
                  <Typography
                     variant="subtitle2"
                     component="p"
                     sx={{
                        width: "100%",
                        textAlign: "center",
                     }}
                  >
                     © 2023 Episteme. Designed by Ngong Ba Gang.
                  </Typography>
               </Grid>
            </Grid>
         </Container>
      </Paper>
   );
};
export default Footer;
