import React, { ReactElement } from "react";
import NotFoundPage from "./pages/NotFoundPage";
const AuthScreen = React.lazy(() => import("./pages/AuthPage"));
const ProfileScreen = React.lazy(() => import("./pages/ProfilePage"));
const HomeScreen = React.lazy(() => import("./pages/HomePage"));

type Route = {
    path: string;
    element: ReactElement;
    index?: false;
};

export const privateRoutes: Route[] = [
    {
        path: "/profile",
        element: <ProfileScreen />,
    },
];

export const publicRoutes = [
    {
        index: true,
        path: "/",
        element: <HomeScreen />,
    },
    {
        path: "/register",
        element: <AuthScreen isSignUp={true} />,
    },
    {
        path: "/login",
        element: <AuthScreen isSignUp={false} />,
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
];
