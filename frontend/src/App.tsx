import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { CssBaseline, Container, ThemeProvider } from "@mui/material";
import InstallPwaPrompt from "./components/InstallPwaPrompt";
import { ThemeContextProvider, useThemeContext } from "./theme/ThemeContextProvider";

const App = () => {
    const { theme } = useThemeContext();

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Header />
                <main>
                    <Container maxWidth="md" sx={{ mt: 5 }}>
                        <Outlet /> {/* Puts the element passed in the router inside of this element */}
                    </Container>
                </main>
                <InstallPwaPrompt />
            </ThemeProvider>
        </>
    );
};

export default App;
