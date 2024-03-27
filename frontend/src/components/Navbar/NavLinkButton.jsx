/* eslint-disable react/prop-types */
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const NavLinkButton = ({
   variant = "outlined",
   to = "/",
   textColor = "#151515",
   buttonText = "Button",
   children,
   onClick = () => {},
   ...props
}) => {
   return (
      <NavLink to={to} onClick={onClick}>
         {children || (
            <Button
               variant={variant}
               sx={{
                  color: textColor,
                  borderColor: "currentColor",
                  borderRadius: 5,
               }}
               {...props}
            >
               {buttonText}
            </Button>
         )}
      </NavLink>
   );
};

export default NavLinkButton;
