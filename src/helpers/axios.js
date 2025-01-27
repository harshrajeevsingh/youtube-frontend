/*
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../constants";
import useUserStore from "../store/userSlice";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Exclude refresh token logic for certain endpoints
    const excludedEndpoints = ["/users/login", "/users/register"];
    const isExcludedEndpoint = excludedEndpoints.includes(originalRequest.url);

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isExcludedEndpoint
    ) {
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
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // remove token from cookies
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");

        // clear user from state
        const { clearUser } = useUserStore.getState();
        clearUser();

        window.location.href = "/login"; // redirect to login page
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
*/

// axiosInstance.js
import axios from 'axios';
import Cookies from 'js-cookie';
import { BASE_URL } from '../constants';
import useUserStore from '../store/userSlice';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  // timeout: 10000,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Exclude refresh token logic for certain endpoints
    const excludedEndpoints = [
      '/users/login',
      '/users/register',
      '/users/refresh-token',
    ];
    const isExcludedEndpoint = excludedEndpoints.includes(originalRequest.url);

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isExcludedEndpoint
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // const { setTokens } = useUserStore.getState();
        const response = await axiosInstance.post('/users/refresh-token');
        const { accessToken, refreshToken } = response.data;
        Cookies.set('accessToken', accessToken);
        Cookies.set('refreshToken', refreshToken);
        // setTokens(accessToken, refreshToken);
        axiosInstance.defaults.headers.common['Authorization'] =
          `Bearer ${accessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        processQueue(null, accessToken);
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        const { clearUser } = useUserStore.getState();
        clearUser();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

{
  /* ADD: */
}

// On refresh error, it's most probably that the refresh-token also got expired
// then apart from clearing userStore, we also need to clear the cookies
// after that send the user to login page.
