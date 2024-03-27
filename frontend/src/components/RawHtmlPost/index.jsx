import parse from "html-react-parser";

const RawHtmlPost = ({ data: { html } }) => {
  console.log(html);
  return <div className="cdx-block">{parse(html)}</div>;
};

export default RawHtmlPost;
