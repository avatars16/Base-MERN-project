import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

import App from "./App.tsx";
import "./index.css";
import ProvidersWrapper from "./services/providers/ProvidersWrapper.provider.tsx";

import AuthScreen from "./pages/AuthPage.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";

import { privateRoutes, publicRoutes } from "./routes.tsx";
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route element={<PrivateRoute />}>
                {privateRoutes.map((route) => (
                    <Route key={route.path} path={route.path} element={route.element} />
                ))}
            </Route>
            {publicRoutes.map((route) => (
                <Route key={route.path} index={route.index} path={route.path} element={route.element} />
            ))}
            <Route path="/login" element={<AuthScreen isSignUp={false} />} />
            <Route path="/register" element={<AuthScreen isSignUp={true} />} />
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
