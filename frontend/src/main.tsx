import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import ProvidersWrapper from "./services/providers/ProvidersWrapper.provider.tsx";
import { CssBaseline } from "@mui/material";
import AppContainer from "./AppContainer.tsx";
const ReactQueryDevtoolsProduction = React.lazy(() =>
    import("@tanstack/react-query-devtools").then((d) => ({
        default: d.ReactQueryDevtools,
    }))
);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ProvidersWrapper>
            <CssBaseline />
            <BrowserRouter>
                <AppContainer />
            </BrowserRouter>
            <ReactQueryDevtoolsProduction />
        </ProvidersWrapper>
    </React.StrictMode>
);
