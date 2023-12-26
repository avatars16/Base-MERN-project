import { Button, Paper, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import TranslateText from "./shared/TranslateText";

const Hero = () => {
    return (
        <>
            <Paper elevation={3} sx={{ p: 4 }} id="titleCard">
                <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
                    <TranslateText tKey="common:title" />
                </Typography>
                <Typography variant="h5" color="textSecondary" paragraph>
                    <TranslateText tKey="homePage:hero.text" />
                </Typography>

                <Grid container spacing={1}>
                    <Grid xs={12} sm={6}>
                        <Button fullWidth component={Link} variant="contained" to="/login" color="primary">
                            <TranslateText tKey="authPage:login" />
                        </Button>
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <Button component={Link} fullWidth variant="outlined" to="/register" color="primary">
                            <TranslateText tKey="authPage:register" />
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};

export default Hero;
