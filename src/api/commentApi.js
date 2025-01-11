import axiosInstance from '../helpers/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const fetchCommentByVideoId = async ({
  pageParam = 1,
  videoId,
  limit = 10, 
  sortBy = 'createdAt',
  sortType = 'desc',
}) => {
  const params = {
    page: pageParam,
    limit,
    sortBy,
    sortType,
  };

  const { data } = await axiosInstance.get(`/comments/${videoId}`, { params });
  return data;
};

export const useAddComment = (videoId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (content) => {
      const { data } = await axiosInstance.post(
        `/comments/${videoId}`,
        content
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
