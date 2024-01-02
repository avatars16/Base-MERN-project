import { z } from "zod";

const password = z
    .string()
    .min(6)
    .superRefine((data, ctx) => {
        const uppercaseRegex = /[A-Z]/;
        if (!uppercaseRegex.test(data))
            ctx.addIssue({
                message: "Password should include a capital letter",
                code: "invalid_string",
                validation: "regex",
            });
        const lowercaseRegex = /[a-z]/;
        if (!lowercaseRegex.test(data))
            ctx.addIssue({
                message: "Password should include a lower case letter",
                code: "invalid_string",
                validation: "regex",
            });
        const numberRegex = /[0-9]/;
        if (!numberRegex.test(data))
            ctx.addIssue({
                message: "Password should include a number",
                code: "invalid_string",
                validation: "regex",
            });
        const specialCharsRegex = /[!@#$%\&*^-_=;,.?\/\\|~`"'(){}\[\]<>]/;
        if (!specialCharsRegex.test(data))
            ctx.addIssue({
                message: "Password should one of the following chars" + specialCharsRegex,
                code: "invalid_string",
                validation: "regex",
            });
        return true; // if no error is thrown, the value is valid
    });

export const userSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    password: password,
});
export const userCreateSchema = userSchema.omit({ id: true });
export const userLoginSchema = userCreateSchema.omit({ name: true });
export const userCreateClientSchema = userCreateSchema
    .extend({ confirmPassword: password.optional() })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });
export const userResponseSchema = userSchema.omit({ password: true });

export type User = z.infer<typeof userSchema>;
export type UserCreate = z.infer<typeof userCreateSchema>;
export type UserLogin = z.infer<typeof userLoginSchema>;
export type UserCreateClient = z.infer<typeof userCreateClientSchema>;
export type UserResponse = z.infer<typeof userResponseSchema>;
