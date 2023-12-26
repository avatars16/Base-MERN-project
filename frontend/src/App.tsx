import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import PrivateRoute from "./components/PrivateRoute";
import { privateRoutes, publicRoutes } from "./routes";

const App = () => {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/">
                        <Route element={<PrivateRoute />}>
                            {privateRoutes.map((route) => (
                                <Route key={route.path} path={route.path} element={route.element} />
                            ))}
                        </Route>
                        {publicRoutes.map((route) => (
                            <Route key={route.path} index={route.index} path={route.path} element={route.element} />
                        ))}
                    </Route>
                </Routes>
            </Suspense>
        </>
    );
};

export default App;
