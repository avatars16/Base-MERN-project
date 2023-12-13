import React from "react";
import { Button, TextField, Typography, Switch, Grid, Box } from "@mui/material";
import FormContainer from "./FormContainer";
import { FieldErrors, getHelperText, hasError } from "../../utils/field-validation-errors";
import TranslateText from "../shared/TranslateText";
import { Link } from "react-router-dom";

export type FormFields<T extends React.ComponentType<any> = any> = {
    name: string;
    translateKey: string;
    component: T;
    props?: React.ComponentProps<T>;
};

export type GeneralError = string | null;

type FormButton = {
    textKey: string;
    disabled: boolean;
};

type Props = {
    fields: FormFields<typeof Switch | typeof TextField>[];
    submitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
    formData?: any;
    setFormData?: (formData: any) => void;
    fieldErrors?: FieldErrors;
    generalError?: GeneralError;
    titleKey: string;
    primaryButton: FormButton;
    secondaryButton?: FormButton;
};

const Form = ({
    fields,
    submitHandler,
    generalError,
    fieldErrors,
    titleKey,
    primaryButton,
    secondaryButton,
}: Props) => {
    return (
        <FormContainer>
            <Typography variant="h4" sx={{ mb: 2 }}>
                {<TranslateText tKey={titleKey} />}
            </Typography>
            <Typography variant="body2" color="red">
                {generalError ? generalError : ""}
            </Typography>
            <form onSubmit={submitHandler}>
                {fields.map((field) => {
                    const Component = field.component;
                    return (
                        <Component
                            key={field.name}
                            error={hasError(fieldErrors, field.name)}
                            helperText={getHelperText(fieldErrors, field.name)}></Component>
                    );
                })}
                <Grid container spacing={1} sx={{ justifyContent: "end", mt: 2 }}>
                    <Grid xs={12} sm={6}>
                        <Button
                            type="button"
                            variant="contained"
                            color="primary"
                            disabled={primaryButton.disabled}
                            fullWidth>
                            <TranslateText tKey={primaryButton.textKey} />
                        </Button>
                    </Grid>
                    <Grid xs={12} sm={6}>
                        {secondaryButton && (
                            <Button
                                type="button"
                                variant="contained"
                                color="primary"
                                disabled={secondaryButton.disabled}
                                fullWidth>
                                <TranslateText tKey={secondaryButton.textKey} />
                            </Button>
                        )}
                    </Grid>
                </Grid>
                <Box sx={{ mt: 2 }}>
                    {/* <Typography paragraph>
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
                    </Typography> */}
                </Box>
            </form>
        </FormContainer>
    );
};

export default Form;
