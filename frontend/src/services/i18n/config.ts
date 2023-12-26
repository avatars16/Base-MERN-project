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
        debug: true,
        defaultNS: "common",
        ns: ["common", "input", "ui", "homePage", "authPage", "profilePage"],
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
            loadPath: "/assets/locals/{{ns}}/{{lng}}.json",
        },
        keySeparator: ".",
        react: {
            useSuspense: true,
        },
    });
