import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import {
    deleteUser,
    getUserProfile,
    loginGoogleUser,
    loginUser,
    logoutUser,
    registerUser,
    updateUserProfile,
} from "../api/auth.api";
const useAuth = () => {
    useQuery({ queryKey: ["user"], queryFn: getUserProfile, staleTime: 1000 * 60 * 60 });
    const queryClient = useQueryClient();

    const login = useMutation({
        mutationFn: loginUser,
        onSuccess: (data, _variables, _context) => {
            queryClient.setQueryData(["user"], data.data);
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
    });
    const loginGoogleAuth = useMutation({
        mutationFn: loginGoogleUser,
        onSuccess: (data, _variables, _context) => {
            queryClient.setQueryData(["user"], data.data);
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
    });

    const logout = useMutation({
        mutationFn: logoutUser,
        onSuccess: (_data, _variables, _context) => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
    });

    const register = useMutation({
        mutationFn: registerUser,
        onSuccess: (_data, _variables, _context) => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
    });

    const update = useMutation({
        mutationFn: updateUserProfile,
        onSuccess: (_data, _variables, _context) => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
    });

    const deleteUserProfile = useMutation({
        mutationFn: deleteUser,
        onSuccess: (_data, _variables, _context) => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
    });

    const userInfo =
        queryClient == undefined ? undefined : queryClient.getQueryData<{ user: any } | undefined>(["user"])?.user;
    return { login, loginGoogleAuth, logout, register, update, deleteUser: deleteUserProfile, userInfo };
};

export default useAuth;
