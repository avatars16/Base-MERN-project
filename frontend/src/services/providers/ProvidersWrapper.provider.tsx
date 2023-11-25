import MuiProvider from "./Mui.provider";
import SnackbarProvider from "./Snackbar.provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../i18n/config";

export default function ProvidersWrapper({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient();
    return (
        <MuiProvider>
            <QueryClientProvider client={queryClient}>
                <SnackbarProvider>{children}</SnackbarProvider>
            </QueryClientProvider>
        </MuiProvider>
    );
}
