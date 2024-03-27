import { TextField } from "@mui/material";

const InputComment = ({
  placeholder = "",
  onChange = () => {},
  maxRows = undefined,
  defaultValue = "",
  inputProps = {},
  ...otherProps
}) => {
  return (
    <TextField
      defaultValue={defaultValue}
      className="form-group__input-container"
      maxRows={maxRows}
      multiline
      fullWidth
      InputProps={{ className: "form-group__input" }}
      placeholder={placeholder}
      variant="standard"
      inputProps={inputProps}
      onChange={onChange}
      {...otherProps}
    />
  );
};

export default InputComment;
