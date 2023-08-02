import { Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

const Hero = () => {
    return (
        <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
                MERN Authentication
            </Typography>
            <Typography variant="h5" color="textSecondary" paragraph>
                This is a boilerplate for MERN authentication that stores a JWT in an HTTP-Only cookie. It also uses
                Redux Toolkit and the React Bootstrap library
            </Typography>
            <Grid container spacing={1}>
                <Grid xs={12} sm={6}>
                    <Button fullWidth component={Link} variant="contained" to="/login" color="primary">
                        Login
                    </Button>
                </Grid>
                <Grid xs={12} sm={6}>
                    <Button component={Link} fullWidth variant="outlined" to="/register" color="primary">
                        Register
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Hero;
