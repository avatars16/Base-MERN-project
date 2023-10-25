// SupportedLocales.ts

import { Direction } from "@mui/material";
import { nlNL as datePickerLocaleDutch, enUS as datePickerLocaleEnglish } from "@mui/x-date-pickers";
import {
    nlNL as materialLocaleDutch,
    enUS as materialLocaleEnglish,
    heIL as materialLocaleHebrew,
    Localization,
} from "@mui/material/locale";

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
    title: "Dutch",
    direction: "ltr",
};

const english: MUILocaleData = {
    dayJSLanguage: "en",
    countryCode: "gb",
    title: "English",
    direction: "ltr",
};

// RTL language
const hebrew: MUILocaleData = {
    dayJSLanguage: "he",
    countryCode: "il",
    title: "Hebrew",
    direction: "rtl",
};

export const retrieveLocalization = (dayJSLanguage: string): Localization => {
    switch (dayJSLanguage) {
        case "nl":
            return materialLocaleDutch;
        case "he":
            return materialLocaleHebrew;
        default:
            return materialLocaleEnglish;
    }
};

export const retrieveDatePickerLocale = (dayJSLanguage: string) => {
    switch (dayJSLanguage) {
        case "nl":
            return datePickerLocaleDutch;
        default:
            return datePickerLocaleEnglish;
    }
};

export const retrieveMUILocale = (dayJSLanguage: string) => {
    switch (dayJSLanguage) {
        case "nl":
            return dutch;
        default:
            return english;
    }
};

export const supportedLocales: MUILocaleData[] = [english, dutch, hebrew];
