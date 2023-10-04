import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/forms/FormContainer";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { setCredentials, logout } from "../slices/authSlice";
import { useUpdateUserMutation, useDeleteUserMutation } from "../slices/usersApiSlice";
import { Button, TextField, IconButton, InputAdornment, Typography, Snackbar, Alert } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

const ProfileScreen = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        showPassword: false,
        showConfirmPassword: false,
    });

    const [passwordsMatch, setPasswordMatch] = useState(true);

    const [formFeedback, setFormFeedback] = useState({ open: false, errorMessage: "" });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleTogglePasswordVisibility = () => {
        if (formData.showConfirmPassword && !formData.showPassword) return;
        setFormData((prevFormData) => ({
            ...prevFormData,
            showPassword: !prevFormData.showPassword,
        }));
    };

    const handleToggleConfirmPasswordVisibility = () => {
        if (!formData.showConfirmPassword && formData.showPassword) return;
        setFormData((prevFormData) => ({
            ...prevFormData,
            showConfirmPassword: !prevFormData.showConfirmPassword,
        }));
    };

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [register, { isLoading }] = useUpdateUserMutation();
    const [deleteUser] = useDeleteUserMutation();
    const { userInfo } = useAppSelector((state) => state.auth);
    useEffect(() => {
        setFormData((prevFormData) => ({ ...prevFormData, name: userInfo.name }));
        setFormData((prevFormData) => ({ ...prevFormData, email: userInfo.email }));
    }, [userInfo.setName, userInfo.setEmail]);

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) return setPasswordMatch(false);
        try {
            const res = await register({
                _id: userInfo._id,
                name: formData.name,
                email: formData.email,
                password: formData.password,
            }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate("/");
        } catch (err: any) {
            setFormFeedback({ open: true, errorMessage: err?.data?.message || err.error });
        }
    };

    const deleteUserHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!confirm("Are you sure you want to delete your account?")) return;
        try {
            await deleteUser({
                _id: userInfo._id,
            }).unwrap();
            dispatch(logout());
            navigate("/");
        } catch (err: any) {
            setFormFeedback({ open: true, errorMessage: err?.data?.message || err.error });
        }
    };

    return (
        <FormContainer>
            <Typography variant="h4">Update Profile</Typography>
            <form
                onSubmit={(e) => {
                    submitHandler(e);
                }}>
                <TextField
                    variant="standard"
                    label="Name"
                    InputLabelProps={{ shrink: true }}
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

                <TextField
                    variant="standard"
                    label="Confirm password"
                    name="confirmPassword"
                    type={formData.showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    margin="normal"
                    fullWidth
                    error={!passwordsMatch}
                    helperText={!passwordsMatch && "Passwords don't match"}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleToggleConfirmPasswordVisibility}>
                                    {formData.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Grid container spacing={1} sx={{ mt: 2 }}>
                    <Grid xs={12} sm={6}>
                        <Button
                            variant="contained"
                            color="error"
                            disabled={isLoading}
                            onClick={deleteUserHandler}
                            fullWidth>
                            Delete account
                        </Button>
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <Button type="submit" variant="contained" color="primary" disabled={isLoading} fullWidth>
                            Update Profile
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Snackbar open={formFeedback.open} autoHideDuration={6000}>
                <Alert severity="error">{formFeedback.errorMessage}</Alert>
            </Snackbar>
        </FormContainer>
    );
};

export default ProfileScreen;
