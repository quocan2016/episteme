import * as ReactDOMServer from "react-dom/server";

const CustomBlockHOC = (Component) => {
  return ({ data }) => {
    return ReactDOMServer.renderToString(<Component data={data}></Component>);
  };
};

export default CustomBlockHOC;
