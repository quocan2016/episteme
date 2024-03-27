/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
import CardAuthor from ".";
import { Link } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useMode } from "../../context/mode-context";
import { tokens } from "../../constants/theme";

const ListHeading = ({ title, slug }) => {
  const { theme } = useMode();
  const token = tokens(theme.palette.mode);
  return (
    <Box
      mb={3}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
      <Typography variant="h5" sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          "&:hover": {
            color: token.greenAccent,
          },
        }}>
        <Link
          to={slug}
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}>
          Xem thêm <ChevronRightIcon />
        </Link>
      </Typography>
    </Box>
  );
};

const AuthorList = ({ authors }) => {
  return (
    <Box>
      <ListHeading title="Tác giả nổi bật" slug="/popularAuthor" />
      <Box
        sx={{
          display: "flex",
          flexFlow: "column",
          rowGap: 2,
        }}>
        {authors &&
          authors.length > 0 &&
          authors.map((item, index) => <CardAuthor key={index} data={item} />)}
      </Box>
    </Box>
  );
};

export default AuthorList;
