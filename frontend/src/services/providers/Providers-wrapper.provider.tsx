import ReduxProvider from "../REDUX/ReduxProvider";
import MuiProvider from "./Mui.provider";
import SnackbarProvider from "./Snackbar.provider";

export default function ProvidersWrapper({ children }: { children: React.ReactNode }) {
    return (
        <ReduxProvider>
            <MuiProvider>
                <SnackbarProvider>{children}</SnackbarProvider>
            </MuiProvider>
        </ReduxProvider>
    );
}
