import { ApiSlice } from "./apiSlice";
const USERS_URL = "/api/users"; //Should be in its own data const file

export const usersApiSlice = ApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: "post",
                body: data,
            }),
        }),
        logout: builder.mutation<{ message: string }, void>({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: "post",
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: "post",
                body: data,
            }),
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: "put",
                body: data,
            }),
        }),
        deleteUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: "delete",
                body: data,
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = usersApiSlice;
