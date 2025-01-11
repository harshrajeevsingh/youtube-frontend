import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { Spinner } from '@nextui-org/react';

import { fetchCommentByVideoId } from '../../../../api/commentApi';
import CommentCard from './commentCard';

const CommentList = ({ videoId }) => {
  const { ref, inView } = useInView();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['comments', videoId],
    queryFn: ({ pageParam }) =>
      fetchCommentByVideoId({ pageParam, videoId, limit: 10 }),
    getNextPageParam: (lastPage) =>
      lastPage.data.hasNextPage ? lastPage.data.nextPage : undefined,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  useEffect(() => {
    console.log('CommentList is rendered');
  });
  const renderCommentCards = () => {
    if (!data) return null;
    return data.pages.flatMap((page) =>
      page.data.docs.map((comment) => (
        <CommentCard key={comment?._id} comment={comment} />
      ))
    );
  };

  return (
    <div className="w-full flex flex-col">
      {status === 'pending' && <Spinner label="Loading Comments..." />}
      {status === 'error' && (
        <p className="text-red-500">Error: {error.message}</p>
      )}
      {status === 'success' && (
        <>
          {renderCommentCards()}
          {isFetchingNextPage && <Spinner label="Loading more comments..." />}
        </>
      )}
    </div>
  );
};

export default CommentList;
