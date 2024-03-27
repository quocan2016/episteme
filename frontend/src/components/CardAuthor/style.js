export const cardStyle = {
   style: {
      display: "flex",
      alignItems: "center",
      borderRadius: 2,
   },
   cardMedia: {
      width: 60,
      height: 60,
      borderRadius: 100,
   },
   cardMediaContainer: {
      padding: 1,
   },
   cardContent: {
      "& .card__title": {
         display: "flex",
         alignItems: "center",
         justifyContent: "space-between",
         marginBottom: 1.5,
      },
   },
   cardText: {
      textAlign: "left",
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitLineClamp: "2",
      WebkitBoxOrient: "vertical",
      textDecoration: "none",
   },
};
