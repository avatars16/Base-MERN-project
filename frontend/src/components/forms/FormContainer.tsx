import { Container, Paper } from "@mui/material";

interface Props {
    children: React.ReactNode;
    formProps: React.ComponentProps<"form">;
}

const FormContainer = ({ children, formProps }: Props) => {
    return (
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ padding: 4 }}>
                <form {...formProps}>{children}</form>
            </Paper>
        </Container>
    );
};

export default FormContainer;
