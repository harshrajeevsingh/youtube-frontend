import axiosInstance from "../helpers/axios";
import { useQuery } from "@tanstack/react-query";

export const fetchVideos = async ({
  pageParam = 1,
  userId,
  query,
  sortBy = "createdAt",
  sortType = "desc",
}) => {
  const params = {
    page: pageParam,
    limit: 10,
    ...(userId && { userId }),
    ...(query && { query }),
    sortBy,
    sortType,
  };

  const { data } = await axiosInstance.get("/videos", { params });
  return data;
};

const fetchVideoById = async (videoId) => {
  const response = await axiosInstance.get(`/videos/${videoId}`);
  return response.data;
};

export const useVideoById = (videoId) => {
  return useQuery({
    queryKey: ["video", { videoId }],
    queryFn: () => fetchVideoById(videoId),
    enabled: !!videoId,
  });
};
