import React from "react";
import ReactDOM from "react-dom/client";
import store from "./data/store.ts";
import { Provider } from "react-redux";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import HomeScreen from "./screens/HomeScreen.tsx";
import AuthScreen from "./screens/AuthScreen.tsx";
import ProfileScreen from "./screens/ProfileScreen.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import MUIWrapper from "./components/MUIWrapper.tsx";

i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(HttpApi)
    .init({
        fallbackLng: "en",
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

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index={true} path="/" element={<HomeScreen />} />
            <Route path="/login" element={<AuthScreen isSignUp={false} />} />
            <Route path="/register" element={<AuthScreen isSignUp={true} />} />

            {/* Private route, user needs to be logged in */}
            <Route path="" element={<PrivateRoute />}>
                <Route path="/profile" element={<ProfileScreen />} />
            </Route>
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <React.StrictMode>
            <MUIWrapper>
                <RouterProvider router={router} />
            </MUIWrapper>
        </React.StrictMode>
    </Provider>
);
