import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { cardStyle } from "./style";
import { useMode } from "../../context/mode-context";
import { tokens } from "../../constants/theme";
import { DEFAULT_IMAGE } from "../../constants/default";

const CardAuthor = ({ data }) => {
  const { theme } = useMode();
  const token = tokens(theme.palette.mode);
  return (
    <NavLink to={`/profile/${data?.id}`}>
      <Card
        sx={{
          ...cardStyle.style,
        }}>
        <Box sx={cardStyle.cardMediaContainer}>
          <Avatar
            sx={cardStyle.cardMedia}
            image={data?.image || DEFAULT_IMAGE.USER_AVATAR}
          />
        </Box>
        <CardContent sx={cardStyle.cardContent}>
          <Box className="card__title">
            <Typography
              gutterBottom
              component="span"
              sx={{
                fontWeight: 600,
                fontSize: "14px",
              }}>
              {data?.fullname}
            </Typography>
            {/* <Button
                     variant="outlined"
                     sx={{
                        color: token.text,
                        borderColor: "currentColor",
                        borderRadius: 4,
                        padding: "2px 8px",
                        fontSize: "12px",
                        textTransform: "none",
                     }}
                  >
                     Theo dõi
                  </Button> */}
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={cardStyle.cardText}>
            {data?.description}
          </Typography>
        </CardContent>
      </Card>
    </NavLink>
  );
};

export default CardAuthor;
