import { Container, Paper } from "@mui/material";

interface Props {
    children: React.ReactNode;
}

const FormContainer = ({ children }: Props) => {
    return (
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ p: 4 }}>
                {children}
            </Paper>
        </Container>
    );
};

export default FormContainer;
