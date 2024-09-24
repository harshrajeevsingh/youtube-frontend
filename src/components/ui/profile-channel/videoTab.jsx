import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import { fetchVideos } from "../../../api/videosApi";
import { SkeletonVideoCard } from "../main-page-video/skeletonVideoCard";
import VideoCard from "../main-page-video/videoCard";

const VideoTab = ({ userId }) => {
  const { ref, inView } = useInView();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["videos", userId],
    queryFn: ({ pageParam }) => fetchVideos({ pageParam, userId }),
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
      page.data.docs.map((video) => (
        <Link to={`/watch?v=${video._id}`} key={video._id}>
          <VideoCard key={video._id} video={video} layout="channelPage" />
        </Link>
      ))
    );
  };

  const renderSkeletons = () => {
    return Array.from({ length: 4 }).map((_, index) => (
      <SkeletonVideoCard key={index} />
    ));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-2 mx-1">
      {/* <div className="w-full"> */}
      {status === "pending" && renderSkeletons()}
      {status === "error" && (
        <p className="text-red-500">Error: {error.message}</p>
      )}
      {status === "success" && (
        <>
          {renderVideoCards()}
          {isFetchingNextPage && renderSkeletons()}
        </>
      )}
    </div>
  );
};

export default VideoTab;
