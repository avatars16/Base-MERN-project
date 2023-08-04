import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

const Input = ({ half }) => {
    return (
        <Grid xs={12} md={half ? 6 : 12}>
            <TextField
                name={name}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                lablel={label}
                autoFocus={autoFocus}
                type={type}
                InputProps={name === "password" && { endAdornment: <InputAdornment position="end"></InputAdornment> }}
            />
        </Grid>
    );
};

export default Input;
