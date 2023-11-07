import { Direction, PaletteMode } from "@mui/material";

//Tutorial: https://medium.com/@itayperry91/react-and-mui-change-muis-theme-mode-direction-and-language-including-date-pickers-ad8e91af30ae

export const getDesignTokens = (mode: PaletteMode, direction: Direction) => ({
    palette: {
        mode,
        ...(mode === "light"
            ? {
                  // palette values for light mode
                  primary: { main: "#125887" },
                  secondary: { main: "#bcdff6" },
                  text: { primary: "#061a28" },
                  background: { default: "#e9f4fc" },
              }
            : {
                  primary: { main: "#125887" },
                  secondary: { main: "#030f17" },
                  text: { primary: "#e9f4fc" },
                  background: { default: "#061a28", paper: "#061a28" },
              }),
    },
    direction,
});
