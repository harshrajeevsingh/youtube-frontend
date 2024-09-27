import { useFetchPostsByUserId } from "../../../api/postTweetApi";
import { Spinner } from "@nextui-org/react";

import { PostCard } from "./postCard";

const PostsList = ({ userId }) => {
  const { data: postData, isLoading, error } = useFetchPostsByUserId(userId);

  if (isLoading)
    return (
      <div className="w-full grid place-content-center">
        <Spinner />
      </div>
    );

  if (error)
    return (
      <div className="w-full grid place-content-center text-red-500">
        {error.message}
      </div>
    );

  return (
    <div className="w-full">
      {postData?.data?.map((post) => (
        <PostCard key={post?._id} post={post} />
      ))}
    </div>
  );
};

export default PostsList;
