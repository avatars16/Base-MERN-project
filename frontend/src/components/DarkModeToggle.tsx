import React from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Box, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, useTheme } from "@mui/material";
import { MUIWrapperContext } from "./MUIWrapper";
import { MUILocaleData, supportedLocales } from "../theme/SupportedLocales";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { saveLocale } from "../slices/localesSlice";
import Text from "./Text";
import "flag-icon-css/css/flag-icons.min.css";
const DarkModeToggle = () => {
    const theme = useTheme();
    const { toggleColorMode } = React.useContext(MUIWrapperContext);
    const { locale } = useAppSelector((state) => state.locales);
    const dispatch = useAppDispatch();
    return (
        <>
            <Box sx={{ minWidth: 120, color: "inherit" }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                        <Text tKey="header.language" />
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-selectd"
                        value={locale}
                        renderValue={(val) => val.title}
                        label="Language"
                        variant="filled"
                        onChange={(event: SelectChangeEvent<MUILocaleData>) => {
                            const data = event.target.value;
                            dispatch(saveLocale(data as MUILocaleData));
                        }}>
                        {supportedLocales.map((item) => {
                            return (
                                // @ts-ignore - necessary to load object into value
                                <MenuItem key={item.title} value={item}>
                                    <Box
                                        className={`flag-icon flag-icon-${item.countryCode}`}
                                        sx={{ marginRight: 0.5 }}></Box>
                                    {item.title}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            </Box>
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
