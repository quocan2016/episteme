import { Box, Container, Grid, Typography } from "@mui/material";
import banner from "../../assets/img/episteme.mp4";
import overlay from "../../assets/img/episteme.jpg";
import { useMode } from "../../context/mode-context";
import { tokens } from "../../constants/theme";

const Banner = () => {
   const { theme } = useMode();
   const token = tokens(theme.palette.mode);
   return (
      <Container
         sx={{
            my: 5,
            "& img, & video": {
               objectFit: "cover",
               display: "block",
               width: "100%",
               height: "100%",
               borderRadius: 4,
               position: "relative",
               zIndex: 15,
            },
         }}
      >
         <Box
            sx={{
               position: "relative",
               zIndex: 10,
               height: {
                  xs: 200,
                  sm: 300,
                  md: 400,
               },
               "& video.video": {
                  display: {
                     xs: "none",
                     sm: "block",
                  },
                  objectPosition: {
                     xs: "-15px",
                     md: "-50px",
                     lg: 0,
                  },
               },
               "& .backgroundImage": {
                  position: "absolute",
                  objectPosition: {
                     xs: "0px",
                     md: 0,
                  },
                  filter: {
                     sm: "blur(12px)",
                     xs: "none",
                  },
                  top: 0,
                  left: 0,
                  zIndex: -1,
               },
            }}
         >
            <Grid
               item
               xs={6}
               sx={{
                  display: {
                     sm: "flex",
                     xs: "none",
                  },
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 1,
                  left: "60%",
                  right: 5,
                  zIndex: 100000,
                  color: "#fff",
               }}
            >
               <Typography variant="h2" component="p" sx={{ color: "inherit" }}>
                  Kết nối tri thức
               </Typography>
               <Typography
                  variant="h5"
                  component="p"
                  width="75%"
                  sx={{ color: "inherit" }}
               >
                  Khi chúng ta chia sẻ tri thức, chúng ta không chỉ giúp người
                  khác mọc cánh bay cao,
               </Typography>
               <Typography
                  variant="h5"
                  component="p"
                  width="70%"
                  sx={{ color: "inherit" }}
               >
                  mà còn làm cho chính mình thăng hoa trong biển cả tri thức vô
                  tận
               </Typography>
            </Grid>
            <video muted autoPlay loop className="video">
               <source src={banner} type="video/mp4" />
            </video>
            <img className="backgroundImage" src={overlay} alt="" />
         </Box>
      </Container>
   );
};

export default Banner;
