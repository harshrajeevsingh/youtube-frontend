import { Link } from 'react-router-dom';

import { useUserStoreSelectors } from '../store/userSlice';
import { useFetchLikedVideos } from '../api/videosApi';

import LikedVideoCard from '../components/ui/likedVideo-page/likedVideoCard';
import CenteredMessage from '../components/ui/centeredMessage';
import InfoPanel from '../components/ui/infoPanel';

const LikedVideosPage = () => {
  const { data, isLoading, error } = useFetchLikedVideos();
  const user = useUserStoreSelectors.use.user();

  if (isLoading) return <CenteredMessage status="loading" />;

  if (error)
    return <CenteredMessage message={error.message} className="text-red-500" />;

  if (data?.data?.length === 0)
    return <CenteredMessage message="No liked videos yet!" status="empty" />;

  return (
    <div className="w-full md:h-screen min-h-svh flex flex-col md:flex-row gap-4 md:p-5 md:overflow-hidden">
      <InfoPanel
        title="Liked Videos"
        user={user.fullName}
        itemCount={data?.data.length}
        thumbnail={data?.data[0]?.likedVideo?.thumbnail?.url}
      />
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
