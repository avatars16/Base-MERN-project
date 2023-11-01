import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, TextField, Typography, Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../services/REDUX/hooks/reduxHooks";
import { setCredentials } from "../services/REDUX/slices/authSlice";
import { useRegisterMutation, useLoginMutation } from "../services/REDUX/slices/usersApiSlice";
import FormContainer from "../components/forms/FormContainer";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import GoogleAuth from "../components/GoogleAuth";
import TranslateText from "../components/shared/TranslateText";
import PasswordInput from "../components/inputs/PasswordInput";
import { FieldErrors, getHelperText, hasError } from "../utils/field-validation-errors";
import { snackbarContext } from "../services/providers/Snackbar.provider";

interface Props {
    isSignUp: Boolean;
}

const AuthScreen = ({ isSignUp }: Props) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const { setSnackbarContext } = useContext(snackbarContext);
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>();

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [register, registerProp] = useRegisterMutation();
    const [login, loginProp] = useLoginMutation();
    const { userInfo } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate("/");
        }
    }, [navigate, userInfo]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };
    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isSignUp) {
                const res = await register({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                }).unwrap();
                dispatch(setCredentials({ ...res }));
            } else {
                const res = await login({ ...formData }).unwrap();
                dispatch(setCredentials({ ...res }));
            }
            navigate("/");
        } catch (err: any) {
            if (err?.data?.error?.success) return;
            if (err?.data?.error?.fields.length != 0) setFieldErrors(err?.data?.error?.fields as FieldErrors);
            setSnackbarContext({ open: true, severity: "error", message: err?.data?.error?.message || err.error });
        }
    };

    return (
        <FormContainer>
            <Typography variant="h4" sx={{ mb: 2 }}>
                {isSignUp ? <TranslateText tKey="authPage.register" /> : <TranslateText tKey="authPage.login" />}
            </Typography>
            <form
                onSubmit={(e) => {
                    submitHandler(e);
                }}>
                {isSignUp && (
                    <TextField
                        variant="standard"
                        label={<TranslateText tKey="formFields.name" />}
                        InputLabelProps={{ shrink: true }}
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        margin="normal"
                        fullWidth
                        required={!!isSignUp}
                        error={hasError(fieldErrors, "name")}
                        helperText={getHelperText(fieldErrors, "name")}
                    />
                )}

                <TextField
                    variant="standard"
                    label={<TranslateText tKey="formFields.email" />}
                    InputLabelProps={{ shrink: true }}
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    margin="normal"
                    fullWidth
                    required
                    error={hasError(fieldErrors, "email")}
                    helperText={getHelperText(fieldErrors, "email")}
                />

                <PasswordInput
                    name="password"
                    label={<TranslateText tKey="formFields.password" />}
                    value={formData.password}
                    onChange={handleInputChange}
                    changeVisibility={true}
                    error={hasError(fieldErrors, "password")}
                    helperText={getHelperText(fieldErrors, "password")}
                />
                {isSignUp && (
                    <PasswordInput
                        name="confirmPassword"
                        label={<TranslateText tKey="formFields.confirmPassword" />}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        changeVisibility={false}
                        error={formData.password !== formData.confirmPassword && formData.confirmPassword.length > 1}
                        helperText="Password do not match"
                    />
                )}

                <Grid container spacing={1} sx={{ justifyContent: "end", mt: 2 }}>
                    <Grid xs={12} sm={6}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={registerProp.isLoading || loginProp.isLoading}
                            fullWidth>
                            {isSignUp ? (
                                <TranslateText tKey="authPage.register" />
                            ) : (
                                <TranslateText tKey="authPage.login" />
                            )}
                        </Button>
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <GoogleAuth />
                    </Grid>
                </Grid>
                <Box sx={{ mt: 2 }}>
                    <Typography paragraph>
                        {isSignUp ? (
                            <>
                                <TranslateText tKey="authPage.alreadyAccount" />{" "}
                                <Link to="/login">
                                    <TranslateText tKey="authPage.loginHere" />!
                                </Link>
                            </>
                        ) : (
                            <>
                                <TranslateText tKey="authPage.noAccount" />{" "}
                                <Link to="/register">
                                    <TranslateText tKey="authPage.registerHere" />!
                                </Link>
                            </>
                        )}
                    </Typography>
                </Box>
            </form>
        </FormContainer>
    );
};

export default AuthScreen;
