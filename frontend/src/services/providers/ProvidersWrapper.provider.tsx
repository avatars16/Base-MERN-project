import MuiProvider from "./Mui.provider";
import SnackbarProvider from "./Snackbar.provider";
import QueryClientWrapper from "./QueryClient.provider";
import "../i18n/config";
import React from "react";

export default function ProvidersWrapper({ children }: { children: React.ReactNode }) {
    return (
        <MuiProvider>
            <QueryClientWrapper>
                <SnackbarProvider>{children}</SnackbarProvider>
            </QueryClientWrapper>
        </MuiProvider>
    );
}
