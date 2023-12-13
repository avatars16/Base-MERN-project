// MUIWrapper.tsx file
import { createTheme, PaletteMode, ThemeProvider } from "@mui/material";
import { createContext, useEffect, useMemo, useState } from "react";
import { getDesignTokens } from "../../theme/theme";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useTranslation } from "react-i18next";
import {
    MUILocaleData,
    retrieveDatePickerLocale,
    retrieveLocalization,
    supportedLocales,
} from "../../theme/SupportedLocales";
import i18n from "i18next";

//Inspired by: https://medium.com/@itayperry91/react-and-mui-change-muis-theme-mode-direction-and-language-including-date-pickers-ad8e91af30ae
//Changed it to work with REDUX ~Bart E

/**
  TypeScript and React inconvenience:
  These functions are in here purely for types! 
  They will be overwritten - it's just that
  createContext must have an initial value.
  Providing a type that could be 'null | something' 
  and initiating it with *null* would be uncomfortable :)
*/
export const muiProviderContext = createContext({
    toggleColorMode: () => {},
    setLocale: (_locale: MUILocaleData) => {},
    locale: supportedLocales[0],
});

export default function MuiProvider({ children }: { children: React.ReactNode }) {
    const { t } = useTranslation();
    const [mode, setMode] = useState<PaletteMode>("light");
    const [locale, setLocale] = useState(supportedLocales[0]);

    const muiProviderUtils = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
            },
        }),
        []
    );

    const theme = useMemo(() => {
        i18n.changeLanguage(locale.dayJSLanguage);
        return createTheme(
            getDesignTokens(mode, locale.direction),
            retrieveLocalization(locale.dayJSLanguage),
            retrieveDatePickerLocale(locale.dayJSLanguage)
        );
    }, [mode, locale]);
    useEffect(() => {
        document.dir = locale.direction;
        document.title = t("header.title");
    }, [locale, t]);

    return (
        <muiProviderContext.Provider
            value={{
                toggleColorMode: muiProviderUtils.toggleColorMode,
                locale,
                setLocale,
            }}>
            <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale.dayJSLanguage}>
                    {children}
                </LocalizationProvider>
            </ThemeProvider>
        </muiProviderContext.Provider>
    );
}
