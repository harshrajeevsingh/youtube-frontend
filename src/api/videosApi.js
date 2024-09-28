import axiosInstance from "../helpers/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

/* Fetch All Videos for HomePage */

export const fetchVideos = async ({
  pageParam = 1,
  userId,
  query,
  sortBy = "createdAt",
  sortType = "desc",
}) => {
  const params = {
    page: pageParam,
    limit: 9,
    ...(userId && { userId }),
    ...(query && { query }),
    sortBy,
    sortType,
  };

  const { data } = await axiosInstance.get("/videos", { params });
  return data;
};

/* Fetch a Particular Video */

const fetchVideoById = async (videoId) => {
  const response = await axiosInstance.get(`/videos/${videoId}`);
  return response.data;
};

export const useVideoById = (videoId) => {
  return useQuery({
    queryKey: ["video", { videoId }],
    queryFn: () => fetchVideoById(videoId),
    enabled: !!videoId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/* Toggle Video Like */

export const useVideoLike = (videoId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (creatorId) => {
      console.log("API call started for creator:", creatorId);
      const { data } = await axiosInstance.post(`/likes/toggle/v/${videoId}`);
      console.log("API call completed, response:", data);
      return data;
    },
    onMutate: async (creatorId) => {
      console.log("Optimistic update started for video:", videoId);

      await queryClient.cancelQueries(["video", { videoId }]);

      const previousVideo = queryClient.getQueryData(["video", { videoId }]);
      console.log("Previous video data:", previousVideo);

      queryClient.setQueryData(["video", { videoId }], (old) => {
        if (!old) {
          console.log("No existing data found for video:", { videoId });
          return old;
        }

        const newData = {
          ...old,
          data: {
            ...old.data,
            isLiked: !old.data.isLiked,
            likesCount: old.data.isLiked
              ? Math.max((old.data.likesCount || 0) - 1, 0)
              : (old.data.ownerDetails.likesCount || 0) + 1,
          },
        };
        console.log("Updated video data:", newData);
        return newData;
      });

      console.log("Optimistic update completed");
      return { previousVideo };
    },
    onError: (err, variables, context) => {
      console.error("Mutation error, rolling back optimistic update", err);
      queryClient.setQueryData(["video", { videoId }], context.previousVideo);
    },
    onSettled: () => {
      console.log("Mutation settled, invalidating queries");
      queryClient.invalidateQueries(["video", { videoId }]);
    },
  });
};

/* Upload Video */
export const usePublishVideo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await axiosInstance.post("/videos/", formData);
      return data;
    },
    onError: (error) => {
      console.error("Error during publishing video", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("videos");
    },
  });
};

/* fetch Liked Videos */

const fetchLikedVideos = async () => {
  const response = await axiosInstance.get(`likes/videos`);
  return response.data;
};

export const useFetchLikedVideos = () => {
  return useQuery({
    queryKey: ["video"],
    queryFn: () => fetchLikedVideos(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/* Fetch Watch History */

const fetchHistory = async () => {
  const response = await axiosInstance.get(`users/history`);
  return response.data;
};

export const useFetchWatchHistory = () => {
  return useQuery({
    queryKey: ["history"],
    queryFn: () => fetchHistory(),
  });
};
