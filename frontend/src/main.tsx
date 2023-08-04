import React from "react";
import ReactDOM from "react-dom/client";
import store from "./data/store.ts";
import { Provider } from "react-redux";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import dotenv from "dotenv";
import "./index.css";
import HomeScreen from "./screens/HomeScreen.tsx";
import AuthScreen from "./screens/AuthScreen.tsx";
import ProfileScreen from "./screens/ProfileScreen.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";

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
            <RouterProvider router={router} />
        </React.StrictMode>
    </Provider>
);
