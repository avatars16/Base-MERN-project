import { useState, useEffect } from "react";
import { Snackbar, Alert, Button, IconButton } from "@mui/material";
import IosShareIcon from "@mui/icons-material/IosShare";
import CloseIcon from "@mui/icons-material/Close";

const InstallPwaPrompt = () => {
    const [promptEvent, setPromptEvent] = useState<Event | null>(null);
    const [iosOpen, setIosOpen] = useState(false);
    const [otherPlatformsOpen, setOtherPlatformsOpen] = useState(true);

    useEffect(() => {
        // Check if beforeinstallprompt event is supported
        if ("beforeinstallprompt" in window) {
            setOtherPlatformsOpen(true);
        }
        const userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.includes("iphone") && userAgent.includes("safari")) {
            setIosOpen(true);
        }
    }, []);

    useEffect(() => {
        if (otherPlatformsOpen) {
            window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
            return () => {
                window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
            };
        }
    }, [otherPlatformsOpen]);

    const handleBeforeInstallPrompt = (e: Event) => {
        e.preventDefault(); // Prevent the default behavior
        setPromptEvent(e); // Store the event for later use
    };

    const handleInstallPWA = async () => {
        if (promptEvent) {
            // Show the installation prompt
            (promptEvent as any).prompt();

            // Wait for the user to respond to the prompt
            const choiceResult = await (promptEvent as any).userChoice;
            if (choiceResult.outcome === "accepted") {
                // User accepted the prompt
                console.log("PWA installed successfully!");
            } else {
                // User dismissed the prompt
                console.log("PWA installation cancelled.");
            }

            // Reset the prompt event
            setPromptEvent(null);
        }
    };

    const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }

        setIosOpen(false);
        setOtherPlatformsOpen(false);
    };
    const closeAndInstallButtons = (
        <>
            <Button color="secondary" size="small" onClick={handleInstallPWA}>
                Install!
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </>
    );

    return (
        <>
            <Snackbar
                open={otherPlatformsOpen}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
                <Alert
                    onClose={handleSnackbarClose}
                    severity="info"
                    sx={{ width: "100%" }}
                    action={closeAndInstallButtons}>
                    View this website as an app?
                </Alert>
            </Snackbar>
            <Snackbar
                open={iosOpen}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                sx={{ width: "90vw" }}>
                <Alert onClose={handleSnackbarClose} severity="info" sx={{ width: "100%" }}>
                    You can install this app by clicking on <IosShareIcon fontSize="small" />
                    'share' and then "Add to homescreen"!
                </Alert>
            </Snackbar>
        </>
    );
};

export default InstallPwaPrompt;
