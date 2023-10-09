import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { MUILocaleData, supportedLocales } from "../../theme/SupportedLocales";
import { useAppDispatch, useAppSelector } from "../../services/REDUX/hooks/reduxHooks";
import { saveLocale } from "../../services/REDUX/slices/localesSlice";
import Text from "./Text";
import "flag-icon-css/css/flag-icons.min.css";
const LocaleToggle = () => {
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
                                <MenuItem
                                    key={item.title}
                                    value={item}
                                    autoFocus={item.dayJSLanguage === locale.dayJSLanguage}>
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
        </>
    );
};

export default LocaleToggle;
