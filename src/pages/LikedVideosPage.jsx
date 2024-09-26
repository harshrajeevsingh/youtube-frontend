import { Spinner, Image } from "@nextui-org/react";
import { useFetchLikedVideos } from "../api/videosApi";
import LikedVideoCard from "../components/ui/likedVideo-page/likedVideoCard";
import { useUserStoreSelectors } from "../store/userSlice";
import { Link } from "react-router-dom";

const LikedVideosPage = () => {
  const { data, isLoading, error } = useFetchLikedVideos();
  const user = useUserStoreSelectors.use.user();

  if (isLoading)
    return (
      <div className="w-full grid place-content-center">
        <Spinner />
      </div>
    );
  if (error) return <p>{error}</p>;

  return (
    <div className="w-full md:h-screen min-h-svh flex flex-col md:flex-row gap-4 md:p-5 md:overflow-hidden">
      <div className="md:w-[28%] w-full md:p-7 p-4 md:rounded-2xl bg-gradient-to-t from-[#020024] via-[#3d0979] to-[#00d4ff]">
        <div className="relative rounded-lg mb-8">
          <Image
            src={data?.data[0]?.likedVideo?.thumbnail?.url}
            alt="Thumbnail"
          />
          <img
            src={data?.data[0]?.likedVideo?.thumbnail?.url}
            alt="Thumbnail Bg"
            className="absolute -bottom-9 blur-xl"
          />
        </div>
        <h3 className="text-2xl font-semibold md:mb-5 mb-2">Liked Videos</h3>
        <p className="text-lg font-semibold mb-1">{user.fullName}</p>
        <p className="text-sm text-default-600 font-semibold">
          {data?.data.length} videos
        </p>
      </div>
      <div className="md:w-[72%] w-full md:overflow-y-auto">
        {data?.data?.map((video) => (
          <Link
            key={video?.likedVideo?._id}
            to={`/watch?v=${video?.likedVideo?._id}`}
          >
            <LikedVideoCard data={video?.likedVideo} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LikedVideosPage;
