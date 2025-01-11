import axiosInstance from '../helpers/axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const fetchPostsById = async (userId) => {
  const response = await axiosInstance.get(`/tweets/user/${userId}`);
  return response.data;
};

export const useFetchPostsByUserId = (userId) => {
  return useQuery({
    queryKey: ['posts', { userId }],
    queryFn: () => fetchPostsById(userId),
  });
};

export const useAddPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (content) => {
      const { data } = await axiosInstance.post(`/tweets/`, content);
      return data;
    },
    onError: (error) => {
      console.error('Error adding posts', error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    },
  });
};
