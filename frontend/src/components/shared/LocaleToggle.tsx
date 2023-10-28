import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { retrieveMUILocale, supportedLocales } from "../../theme/SupportedLocales";
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
                    <InputLabel id="demo-simple-select-label">
                        <TranslateText tKey="header.language" />
                    </InputLabel>
                    <Select
                        id="demo-simple-select"
                        value={locale.dayJSLanguage}
                        label="language"
                        variant="standard"
                        onChange={(event) => {
                            const data = event.target.value;
                            dispatch(saveLocale(retrieveMUILocale(data)));
                        }}
                        renderValue={(val) => retrieveMUILocale(val).title}>
                        {supportedLocales.map((item) => {
                            return (
                                //@ts-ignore - type problem has todo with value.
                                <MenuItem
                                    key={item.title}
                                    value={item.dayJSLanguage} //Should be changed to item.dayJSLanguage, but will never correspont with type in select
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
