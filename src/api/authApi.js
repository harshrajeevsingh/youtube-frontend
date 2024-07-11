import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../helpers/axios";
import Cookies from "js-cookie";
import useUserStore from "../store/userSlice";

// Register User Mutation
export const useRegisterUser = () => {
  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await axiosInstance.post("/users/register", formData);
      return data;
    },
    onError: (error) => {
      console.error("Error during signup", error);
    },
  });
};

// Login User Mutation
export const useLoginUser = () => {
  return useMutation({
    mutationFn: async (loginData) => {
      const { data } = await axiosInstance.post("/users/login", loginData);
      return data;
    },
    onError: (error) => {
      console.error("Error during login", error);
    },
  });
};

// Logout User Mutation
export const useLogoutUser = () => {
  const queryClient = useQueryClient();
  const { clearUser } = useUserStore();

  return useMutation({
    mutationFn: async () => {
      const { data } = await axiosInstance.post("/users/logout");
      return data;
    },
    onSuccess: () => {
      clearUser();
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      queryClient.invalidateQueries("user");
    },
    onError: (error) => {
      console.error("Error during logout", error);
    },
  });
};
