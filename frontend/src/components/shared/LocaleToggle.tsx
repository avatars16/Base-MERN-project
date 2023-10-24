import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { MUILocaleData, supportedLocales } from "../../theme/SupportedLocales";
import { useAppDispatch, useAppSelector } from "../../services/REDUX/hooks/reduxHooks";
import { saveLocale } from "../../services/REDUX/slices/localesSlice";
import TranslateText from "./TranslateText";
import "flag-icon-css/css/flag-icons.min.css";
const LocaleToggle = () => {
    const { locale } = useAppSelector((state) => state.locales);
    const dispatch = useAppDispatch();
    return (
        <>
            <Box sx={{ minWidth: 120, color: "inherit" }}>
                <FormControl fullWidth>
                    {/* <InputLabel id="demo-simple-select-label">
                        <TranslateText tKey="header.language" />
                    </InputLabel> */}
                    <Select
                        id="demo-simple-selectd"
                        value={locale}
                        renderValue={(val) => val.title}
                        label="language"
                        variant="standard"
                        onChange={(event: SelectChangeEvent<MUILocaleData>) => {
                            const data = event.target.value;
                            dispatch(saveLocale(data as MUILocaleData));
                        }}>
                        {supportedLocales.map((item: MUILocaleData) => {
                            return (
                                <MenuItem
                                    key={item.title}
                                    value={item.dayJSLanguage}
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
