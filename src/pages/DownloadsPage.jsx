import { useLiveQuery } from 'dexie-react-hooks';
import db from '../helpers/db';
import { useUserStoreSelectors } from '../store/userSlice';
import { toast } from 'sonner';

import DownloadedVideoCard from '../components/ui/download-offline/downloadedVideoCard';
import CenteredMessage from '../components/ui/centeredMessage';
import InfoPanel from '../components/ui/infoPanel';

const DownloadsPage = () => {
  const videos = useLiveQuery(() => db.videos.toArray());
  const user = useUserStoreSelectors.use.user();

  const deleteVideo = async (videoId) => {
    try {
      await db.videos.delete(videoId);
      toast.info('Video deleted from downloads!');
    } catch (error) {
      console.error('Failed to delete video:', error);
      toast.error('Failed to delete video');
    }
  };

  if (!videos) {
    return <CenteredMessage status="loading" />;
  }

  if (videos.length === 0) {
    return (
      <CenteredMessage message="No downloaded videos to show!" status="empty" />
    );
  }

  return (
    <div className="w-full md:h-screen min-h-svh flex flex-col md:flex-row gap-4 md:p-5 md:overflow-hidden">
      <InfoPanel
        title="Downloaded Videos"
        user={user.fullName}
        itemCount={videos?.length}
        thumbnail={URL.createObjectURL(videos[0].thumbnail)}
      />
      <div className="md:w-[72%] w-full md:overflow-y-auto">
        {videos?.map((video) => (
          <DownloadedVideoCard
            key={video._id}
            data={video}
            onNavigate={`/watch/offline/${video._id}`}
            action={() => deleteVideo(video._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default DownloadsPage;
