import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

//Tutorial: https://www.youtube.com/watch?v=w04LXKlusCQ&t
export default i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(HttpApi)
    .init({
        fallbackLng: "nl",
        detection: {
            order: [
                "querystring",
                "cookie",
                "localStorage",
                "sessionStorage",
                "navigator",
                "htmlTag",
                "path",
                "subdomain",
            ],
        },
        backend: {
            loadPath: "/assets/locals/{{lng}}/translation.json",
        },
        keySeparator: ".",
        react: {
            useSuspense: false,
        },
    });
