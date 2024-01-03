import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import {
    deleteUserApi,
    getUserApi,
    // loginGoogleUserApi,
    loginUserApi,
    logoutUserApi,
    registerUserApi,
    updateUserApi,
} from "../api/auth.api";
import { UserResponse } from "../../../shared/types/schemas/user.schema";
const useAuth = () => {
    const queryClient = useQueryClient();
    useQuery({ queryKey: ["user"], queryFn: getUserApi, staleTime: 1000 * 60 * 60 });

    const loginUser = useMutation({
        mutationKey: ["user", "login"],
        mutationFn: loginUserApi,
        onSuccess: (data, _variables, _context) => {
            queryClient.setQueryData(["user"], data.data);
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
    });
    // const loginGoogleAuth = useMutation({
    //     mutationFn: loginGoogleUserApi,
    //     onSuccess: (data, _variables, _context) => {
    //         queryClient.setQueryData(["user"], data.data);
    //         queryClient.invalidateQueries({ queryKey: ["user"] });
    //     },
    // });

    const logoutUser = useMutation({
        mutationKey: ["user", "logout"],
        mutationFn: logoutUserApi,
        onSuccess: (_data, _variables, _context) => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
    });

    const registerUser = useMutation({
        mutationKey: ["user", "register"],
        mutationFn: registerUserApi,
        onSuccess: (_data, _variables, _context) => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
    });

    const updateUser = useMutation({
        mutationKey: ["user", "update"],
        mutationFn: updateUserApi,
        onSuccess: (_data, _variables, _context) => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
    });

    const deleteUser = useMutation({
        mutationFn: deleteUserApi,
        onSuccess: (_data, _variables, _context) => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
    });

    const userInfo =
        queryClient == undefined
            ? undefined
            : queryClient.getQueryData<{ user: UserResponse } | undefined>(["user"])?.user;
    return { loginUser, /*loginGoogleAuth,*/ logoutUser, registerUser, updateUser, deleteUser: deleteUser, userInfo };
};

export default useAuth;
