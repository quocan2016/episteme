import { Box, useTheme } from "@mui/material";
import { EDITOR_JS_TOOLS } from "../../constants/editor";
import EditorJS from "react-editor-js";
import { forwardRef } from "react";

// eslint-disable-next-line react/display-name
const Editor = forwardRef(({ data }, ref) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        "& .ce-inline-tool,.ce-inline-toolbar__dropdown,.ce-conversion-toolbar__tools,.tc-popover":
          {
            color: "#1d202b",
          },
        "& .cdx-marker": {
          backgroundColor: "#226d99",
          color: "#fff",
        },
        "& .link-tool__input": {
          backgroundImage:
            theme.palette.mode === "dark"
              ? `url("data:image/svg+xml,<svg width='13' height='14' xmlns='http://www.w3.org/2000/svg'><path d='M8.567 13.629c.728.464 1.581.65 2.41.558l-.873.873A3.722 3.722 0 1 1 4.84 9.794L6.694 7.94a3.722 3.722 0 0 1 5.256-.008L10.484 9.4a5.209 5.209 0 0 1-.017.016 1.625 1.625 0 0 0-2.29.009l-1.854 1.854a1.626 1.626 0 0 0 2.244 2.35zm2.766-7.358a3.722 3.722 0 0 0-2.41-.558l.873-.873a3.722 3.722 0 1 1 5.264 5.266l-1.854 1.854a3.722 3.722 0 0 1-5.256.008L9.416 10.5a5.2 5.2 0 0 1 .017-.016 1.625 1.625 0 0 0 2.29-.009l1.854-1.854a1.626 1.626 0 0 0-2.244-2.35z' fill='white' transform='translate(-3.667 -2.7)'/></svg>%0A")`
              : `url("data:image/svg+xml,%3Csvg width='13' height='14' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.567 13.629c.728.464 1.581.65 2.41.558l-.873.873A3.722 3.722 0 1 1 4.84 9.794L6.694 7.94a3.722 3.722 0 0 1 5.256-.008L10.484 9.4a5.209 5.209 0 0 1-.017.016 1.625 1.625 0 0 0-2.29.009l-1.854 1.854a1.626 1.626 0 0 0 2.244 2.35zm2.766-7.358a3.722 3.722 0 0 0-2.41-.558l.873-.873a3.722 3.722 0 1 1 5.264 5.266l-1.854 1.854a3.722 3.722 0 0 1-5.256.008L9.416 10.5a5.2 5.2 0 0 1 .017-.016 1.625 1.625 0 0 0 2.29-.009l1.854-1.854a1.626 1.626 0 0 0-2.244-2.35z' fill='rgba(0, 0, 0, 0.6)' transform='translate(-3.667 -2.7)'/%3E%3C/svg%3E%0A")' transform='translate(-3.667 -2.7)'/%3E%3C/svg%3E%0A)`,
        },
        "& .ce-block--selected .ce-block__content": {
          backgroundColor: "transparent",
        },
        "& .cdx-attaches": {
          color: "#000",
        },
        "& .ce-toolbar__settings-btn": {
          backgroundColor: "transparent",
        },
        "& .ce-toolbar__settings-btn:hover": {
          color: "#388ae5",
        },
      }}>
      <EditorJS
        data={data}
        tools={EDITOR_JS_TOOLS}
        instanceRef={(instance) => (ref.current = instance)}
        placeholder="Nội dung bài viết"></EditorJS>
    </Box>
  );
});

export default Editor;
