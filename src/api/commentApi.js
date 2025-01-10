import axiosInstance from '../helpers/axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const fetchCommentByVideoId = async ({
  pageParam = 1,
  videoId,
  sortBy = 'createdAt',
  sortType = 'desc',
}) => {
  const params = {
    page: pageParam,
    limit: 10,
    sortBy,
    sortType,
  };

  const { data } = await axiosInstance.get(`/comments/${videoId}`, { params });
  return data;
};

export const useAddComment = (videoId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (loginData) => {
      const { data } = await axiosInstance.post(
        `/comments/${videoId}`,
        loginData
      );
      return data;
    },
    onError: (error) => {
      console.error('Error adding comment', error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
    },
  });
};
