import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import { fetchVideos } from '../../../api/videosApi';
import { SkeletonVideoCard } from '../main-page-video/skeletonVideoCard';
import VideoCard from '../main-page-video/videoCard';
import SideCard from './sideCard';

const RecommendVideo = ({ excludeVideoId }) => {
  const { ref, inView } = useInView();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['videos'],
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
      page.data.docs
        .filter((video) => !excludeVideoId || video._id !== excludeVideoId)
        .map((video) => (
          <Link to={`/watch?v=${video._id}`} key={video._id}>
            <SideCard key={video._id} video={video} />
          </Link>
        ))
    );
  };

  const renderSkeletons = () => {
    return Array.from({ length: 9 }).map((_, index) => (
      <SkeletonVideoCard key={index} />
    ));
  };

  return (
    //   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-7 mx-5">
    <div className="w-full">
      {status === 'pending' && renderSkeletons()}
      {status === 'error' && (
        <p className="text-red-500">Error: {error.message}</p>
      )}
      {status === 'success' && (
        <>
          {renderVideoCards()}
          {isFetchingNextPage && renderSkeletons()}
        </>
      )}
    </div>
  );
};

export default RecommendVideo;
