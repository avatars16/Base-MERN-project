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
    muiCore: Localization;
    muiDatePicker: any;
    dayJSLanguage: string;
    countryCode: string;
    title: string;
    direction: Direction;
}

const dutch: MUILocaleData = {
    muiCore: materialLocaleDutch,
    muiDatePicker: datePickerLocaleDutch,
    dayJSLanguage: "nl",
    countryCode: "nl",
    title: "Dutch",
    direction: "ltr",
};

const english: MUILocaleData = {
    muiCore: materialLocaleEnglish,
    muiDatePicker: datePickerLocaleEnglish,
    dayJSLanguage: "en",
    countryCode: "gb",
    title: "English",
    direction: "ltr",
};

// RTL language
const hebrew: MUILocaleData = {
    muiCore: materialLocaleHebrew,
    muiDatePicker: datePickerLocaleEnglish, // no Hebrew in here 😔 very sad!
    dayJSLanguage: "he",
    countryCode: "il",
    title: "Hebrew",
    direction: "rtl",
};

export const supportedLocales: MUILocaleData[] = [english, dutch, hebrew];
