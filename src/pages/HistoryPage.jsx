import { Link } from 'react-router-dom';

import { useUserStoreSelectors } from '../store/userSlice';
import { useFetchWatchHistory } from '../api/videosApi';

import InfoPanel from '../components/ui/infoPanel';
import CenteredMessage from '../components/ui/centeredMessage';
import WatchHistoryCard from '../components/ui/watch-history/watchHistoryCard';

const HistoryPage = () => {
  const { data, isLoading, error } = useFetchWatchHistory();
  const user = useUserStoreSelectors.use.user();

  if (isLoading) return <CenteredMessage status="loading" />;

  if (error)
    return <CenteredMessage message={error.message} className="text-red-500" />;

  if (data?.data?.length === 0)
    return <CenteredMessage message="No liked videos yet" status="empty" />;

  return (
    <div className="w-full md:h-screen min-h-svh flex flex-col md:flex-row gap-4 md:p-5 md:overflow-hidden">
      <InfoPanel
        title="Watch History"
        user={user.fullName}
        itemCount={data?.data.length}
        thumbnail={data?.data[0]?.thumbnail?.url}
      />
      <div className="md:w-[72%] w-full md:overflow-y-auto">
        {data?.data?.map((video) => (
          <Link key={video?._id} to={`/watch?v=${video?._id}`}>
            <WatchHistoryCard data={video} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;
