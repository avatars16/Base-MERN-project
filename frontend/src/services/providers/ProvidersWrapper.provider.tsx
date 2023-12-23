import MuiProvider from "./Mui.provider";
import SnackbarProvider from "./Snackbar.provider";
import "../i18n/config";
import QueryClientWrapper from "./QueryClient.provider";

export default function ProvidersWrapper({ children }: { children: React.ReactNode }) {
    return (
        <MuiProvider>
            <QueryClientWrapper>
                <SnackbarProvider>{children}</SnackbarProvider>
            </QueryClientWrapper>
        </MuiProvider>
    );
}
