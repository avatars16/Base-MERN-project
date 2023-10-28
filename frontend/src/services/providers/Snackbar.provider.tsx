// MUIWrapper.tsx file
import { createContext, useState } from "react";
import { Alert, AlertColor, Snackbar } from "@mui/material";

type SnackbarContent = {
    open: boolean;
    severity: AlertColor;
    message: string;
};

export const snackbarContext = createContext({
    setSnackbarContext: (_snackbarContent: SnackbarContent) => {},
});

export default function SnackbarProvider({ children }: { children: React.ReactNode }) {
    const [snackbarContent, setSnackbarContext] = useState<SnackbarContent>({
        open: false,
        severity: "error",
        message: "",
    });

    const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }

        setSnackbarContext((prev) => ({ ...prev, open: false }));
    };

    return (
        <snackbarContext.Provider
            value={{
                setSnackbarContext: setSnackbarContext,
            }}>
            {children}
            <Snackbar open={snackbarContent.open} autoHideDuration={6000} onClose={handleClose}>
                <Alert severity={snackbarContent.severity} onClose={handleClose}>
                    {snackbarContent.message}
                </Alert>
            </Snackbar>
        </snackbarContext.Provider>
    );
}
