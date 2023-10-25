import React, { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface PasswordInputProps {
    name: "password" | "confirmPassword";
    label: JSX.Element;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    changeVisibility: boolean;
}

const PasswordInput = ({ name, label, value, onChange, changeVisibility }: PasswordInputProps) => {
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
            value={value}
            onChange={onChange}
            margin="normal"
            fullWidth
            required
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
