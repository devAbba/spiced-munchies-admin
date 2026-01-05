import axios from "axios";
import type { AxiosResponse, AxiosError } from "axios";

import router from "./router";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (
      error.response?.status === 401 &&
      error.config?.skipFailedAuthRedirect !== true
    ) {
      router.push({ name: "Login" });
    }
    return Promise.reject(error);
  }
);
