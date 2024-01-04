import { z } from "zod";

const password = z
    .string()
    .min(6)
    .refine((data) => /[A-Z]/.test(data), {
        params: { i18n: { key: "custom_invalid_string.include_uppercase_letter" } },
    })
    .refine((data) => /[a-z]/.test(data), { params: { i18n: "custom_invalid_string.include_lowercase_letter" } })
    .refine((data) => /[0-9]/.test(data), { params: { i18n: "custom_invalid_string.include_number" } })
    .refine((data) => /[!@#$%\&*^-_=;,.?\/\\|~`"'(){}\[\]<>]/.test(data), {
        params: { i18n: "custom_invalid_string.include_special_character" },
    });

export const userSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    password: password,
});
export const userCreateOrUpdateSchema = userSchema.omit({ id: true });
export const userLoginSchema = userCreateOrUpdateSchema.omit({ name: true });
export const userCreateOrUpdateClientSchema = userCreateOrUpdateSchema
    .extend({ confirmPassword: password.optional() })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });
export const userResponseSchema = userSchema.omit({ password: true });

export type User = z.infer<typeof userSchema>;
export type UserCreateOrUpdate = z.infer<typeof userCreateOrUpdateSchema>;
export type UserLogin = z.infer<typeof userLoginSchema>;
export type UserCreateOrUpdateClient = z.infer<typeof userCreateOrUpdateClientSchema>;
export type UserResponse = z.infer<typeof userResponseSchema>;
