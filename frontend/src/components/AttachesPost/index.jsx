import { Box, IconButton, Typography } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { formatBytes } from "../../utils/convertSize";

const AttachesPost = ({
  data: {
    file: { url, size },
    title,
  },
}) => {
  console.log(size);
  return (
    <Box
      sx={{
        display: "flex",
        padding: "10px 12px",
        borderRadius: "8px",
        backgroundColor: "rgba(72, 202, 125, 0.6)",
        gap: "8px",
        alignItems: "center",
      }}>
      <AttachFileIcon />
      <Box flex={1}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="subtitle1" fontSize="12px">
          {formatBytes(size)}
        </Typography>
      </Box>
      <IconButton
        aria-label="download file"
        href={url}
        target="_blank"
        rel="nofollow noindex noreferrer">
        <FileDownloadIcon />
      </IconButton>
    </Box>
  );
};

export default AttachesPost;
