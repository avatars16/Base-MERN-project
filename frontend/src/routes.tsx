import { ReactElement } from "react";
import AuthScreen from "./pages/AuthPage";
import ProfileScreen from "./pages/ProfilePage";
import HomeScreen from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

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
        path: "/signup",
        element: <AuthScreen isSignUp={false} />,
    },
    {
        path: "/signin",
        element: <AuthScreen isSignUp={true} />,
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
];
