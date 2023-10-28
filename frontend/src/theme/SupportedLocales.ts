// SupportedLocales.ts

import { Direction } from "@mui/material";
import { nlNL as datePickerLocaleDutch, enUS as datePickerLocaleEnglish } from "@mui/x-date-pickers";
import { nlNL as materialLocaleDutch, enUS as materialLocaleEnglish, Localization } from "@mui/material/locale";

import "dayjs/locale/en";
import "dayjs/locale/nl";

export interface MUILocaleData {
    dayJSLanguage: string;
    countryCode: string;
    title: string;
    direction: Direction;
}

const dutch: MUILocaleData = {
    dayJSLanguage: "nl",
    countryCode: "nl",
    title: "Nederlands",
    direction: "ltr",
};

const english: MUILocaleData = {
    dayJSLanguage: "en",
    countryCode: "gb",
    title: "English",
    direction: "ltr",
};

// // RTL language
// Example of right to left language
// const hebrew: MUILocaleData = {
//     dayJSLanguage: "he",
//     countryCode: "il",
//     title: "Hebrew",
//     direction: "rtl",
// };

export const retrieveLocalization = (dayJSLanguage: string): Localization => {
    switch (dayJSLanguage) {
        case "en":
            return materialLocaleEnglish;
        default:
            return materialLocaleDutch;
    }
};

export const retrieveDatePickerLocale = (dayJSLanguage: string) => {
    switch (dayJSLanguage) {
        case "en":
            return datePickerLocaleEnglish;
        default:
            return datePickerLocaleDutch;
    }
};

export const retrieveMUILocale = (dayJSLanguage: string) => {
    switch (dayJSLanguage) {
        case "en":
            return english;
        default:
            return dutch;
    }
};

export const supportedLocales: MUILocaleData[] = [english, dutch];
