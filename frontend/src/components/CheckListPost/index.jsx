import React from "react";

const CheckListPost = ({ data: { items } }) => {
  return (
    <div className="cdx-block cdx-checklist">
      {items.map((item, index) => (
        <div
          key={index}
          className={`cdx-checklist__item ${
            item.checked && "cdx-checklist__item--checked"
          }`}>
          <span className="cdx-checklist__item-checkbox"></span>
          <div className="cdx-checklist__item-text" spellCheck="false">
            {item.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CheckListPost;
