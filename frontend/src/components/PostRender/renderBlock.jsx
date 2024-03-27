import { Typography } from "@mui/material";
import TablePost from "../TablePost";
import DisplayCode from "../DisplayCode";
import HeadingPost from "../HeadingPost";
import CheckListPost from "../CheckListPost";
import CardLinkPost from "../CardLinkPost";
import ImagePost from "../ImagePost";
import DelimiterPost from "../DelimiterPost";
import RawHtmlPost from "../RawHtmlPost";
import ParagraphPost from "../ParagraphPost";
import ListPost from "../ListPost";
import EmbedPost from "../EmbedPost";
import QuotePost from "../QuotePost";
import AttachesPost from "../AttachesPost";
const renderBlock = ({ data, type }) => {
  switch (type) {
    case "table":
      return <TablePost data={data}></TablePost>;
    case "code":
      return <DisplayCode data={data}></DisplayCode>;
    case "header":
      return <HeadingPost data={data}></HeadingPost>;
    case "checklist":
      return <CheckListPost data={data}></CheckListPost>;
    case "linkTool":
      return <CardLinkPost data={data}></CardLinkPost>;
    case "image":
      return <ImagePost data={data}></ImagePost>;
    case "delimiter":
      return <DelimiterPost data={data}></DelimiterPost>;
    case "raw":
      return <RawHtmlPost data={data}></RawHtmlPost>;
    case "paragraph":
      return <ParagraphPost data={data}></ParagraphPost>;
    case "list":
      return <ListPost data={data}></ListPost>;
    case "embed":
      return <EmbedPost data={data}></EmbedPost>;
    case "quote":
      return <QuotePost data={data}></QuotePost>;
    case "attaches":
      return <AttachesPost data={data}></AttachesPost>;
    default:
      return <Typography sx={{ color: "red" }}>Invalid block</Typography>;
  }
};

export default renderBlock;
