import Table from "editorjs-table";
import List from "@editorjs/list";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import Image from "@editorjs/image";
import Raw from "@editorjs/raw";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import AttachesTool from "@editorjs/attaches";
import AlignmentTuneTool from "editorjs-paragraph-with-alignment";
import Header from "editorjs-header-with-alignment";
import { uploadFile, uploadImage } from "../services/uploadService";
import EmbedTool from "../tool/EmbedTool";
import { toast } from "react-toastify";

export const EDITOR_JS_TOOLS = {
  embed: {
    class: EmbedTool,
    config: {
      services: {
        youtube: true,
        facebook: true,
        instagram: true,
        twitter: true,
        "twitch-video": true,
        "twitch-channel": true,
        gfycat: true,
        imgur: true,
        codepen: true,
        pinterest: true,
      },
    },
  },
  paragraph: {
    class: AlignmentTuneTool,
    config: {
      default: "right",
      preserveBlank: true,
      blocks: {
        header: "center",
        list: "right",
        paragraph: "",
      },
    },
  },
  table: {
    class: Table,
    inlineToolbar: true,
  },
  marker: Marker,
  list: List,
  code: Code,
  linkTool: {
    class: LinkTool,
    icon: "",
    config: {
      endpoint: "http://localhost:8080/api/v1/linktool/process",
    },
  },
  image: {
    class: Image,
    config: {
      uploader: {
        async uploadByFile(file) {
          const url = await uploadImage(file);
          toast.success("Tải ảnh lên thành công");
          return {
            success: 1,
            file: {
              url,
            },
          };
        },
        async uploadByUrl(url) {
          toast.success("Tải ảnh lên thành công");
          return {
            success: 1,
            file: {
              url: url,
            },
          };
        },
      },
    },
  },
  raw: Raw,
  header: {
    class: Header,
    config: {
      placeholder: "Enter a header",
      levels: [2, 3, 4],
      defaultLevel: 2,
    },
  },
  quote: Quote,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  attaches: {
    class: AttachesTool,
    errorMessage: "123",
    config: {
      uploader: {
        async uploadByFile(file) {
          const { url, title, size, error } = await uploadFile(file);
          console.log("url: " + url);
          if (error) {
            toast.error(error);
            return {
              success: 0,
            };
          }
          toast.success("Tải file lên thành công");
          return {
            success: 1,
            file: {
              url,
              title,
              size,
            },
          };
        },
      },
    },
  },
};
