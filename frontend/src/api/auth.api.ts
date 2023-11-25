import { CredentialResponse } from "@react-oauth/google";
import axios from "axios";

export function loginUser({ email, password }: { email: string; password: string }) {
    console.log("loginUser");
    return axios
        .post("/api/users/auth", { email, password })
        .then((res) => res.data)
        .catch((err) => {
            throw err?.response?.data;
        });
}

export function logoutUser() {
    return axios.post("/api/users/logout");
}

export function loginGoogleUser(googleCredentials: CredentialResponse) {
    return axios
        .post("/api/users/auth/google", { ...googleCredentials })
        .then((res) => res.data)
        .catch((err) => err?.response?.data);
}

export function registerUser({ name, email, password }: { name: string; email: string; password: string }) {
    return axios
        .post("/api/users", { name, email, password })
        .then((res) => res.data)
        .catch((err) => err?.response?.data);
}

export function getUserProfile() {
    return axios
        .get("/api/users/profile")
        .then((res) => res.data)
        .catch((err) => err?.response?.data);
}

export function updateUserProfile({ name, email, password }: { name: string; email: string; password: string }) {
    return axios
        .put("/api/users/profile", { name, email, password })
        .then((res) => res.data)
        .catch((err) => err?.response?.data);
}

export function deleteUser() {
    return axios
        .delete("/api/users/profile")
        .then((res) => res.data)
        .catch((err) => err?.response?.data);
}
