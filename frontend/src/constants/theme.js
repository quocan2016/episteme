export const tokens = (mode) =>
  mode === "dark"
    ? {
        primary: "#01212e",
        blueAccent: "#38b6ff",
        greenAccent: "#48ca7d",
        background: "#161923",
        paper: "#23242E",
        greyAccent: "#e0e0e0",
        text: "#fff",
      }
    : {
        primary: "#01212e",
        blueAccent: "#38b6ff",
        greenAccent: "#48ca7d",
        background: "#F8F8FF",
        paper: "#F8F8FF",
        greyAccent: "#141414",
        text: "#000",
      };

export const themeSettings = (mode) => {
  const colors = tokens(mode);

  return {
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: colors.blueAccent,
            },
            secondary: {
              main: colors.greenAccent,
            },
            background: {
              default: colors.background,
              paper: colors.background,
            },
          }
        : {
            primary: {
              main: colors.blueAccent,
            },
            secondary: {
              main: colors.greenAccent,
            },
            background: {
              default: colors.background,
              paper: colors.background,
            },
          }),
    },
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 40,
        fontWeight: 700,
      },
      h2: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 32,
        fontWeight: 500,
      },
      h3: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 24,
        fontWeight: 500,
      },
      h4: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 20,
        fontWeight: 500,
      },
      h5: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 16,
        fontWeight: 500,
      },
      h6: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 14,
        fontWeight: 500,
      },
      body1: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 16,
      },
      subtitle1: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 14,
        color: mode === "dark" ? "#94a3b8" : "#111729",
      },
      subtitle2: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 12,
        color: mode === "dark" ? "#94a3b8" : "#333",
      },
      caption: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 14,
        color: mode === "dark" ? "#94a3b8" : "#333",
        fontStyle: "italic",
      },
    },
  };
};
