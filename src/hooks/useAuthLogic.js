import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserStoreSelectors } from "../store/userSlice";
import axiosInstance from "../helpers/axios";
export const UseAuthLogic = () => {
  const queryClient = useQueryClient;
  const setUser = useUserStoreSelectors.use.setUser();

  const loginMutation = useMutation({
    mutationFn: async (loginData) => {
      const { data } = await axiosInstance.post("/users/login", loginData);
      return data;
    },
  });
};
