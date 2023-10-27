type FieldErrors = [
    {
        name: string;
        message: string;
    }
];

function hasError(fieldErrors: FieldErrors | undefined, fieldName: string): boolean {
    if (fieldErrors === undefined) return false;
    return fieldErrors.some((error) => error.name === fieldName);
}

function getHelperText(fieldErrors: FieldErrors | undefined, fieldName: string): string {
    if (fieldErrors === undefined) return "";
    const error = fieldErrors.find((error) => error.name === fieldName);
    return error ? error.message : "";
}

export { hasError, getHelperText };
export type { FieldErrors };
