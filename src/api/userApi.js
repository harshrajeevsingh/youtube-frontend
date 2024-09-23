import axiosInstance from "../helpers/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const fetchUserById = async (username) => {
  const response = await axiosInstance.get(`/users/c/${username}`);
  return response.data;
};

export const useUserById = (username) => {
  return useQuery({
    queryKey: ["userById", { username }],
    queryFn: () => fetchUserById(username),
    enabled: !!username,
  });
};
