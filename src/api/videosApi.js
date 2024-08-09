import axiosInstance from "../helpers/axios";

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
