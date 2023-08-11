// MUIWrapper.tsx file
import { createTheme, PaletteMode, ThemeProvider } from "@mui/material";
import { createContext, useEffect, useMemo, useState } from "react";
import { getDesignTokens } from "../theme/theme";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useAppSelector } from "../hooks/reduxHooks";
import { useTranslation } from "react-i18next";

export const MUIWrapperContext = createContext({
    toggleColorMode: () => {},
});

export default function MUIWrapper({ children }: { children: React.ReactNode }) {
    const { t } = useTranslation();
    const { locale } = useAppSelector((state) => state.locales);
    const [mode, setMode] = useState<PaletteMode>("light");

    const muiWrapperUtils = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
            },
        }),
        []
    );

    const theme = useMemo(
        () => createTheme(getDesignTokens(mode, locale.direction), locale.muiCore, locale.muiDatePicker),
        [mode, locale]
    );
    useEffect(() => {
        document.dir = locale.direction;
        document.title = t("header.title");
    }, [locale, t]);

    return (
        <MUIWrapperContext.Provider
            value={{
                toggleColorMode: muiWrapperUtils.toggleColorMode,
            }}>
            <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>{children}</LocalizationProvider>
            </ThemeProvider>
        </MUIWrapperContext.Provider>
    );
}
