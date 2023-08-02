import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import FormContainer from "../components/FormContainer";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { Button, TextField, IconButton, InputAdornment, Typography, Grid, Snackbar, Alert, Box } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LoginScreen = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        showPassword: false,
    });
    const [formFeedback, setFormFeedback] = useState({ open: false, errorMessage: "" });

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

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useAppSelector((state) => state.auth);
    useEffect(() => {
        if (userInfo) {
            navigate("/");
        }
    }, [navigate, userInfo]);

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await login({ ...formData }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate("/");
        } catch (err: any) {
            setFormFeedback({ open: true, errorMessage: err?.data?.message || err.error });
        }
        console.log("submit");
    };
    return (
        <FormContainer>
            <Typography variant="h4">Login</Typography>
            <form
                onSubmit={(e) => {
                    submitHandler(e);
                }}>
                <TextField
                    variant="standard"
                    label="Email"
                    InputLabelProps={{ shrink: true }}
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

                <Grid container spacing={1} sx={{ justifyContent: "end", mt: 2 }}>
                    <Grid xs={12} sm={6}>
                        <Button type="submit" variant="contained" color="primary" disabled={isLoading} fullWidth>
                            Login
                        </Button>
                    </Grid>
                </Grid>
                <Box sx={{ mt: 2 }}>
                    <Typography paragraph>
                        Don't have an account? <Link to="/register">Register here!</Link>
                    </Typography>
                </Box>
            </form>
            <Snackbar open={formFeedback.open} autoHideDuration={6000}>
                <Alert severity="error">{formFeedback.errorMessage}</Alert>
            </Snackbar>
        </FormContainer>
    );
};

export default LoginScreen;
