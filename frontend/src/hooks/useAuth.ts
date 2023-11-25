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
import { UserBody } from "../../../backend/types/model";
const useAuth = () => {
    const queryClient = useQueryClient();

    useQuery({ queryKey: ["user"], queryFn: getUserProfile, staleTime: 1000 * 60 * 60 });

    const login = useMutation({
        mutationFn: loginUser,
        onSuccess: (data, variables, context) => {
            queryClient.setQueryData(["user"], data.data);
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
    });
    const loginGoogleAuth = useMutation({
        mutationFn: loginGoogleUser,
        onSuccess: (data, variables, context) => {
            queryClient.setQueryData(["user"], data.data);
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
        onError: (error, variables, context) => {
            console.log(error);
        },
    });

    const logout = useMutation({
        mutationFn: logoutUser,
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
    });

    const register = useMutation({
        mutationFn: registerUser,
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
    });

    const update = useMutation({
        mutationFn: updateUserProfile,
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
    });

    const deleteUserProfile = useMutation({
        mutationFn: deleteUser,
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
    });

    const userInfo =
        queryClient.getQueryData(["user"]) == undefined
            ? undefined
            : queryClient.getQueryData<{ user: UserBody } | undefined>(["user"])?.user;
    return { login, loginGoogleAuth, logout, register, update, deleteUser: deleteUserProfile, userInfo };
};

export default useAuth;
