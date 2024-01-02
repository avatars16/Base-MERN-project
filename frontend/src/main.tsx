import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import ProvidersWrapper from "./services/providers/ProvidersWrapper.provider.tsx";
import App from "./App.tsx";
import { CssBaseline } from "@mui/material";
import { Helmet } from "react-helmet";
const ReactQueryDevtools = React.lazy(() =>
    import("@tanstack/react-query-devtools").then((d) => ({
        default: d.ReactQueryDevtools,
    }))
);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ProvidersWrapper>
            <BrowserRouter>
                <CssBaseline />
                <Helmet>
                    <title>Mern Auth</title>
                </Helmet>
                {import.meta.env.PROD ? null : <ReactQueryDevtools />}
                <App />
            </BrowserRouter>
        </ProvidersWrapper>
    </React.StrictMode>
);
