import { Button, Paper, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import TranslateText from "./shared/TranslateText";

const Hero = () => {
    return (
        <>
            <Paper>
                <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
                    Menu
                </Typography>
                <Stack direction="column" spacing={2} mb={"sm"}>
                    <a href="#titleCard">Title card</a>
                    <a href="#somethingElse">Tweede kaartje</a>
                </Stack>
            </Paper>
            <Paper elevation={3} sx={{ p: 4, mt: 100 }} id="titleCard">
                <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
                    <TranslateText tKey="header.title" />
                </Typography>
                <Typography variant="h5" color="textSecondary" paragraph>
                    <TranslateText tKey="hero.text" />
                </Typography>

                <Grid container spacing={1}>
                    <Grid xs={12} sm={6}>
                        <Button fullWidth component={Link} variant="contained" to="/login" color="primary">
                            <TranslateText tKey="authPage.login" />
                        </Button>
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <Button component={Link} fullWidth variant="outlined" to="/register" color="primary">
                            <TranslateText tKey="authPage.register" />
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            <Paper elevation={3} sx={{ p: 4, marginTop: 100 }} id="somethingElse">
                <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
                    Een ander stukje tekst hier
                </Typography>
                <Typography variant="h5" color="textSecondary" paragraph>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos at doloribus illo earum tenetur
                    cumque pariatur debitis, aliquid voluptatibus molestias voluptas corrupti labore reiciendis quia
                    eaque consequatur ad aut libero!
                </Typography>
                <Grid container spacing={1}>
                    <Grid xs={12} sm={6}>
                        <Button fullWidth component={Link} variant="contained" to="/login" color="primary">
                            <TranslateText tKey="authPage.login" />
                        </Button>
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <Button component={Link} fullWidth variant="outlined" to="/register" color="primary">
                            <TranslateText tKey="authPage.register" />
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};

export default Hero;
