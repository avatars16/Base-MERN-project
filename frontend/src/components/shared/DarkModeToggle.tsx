import React from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Box, IconButton, useTheme } from "@mui/material";
import { muiProviderContext } from "../../services/providers/MuiProvider";
import "flag-icon-css/css/flag-icons.min.css";
const DarkModeToggle = () => {
    const theme = useTheme();
    const { toggleColorMode } = React.useContext(muiProviderContext);
    return (
        <>
            <Box>
                <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
                    {theme.palette.mode}
                    {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
            </Box>
        </>
    );
};

export default DarkModeToggle;
