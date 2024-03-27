import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { Parser } from "html-to-react";
import { useState } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import IntegrationInstructionsOutlinedIcon from "@mui/icons-material/IntegrationInstructionsOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

const htmlToReactParser = new Parser();
const DisplayCode = ({ data: { code } }) => {
  if (!code) return null;
  const [copied, setCopied] = useState(false);
  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
  };

  return (
    <Box
      sx={{
        borderRadius: "4px",
        padding: "20px",
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
        position: "relative",
      }}>
      <Tooltip title={copied ? "Đã copy" : "Copy"}>
        <IconButton
          sx={{
            position: "absolute",
            right: "10px",
            top: "10px",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            zIndex: "20",
          }}
          onClick={handleCopyCode}>
          {copied ? (
            <CheckOutlinedIcon />
          ) : (
            <IntegrationInstructionsOutlinedIcon />
          )}
        </IconButton>
      </Tooltip>
      <code style={{ whiteSpace: "pre-wrap" }}>
        {htmlToReactParser.parse(
          hljs.highlightAuto(code).value.replace(/\n/g, "<br/>")
        )}
      </code>
    </Box>
  );
};
export default DisplayCode;
