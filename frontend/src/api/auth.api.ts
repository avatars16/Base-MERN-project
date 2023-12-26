import { CredentialResponse } from "@react-oauth/google";
import api from "./axios.config";
import { UserCreateClient } from "../../../backend/types/schemas/User.schema";

export function loginUserApi({ email, password }: { email: string; password: string }) {
    return api.post("/api/users/auth", { email, password });
}

export function logoutUserApi() {
    return api.post("/api/users/logout");
}

export function loginGoogleUserApi(googleCredentials: CredentialResponse) {
    return api.post("/api/users/auth/google", { ...googleCredentials });
}

export function registerUserApi({ name, email, password }: UserCreateClient) {
    return api.post("/api/users", { name, email, password });
}

export function getUserApi() {
    return api.get("/api/users/profile");
}

export function updateUserApi({ name, email, password }: { name: string; email: string; password: string }) {
    return api.put("/api/users/profile", { name, email, password });
}

export function deleteUserApi() {
    return api.delete("/api/users/profile");
}
