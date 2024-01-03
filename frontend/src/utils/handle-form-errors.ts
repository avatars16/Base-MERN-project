import { FieldValues, UseFormSetError } from "react-hook-form";
import { SetSnackbarContext } from "../services/providers/Snackbar.provider";
import { ErrorResponse } from "../../../shared/types/responses/error-response";

export const handleFormErrors: <T extends FieldValues>(
    error: ErrorResponse,
    setError: UseFormSetError<T>,
    setSnackbarContext: SetSnackbarContext
) => void = (error, setError, setSnackbarContext) => {
    if (error.success) return;
    if (error.error.name === "ValidationError" && error.error.fields) {
        error.error?.fields.forEach((fieldError) => {
            setError(fieldError.path as any, { message: fieldError.message });
        });
    } else setSnackbarContext({ message: error.error.message, severity: "error", open: true });
};
