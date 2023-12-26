import { FieldValues, UseFormSetError, set } from "react-hook-form";
import { SetSnackbarContext } from "../services/providers/Snackbar.provider";
import { ApiReponseError } from "../../../backend/types/api-error-response";

export const handleFormErrors: <T extends FieldValues>(
    error: unknown,
    setError: UseFormSetError<T>,
    setSnackbarContext: SetSnackbarContext
) => void = (error, setError, setSnackbarContext) => {
    const ApiError = error as ApiReponseError;
    if (ApiError.success) return;
    if (ApiError.error && "fields" in ApiError.error && ApiError.error.fields) {
        ApiError.error?.fields.forEach((fieldError) => {
            //TODO: Fix this any, use some better form of generics
            setError(fieldError.field as any, { message: fieldError.message });
        });
    } else setSnackbarContext({ message: ApiError.error.message, severity: "error", open: true });
};
