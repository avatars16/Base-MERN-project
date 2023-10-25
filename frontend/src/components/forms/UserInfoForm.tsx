import { Button, TextField, IconButton, InputAdornment } from "@mui/material";
import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface Props {
    handleSubmit: (event: React.FormEvent, formData: any) => void;
}
const UserInfoForm = ({ handleSubmit }: Props) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        showPassword: false,
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleTogglePasswordVisibility = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            showPassword: !prevFormData.showPassword,
        }));
    };

    return (
        <form
            onSubmit={(e) => {
                handleSubmit(e, formData);
            }}>
            <TextField
                variant="standard"
                label="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                margin="normal"
                fullWidth
                required
            />

            <TextField
                variant="standard"
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                margin="normal"
                fullWidth
                required
            />

            <TextField
                variant="standard"
                label="Password"
                name="password"
                type={formData.showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                margin="normal"
                fullWidth
                required
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleTogglePasswordVisibility}>
                                {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

            <TextField
                variant="standard"
                label="Confirm password"
                name="confirmPassword"
                type={formData.showPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                margin="normal"
                fullWidth
                required
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleTogglePasswordVisibility}>
                                {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

            <Button type="submit" variant="contained" color="primary">
                Register
            </Button>
        </form>
    );
};

export default UserInfoForm;
