import { Avatar, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.svg";

// eslint-disable-next-line react/prop-types
const NavbarLogo = ({ type = "tablet" }) => {
   return (
      <Link to="/" className={type === "tablet" ? "logo" : "logo--sm"}>
         <Box mr={0} className="logo-img__container">
            <Avatar
               className={type === "tablet" ? "logo__img" : "logo__img--sm"}
               src={logo}
            />
         </Box>
         <Box
            className="logo__text"
            sx={{
               display: "flex",
               flexFlow: "column",
               fontFamily: "inherit",
               letterSpacing: "0.05rem",
               textDecoration: "none",
               textAlign: "center",
            }}
         >
            <Typography
               variant="h5"
               component="span"
               className="logo__text-name"
            >
               Episteme
            </Typography>
            <Typography
               className="logo__text-sub"
               variant="body2"
               component="span"
            >
               Inspire, learn, grow
            </Typography>
         </Box>
      </Link>
   );
};

export default NavbarLogo;
