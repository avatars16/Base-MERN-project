import React from "react";
import { Button, Typography, Grid } from "@mui/material";
import FormContainer from "./FormContainer";
import { FieldErrors, getHelperText, hasError } from "../../utils/field-validation-errors";
import TranslateText from "../shared/TranslateText";

export type FormFields<T extends React.ComponentType<T>> = {
    name: string;
    translateKey: string;
    component: T;
    props?: React.ComponentProps<T>;
};

export type GeneralError = string;

type FormButton = {
    textKey: string;
    disabled: boolean;
};

type Props = {
    fields: FormFields<any>[];
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
                            helperText={field.props.helperText || getHelperText(fieldErrors, field.name)}
                            {...field.props}></Component>
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
            </form>
        </FormContainer>
    );
};

export default Form;
