import MuiProvider from "./Mui.provider";
import SnackbarProvider from "./Snackbar.provider";
import "../i18n/config";
import QueryClientProvider from "./QueryClient.provider";

export default function ProvidersWrapper({ children }: { children: React.ReactNode }) {
    return (
        <MuiProvider>
            <QueryClientProvider>
                <SnackbarProvider>{children}</SnackbarProvider>
            </QueryClientProvider>
        </MuiProvider>
    );
}
