import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import HomeScreen from "./screens/HomeScreen.tsx";
import AuthScreen from "./screens/AuthScreen.tsx";
import ProfileScreen from "./screens/ProfileScreen.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import "./services/i18n/config.ts";
import ProvidersWrapper from "./services/providers/providers-wrapper.provider.tsx";

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
    <React.StrictMode>
        <ProvidersWrapper>
            <RouterProvider router={router} />
        </ProvidersWrapper>
    </React.StrictMode>
);
