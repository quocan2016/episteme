const CardLinkPost = ({
  data: {
    link,
    meta: { description, image, title },
  },
}) => {
  if (!link) return null;
  const url = new URL(link);
  const domain = url.hostname;
  return (
    <div className="cdx-block">
      <div className="link-tool">
        <a
          className="link-tool__content link-tool__content--rendered"
          target="_blank"
          rel="nofollow noindex noreferrer"
          href={link}>
          <div
            className="link-tool__image"
            style={{
              backgroundImage: `url("${image?.url}")`,
            }}></div>
          <div className="link-tool__title">{title}</div>
          <p className="link-tool__description">{description}</p>
          <span className="link-tool__anchor">{domain}</span>
        </a>
      </div>
    </div>
  );
};

export default CardLinkPost;
