// MUIWrapper.tsx file
import { createTheme, PaletteMode, ThemeProvider } from "@mui/material";
import { createContext, useEffect, useMemo, useState } from "react";
import { getDesignTokens } from "../../theme/theme";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useAppSelector } from "../REDUX/hooks/reduxHooks";
import { useTranslation } from "react-i18next";
import { retrieveDatePickerLocale, retrieveLocalization } from "../../theme/SupportedLocales";

export const muiProviderContext = createContext({
    toggleColorMode: () => {},
});

export default function MuiProvider({ children }: { children: React.ReactNode }) {
    const { t } = useTranslation();
    const { locale } = useAppSelector((state) => state.locales);
    const [mode, setMode] = useState<PaletteMode>("light");

    const muiProviderUtils = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
            },
        }),
        []
    );

    const theme = useMemo(
        () =>
            createTheme(
                getDesignTokens(mode, locale.direction),
                retrieveLocalization(locale.dayJSLanguage),
                retrieveDatePickerLocale(locale.dayJSLanguage)
            ),
        [mode, locale]
    );
    useEffect(() => {
        document.dir = locale.direction;
        document.title = t("header.title");
    }, [locale, t]);

    return (
        <muiProviderContext.Provider
            value={{
                toggleColorMode: muiProviderUtils.toggleColorMode,
            }}>
            <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>{children}</LocalizationProvider>
            </ThemeProvider>
        </muiProviderContext.Provider>
    );
}
