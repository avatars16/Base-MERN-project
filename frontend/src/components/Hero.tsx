import { Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Text from "./shared/Text";

const Hero = () => {
    return (
        <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
                <Text tKey="header.title" />
            </Typography>
            <Typography variant="h5" color="textSecondary" paragraph>
                <Text tKey="hero.text" />
            </Typography>
            <Grid container spacing={1}>
                <Grid xs={12} sm={6}>
                    <Button fullWidth component={Link} variant="contained" to="/login" color="primary">
                        <Text tKey="authPage.login" />
                    </Button>
                </Grid>
                <Grid xs={12} sm={6}>
                    <Button component={Link} fullWidth variant="outlined" to="/register" color="primary">
                        <Text tKey="authPage.register" />
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Hero;
