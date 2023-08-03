import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { CssBaseline, Container } from "@mui/material";
import InstallPwaPrompt from "./components/InstallPwaPrompt";

const App = () => {
    return (
        <>
            <CssBaseline />
            <Header />
            <main>
                <Container maxWidth="md" sx={{ mt: 5 }}>
                    <Outlet /> {/* Puts the element passed in the router inside of this element */}
                </Container>
            </main>
            <InstallPwaPrompt />
        </>
    );
};

export default App;
