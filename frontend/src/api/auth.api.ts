import { CredentialResponse } from "@react-oauth/google";
import api from "./axios.config";

export function loginUser({ email, password }: { email: string; password: string }) {
    return api.post("/api/users/auth", { email, password });
}

export function logoutUser() {
    return api.post("/api/users/logout");
}

export function loginGoogleUser(googleCredentials: CredentialResponse) {
    return api.post("/api/users/auth/google", { ...googleCredentials });
}

export function registerUser({ name, email, password }: { name: string; email: string; password: string }) {
    return api.post("/api/users", { name, email, password });
}

export function getUserProfile() {
    return api.get("/api/users/profile");
}

export function updateUserProfile({ name, email, password }: { name: string; email: string; password: string }) {
    return api.put("/api/users/profile", { name, email, password });
}

export function deleteUser() {
    return api.delete("/api/users/profile");
}
