import axiosInstance from '../helpers/axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const fetchPostsById = async (userId) => {
  const response = await axiosInstance.get(`/tweets/user/${userId}`);
  return response.data;
};

export const useFetchPostsByUserId = (userId) => {
  return useQuery({
    queryKey: ['userById', { userId }],
    queryFn: () => fetchPostsById(userId),
  });
};
