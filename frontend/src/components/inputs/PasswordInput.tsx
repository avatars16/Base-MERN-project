import { useState } from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

type PasswordInputProps = {
    name: "password" | "confirmPassword";
    label: JSX.Element;
    changeVisibility: boolean;
} & TextFieldProps;

const PasswordInput = ({ name, label, changeVisibility, ...textFieldProps }: PasswordInputProps) => {
    const [showPassword, changeShowPassword] = useState(false);
    const handleTogglePasswordVisibility = () => {
        if (!changeVisibility) return;
        changeShowPassword((prevFormData) => !prevFormData);
    };
    return (
        <TextField
            variant="standard"
            label={label}
            name={name}
            type={showPassword ? "text" : "password"}
            InputLabelProps={{ shrink: true }}
            margin="normal"
            fullWidth
            required
            {...textFieldProps}
            InputProps={{
                endAdornment: changeVisibility && (
                    <InputAdornment position="end">
                        <IconButton onClick={handleTogglePasswordVisibility}>
                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default PasswordInput;
