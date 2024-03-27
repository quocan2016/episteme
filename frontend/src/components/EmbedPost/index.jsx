import React from "react";

const EmbedPost = ({ data: { caption, embed, height, width, source } }) => {
  if (!embed || !source) return null;
  return (
    <div>
      <iframe
        width="100%"
        height={height}
        src={embed}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen></iframe>
    </div>
  );
};

export default EmbedPost;
