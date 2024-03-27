import "./styles.css";
import parse from "html-react-parser";

const TablePost = ({ data: { content } }) => {
  return (
    <div className="table-post">
      <div className="tc-table__wrap">
        <table className="tc-table">
          <tbody>
            {content.map((row, index) => (
              <tr key={index}>
                {row.map((item, index) => (
                  <td key={item + index} className="tc-table__cell">
                    <div className="tc-table__area">
                      <div
                        className="tc-table__inp"
                        style={{ wordWrap: "break-word" }}>
                        {parse(item)}
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablePost;
