import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import { fetchVideos } from "../api/videosApi";
import { SkeletonVideoCard } from "./ui/skeletonVideoCard";
import VideoCard from "./ui/videoCard";

export const VideoListMain = () => {
  const { ref, inView } = useInView();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["videos"],
    queryFn: ({ pageParam }) => fetchVideos({ pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.data.hasNextPage ? lastPage.data.nextPage : undefined,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const renderVideoCards = () => {
    if (!data) return null;
    return data.pages.flatMap((page) =>
      page.data.docs.map((video) => <VideoCard key={video._id} video={video} />)
    );
  };

  const renderSkeletons = () => {
    return Array.from({ length: 10 }).map((_, index) => (
      <SkeletonVideoCard key={index} />
    ));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-7 mx-5">
      {status === "pending" && renderSkeletons()}
      {status === "error" && (
        <p className="text-red-500">Error: {error.message}</p>
      )}
      {status === "success" && (
        <>
          {renderVideoCards()}
          {renderVideoCards()}
          {isFetchingNextPage && renderSkeletons()}
        </>
      )}
    </div>
  );
};

export default VideoListMain;
