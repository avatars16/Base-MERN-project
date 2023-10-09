import { createSlice } from "@reduxjs/toolkit";
import i18n from "i18next";
import { supportedLocales, MUILocaleData } from "../../../theme/SupportedLocales";

const initialState: { locale: MUILocaleData } = {
    // ! necesarry to tell typescript that we are certain that localstorage cannot return null
    locale: localStorage.getItem("locale") ? JSON.parse(localStorage.getItem("locale")!) : supportedLocales[0],
};

const localesSlice = createSlice({
    name: "locales",
    initialState,
    reducers: {
        saveLocale: (state, action) => {
            state.locale = action.payload;
            i18n.changeLanguage(state.locale.dayJSLanguage);
            localStorage.setItem("locale", JSON.stringify(action.payload));
        },
    },
});
export const { saveLocale } = localesSlice.actions;

export default localesSlice.reducer;
