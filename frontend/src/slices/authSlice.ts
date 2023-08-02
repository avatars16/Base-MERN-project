import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // ! necesarry to tell typescript that we are certain that localstorage cannot return null
    userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")!) : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.userInfo = "";
            localStorage.removeItem("userInfo");
        },
    },
});
export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
