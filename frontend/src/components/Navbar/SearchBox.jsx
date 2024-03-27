import { Box, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const SearchBox = ({ onClose, handleCloseSearch }) => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/posts?q=${searchValue}`);
    onClose();
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 3,
        boxSizing: "border-box",
        height: "100%",
        paddingBlock: 1,
        "& #search-box,& .MuiInput-root, & .MuiFormControl-root.MuiTextField-root, & .MuiBox-root":
          {
            width: "100%",
            // maxWidth: "600px",
            height: "100%",
            marginInline: "auto",
          },
        "& .MuiInputBase-root.MuiInput-root.MuiInput-underline": {
          width: "100%",
          height: "100%",
        },
      }}>
      <TextField
        id="search-box"
        placeholder="Nhập từ khóa..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment
              position="start"
              onClick={onClose}
              sx={{ cursor: "pointer" }}>
              <CloseIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment
              position="end"
              onClick={onClose}
              sx={{ cursor: "pointer" }}>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
    </Box>
  );
};

SearchBox.propTypes = {
  onClose: PropTypes.func,
};

export default SearchBox;
