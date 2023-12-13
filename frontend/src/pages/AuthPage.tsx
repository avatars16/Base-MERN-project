import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, TextField, Typography, Box, Select, TextFieldProps } from "@mui/material";
import FormContainer from "../components/forms/FormContainer";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import GoogleAuth from "../components/GoogleAuth";
import TranslateText from "../components/shared/TranslateText";
import PasswordInput from "../components/inputs/PasswordInput";
import { FieldErrors, getHelperText, hasError } from "../utils/field-validation-errors";
import { snackbarContext } from "../services/providers/Snackbar.provider";
import useAuth from "../hooks/useAuth";
import Form, { FormFields } from "../components/forms/Form";

interface Props {
    isSignUp: Boolean;
}

const AuthScreen = ({ isSignUp }: Props) => {
    const { register, login, userInfo } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>();
    const [generalError, setGeneralError] = useState<string | undefined>();

    useEffect(() => {
        if (userInfo) navigate("/");
    }, [navigate, userInfo]);

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isSignUp) {
                const res = await register.mutateAsync(formData);
            } else {
                const res = await login.mutateAsync(formData);
            }
            navigate("/");
        } catch (err: any) {
            setGeneralError("");
            setFieldErrors(undefined);
            if (err?.success) return setGeneralError("");
            if (err?.error?.fields !== undefined) {
                setFieldErrors(err.error.fields as FieldErrors);
            } else setGeneralError(err.error.message);
        }
    };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    return (
        <FormContainer>
            <Typography variant="h4" sx={{ mb: 2 }}>
                <TranslateText tKey={isSignUp ? "authPage.register" : "authPage.login"} />
            </Typography>
            <Typography variant="body2" color="red">
                {generalError ? generalError : ""}
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
                        helperText={
                            formData.password !== formData.confirmPassword && formData.confirmPassword.length > 1
                                ? "Password do not match"
                                : ""
                        }
                    />
                )}

                <Grid container spacing={1} sx={{ justifyContent: "end", mt: 2 }}>
                    <Grid xs={12} sm={6}></Grid>
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
