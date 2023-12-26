import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import FormContainer from "../../../components/forms/FormContainer";
import { TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import useAuth from "../../../hooks/useAuth";
import { Controller, useForm } from "react-hook-form";
import { UserCreateClient, userCreateClientSchema } from "../../../../../backend/types/schemas/User.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import TranslateText from "../../../components/shared/TranslateText";
import PasswordInput from "../../../components/inputs/PasswordInput";
import { handleFormErrors } from "../../../utils/handle-form-errors";
import { snackbarContext } from "../../../services/providers/Snackbar.provider";
import { ApiReponseError } from "../../../../../backend/types/api-error-response";
import ErrorButton from "../../UI/buttons/ErrorButton";
import PrimaryButton from "../../UI/buttons/PrimaryButton";
import { useTranslation } from "react-i18next";

const UpdateUserForm = () => {
    const { userInfo, updateUser, deleteUser } = useAuth();
    const { setSnackbarContext } = useContext(snackbarContext);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const {
        control,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<UserCreateClient>({
        mode: "onChange",
        resolver: zodResolver(userCreateClientSchema),
    });
    useEffect(() => {}, [userInfo]);

    const submitHandler = async (data: UserCreateClient) => {
        try {
            await updateUser.mutateAsync(data);
            navigate("/");
        } catch (err: unknown) {
            handleFormErrors<UserCreateClient>(err, setError, setSnackbarContext);
        }
    };

    const deleteUserHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!confirm(t("profilePage:confirmDeletePrompt"))) return;
        try {
            await deleteUser.mutateAsync();
            navigate("/");
        } catch (err: unknown) {
            const error = err as ApiReponseError;
            setSnackbarContext({ open: true, message: error?.error.message, severity: "error" });
        }
    };

    return (
        <FormContainer formProps={{ onSubmit: handleSubmit(submitHandler) }}>
            <Typography variant="h4">
                <TranslateText tKey="profilePage:profile" />
            </Typography>
            <Controller
                name="name"
                control={control}
                defaultValue={userInfo?.name}
                render={({ field: { ref, ...field } }) => (
                    <TextField
                        variant="standard"
                        label={<TranslateText tKey="name" params={{ ns: "input" }} />}
                        InputLabelProps={{ shrink: true }}
                        margin="normal"
                        fullWidth
                        required
                        error={Boolean(errors.name)}
                        helperText={errors.name?.message}
                        {...field}
                    />
                )}
            />
            <Controller
                name="email"
                control={control}
                defaultValue={userInfo?.email}
                render={({ field: { ref, ...field } }) => (
                    <TextField
                        variant="standard"
                        label={<TranslateText tKey="email" params={{ ns: "input" }} />}
                        InputLabelProps={{ shrink: true }}
                        margin="normal"
                        fullWidth
                        required
                        error={Boolean(errors.email)}
                        helperText={errors.email?.message}
                        {...field}
                    />
                )}
            />
            <Controller
                name="password"
                control={control}
                render={({ field: { ref, ...field } }) => (
                    <PasswordInput
                        label={<TranslateText tKey="input:password" />}
                        changeVisibility={true}
                        error={Boolean(errors.password)}
                        helperText={errors.password?.message}
                        {...field}
                    />
                )}
            />
            <Controller
                name="confirmPassword"
                control={control}
                render={({ field: { ref, ...field } }) => (
                    <PasswordInput
                        label={<TranslateText tKey="input:confirmPassword" />}
                        changeVisibility={false}
                        error={Boolean(errors.confirmPassword)}
                        helperText={errors.confirmPassword?.message}
                        {...field}
                    />
                )}
            />
            <Grid container spacing={1} sx={{ mt: 2 }}>
                <Grid xs={12} sm={6}>
                    <ErrorButton
                        buttonProps={{ onClick: deleteUserHandler }}
                        tKey={"ui:delete"}
                        loading={deleteUser.isPending}
                    />
                </Grid>
                <Grid xs={12} sm={6}>
                    <PrimaryButton buttonProps={{ type: "submit" }} tKey={"ui:update"} loading={updateUser.isPending} />
                </Grid>
            </Grid>
        </FormContainer>
    );
};

export default UpdateUserForm;
