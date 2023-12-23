import Header from "./components/Layout/Header";
<<<<<<< HEAD
=======
import InstallPwaPrompt from "./components/InstallPwaPrompt";
>>>>>>> parent of e28f458 (dynamic import, route setup, ts build issues solved)
import { Outlet } from "react-router-dom";
import { CssBaseline, Container } from "@mui/material";
import CheckLocaleChange from "./components/CheckLocale";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const App = () => {
    return (
        <>
            <CssBaseline />
            <Header />
            <main>
                <Container maxWidth="md" sx={{ mt: 5 }}>
                    <Outlet /> {/* Puts the element passed in the router inside of this element */}
                    <CheckLocaleChange />
                </Container>
                <ReactQueryDevtools />
            </main>
<<<<<<< HEAD
=======
            <InstallPwaPrompt />
>>>>>>> parent of e28f458 (dynamic import, route setup, ts build issues solved)
        </>
    );
};

export default App;
