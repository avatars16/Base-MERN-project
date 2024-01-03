import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import ProvidersWrapper from "./services/providers/ProvidersWrapper.provider.tsx";
import App from "./App.tsx";
import { CssBaseline } from "@mui/material";
let ReactQueryDevtools = null;
if (!import.meta.env.PROD) {
    ReactQueryDevtools = React.lazy(() =>
        import("@tanstack/react-query-devtools").then((d) => ({
            default: d.ReactQueryDevtools,
        }))
    );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ProvidersWrapper>
            <BrowserRouter>
                <CssBaseline />
                {ReactQueryDevtools && <ReactQueryDevtools />}
                <App />
            </BrowserRouter>
        </ProvidersWrapper>
    </React.StrictMode>
);
