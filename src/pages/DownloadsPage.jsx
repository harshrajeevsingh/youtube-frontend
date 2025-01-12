import { Spinner, Image } from '@nextui-org/react';
import { useLiveQuery } from 'dexie-react-hooks';
import db from '../helpers/db';
import { useUserStoreSelectors } from '../store/userSlice';
import DownloadedVideoCard from '../components/ui/download-offline/downloadedVideoCard';

const DownloadsPage = () => {
  const videos = useLiveQuery(() => db.videos.toArray());
  const user = useUserStoreSelectors.use.user();

  const deleteVideo = async (videoId) => {
    try {
      await db.videos.delete(videoId);
    } catch (error) {
      console.error('Failed to delete video:', error);
    }
  };

  if (!videos) {
    return (
      <div className="w-full grid place-content-center">
        <Spinner />
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold">No Downloaded Videos</h2>
        <p className="text-base mt-2">Videos you download will appear here</p>
      </div>
    );
  }

  return (
    <div className="w-full md:h-screen min-h-svh flex flex-col md:flex-row gap-4 md:p-5 md:overflow-hidden">
      <div className="md:w-[28%] w-full md:p-7 p-4 md:rounded-2xl bg-gradient-to-t from-[#020024] via-[#3d0979] to-[#00d4ff]">
        <div className="relative rounded-lg mb-8">
          <Image
            src={URL.createObjectURL(videos[0].thumbnail)}
            alt="Thumbnail"
          />
          <img
            src={URL.createObjectURL(videos[0].thumbnail)}
            alt="Thumbnail Bg"
            className="absolute -bottom-9 blur-xl"
          />
        </div>
        <h3 className="text-2xl font-semibold md:mb-5 mb-2">
          Downloaded Videos
        </h3>
        <p className="text-lg font-semibold mb-1">{user.fullName}</p>
        <p className="text-sm text-default-600 font-semibold">
          {videos?.length} videos
        </p>
      </div>
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
