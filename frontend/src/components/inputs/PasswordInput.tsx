import { useState } from "react";
import { TextField, IconButton, InputAdornment, TextFieldProps } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default PasswordInput;
