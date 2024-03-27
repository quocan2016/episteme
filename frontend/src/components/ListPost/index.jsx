const ListPost = ({ data: { items, style } }) => {
  return (
    <ul
      className={`cdx-list ${
        style === "ordered" ? "cdx-list--ordered" : "cdx-list--unordered"
      }`}>
      {items.map((item, index) => (
        <li className="cdx-list__item" key={index}>
          {item}
        </li>
      ))}
    </ul>
  );
};

export default ListPost;
