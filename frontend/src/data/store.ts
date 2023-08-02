import { configureStore } from "@reduxjs/toolkit";
import { ApiSlice } from "../slices/apiSlice";
import authReducer from "../slices/authSlice";
const store = configureStore({
    reducer: { auth: authReducer, [ApiSlice.reducerPath]: ApiSlice.reducer },
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(ApiSlice.middleware),
    devTools: true,
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;
