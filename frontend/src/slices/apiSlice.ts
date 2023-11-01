import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//uses rtkquery,

const baseQuery = fetchBaseQuery({ baseUrl: "" });

export const ApiSlice = createApi({ baseQuery, tagTypes: ["User"], endpoints: (/*builder*/) => ({}) });
