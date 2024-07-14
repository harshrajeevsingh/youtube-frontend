/*import axios from "axios";
import { BASE_URL } from "../constants.js";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
*/

import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../constants";
import useUserStore from "../store/userSlice";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axiosInstance.post("/users/refresh-token");
        const { accessToken, refreshToken } = response.data;

        // set tokens in cookies
        Cookies.set("accessToken", accessToken);
        Cookies.set("refreshToken", refreshToken);

        // set tokens in state
        const { setTokens } = useUserStore.getState();
        setTokens(accessToken, refreshToken);

        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // remove token from cookies
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");

        // remove cookie from state
        const { clearUser } = useUserStore.getState();
        clearUser();

        // window.location.href = "/login";
        window.location.href = "/signup"; // should be login here
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
