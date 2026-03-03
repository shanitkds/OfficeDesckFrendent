import axios from "axios";

export const accountApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api/account/",
});
accountApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }

    return config;
});

// ----------------------------------------------------

export const or_adminApi=axios.create({
  baseURL: "http://127.0.0.1:8000/api/org_admin/",
});

or_adminApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }

    return config;
});