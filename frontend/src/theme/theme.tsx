import { PaletteMode } from "@mui/material";

export const getDesignTokens = (mode: PaletteMode) => ({
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
});
