import axios from "axios";

let api = axios.create();

api.interceptors.response.use(
    //Gives us easy access to response data in our components in both error and success cases
    (response) => response.data,
    (error) => {
        throw error?.response?.data;
    }
);

export default api;
