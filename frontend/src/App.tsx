import Header from "./components/Header";
import InstallPwaPrompt from "./components/InstallPwaPrompt";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import { CssBaseline, Container } from "@mui/material";
import CheckLocaleChange from "./components/CheckLocale";

const App = () => {
    const { t } = useTranslation();
    return (
        <>
            <CssBaseline />
            <Header />
            <main>
                <Container maxWidth="md" sx={{ mt: 5 }}>
                    <Outlet /> {/* Puts the element passed in the router inside of this element */}
                    <CheckLocaleChange />
                </Container>
            </main>
            <InstallPwaPrompt />
        </>
    );
};

export default App;
