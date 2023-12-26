import React from "react";
import Header from "./Header";
import { Container } from "@mui/material";
const CheckLocaleChange = React.lazy(() => import("../CheckLocale"));

type Props = {
    children: React.ReactNode;
};

const DefaultPageLayout = ({ children }: Props) => {
    return (
        <>
            <Header />
            <main>
                <Container maxWidth="md" sx={{ mt: 5 }}>
                    {children}
                    <CheckLocaleChange />
                </Container>
            </main>
        </>
    );
};

export default DefaultPageLayout;
