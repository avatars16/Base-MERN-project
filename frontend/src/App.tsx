import Header from "./components/Layout/Header";
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
        </>
    );
};

export default App;
