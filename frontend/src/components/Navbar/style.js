export const getBackgroundColor = (theme = {}) => {
   return theme.palette.mode === "dark"
      ? theme.palette.background.default
      : "#fff";
};

export const getTextColor = (theme = {}) => {
   return theme.palette.mode === "dark"
      ? theme.palette.text.primary
      : theme.palette.text.secondary;
};

export function getPrimaryColor(theme = {}) {
   return theme.palette.mode === "dark"
      ? theme.palette.primary.dark
      : theme.palette.primary.light;
}

export function flexRowMobile() {
   return {
      display: {
         xs: "flex",
         md: "none",
      },
      alignItems: "center",
   };
}
