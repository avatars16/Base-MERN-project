import Header from "./components/Layout/Header";
import { Container } from "@mui/material";
import App from "./App";

const AppContainer = () => {
    return (
        <>
            <Header />
            <main>
                <Container maxWidth="md" sx={{ mt: 5 }}>
                    <App />
                </Container>
            </main>
        </>
    );
};

export default AppContainer;
