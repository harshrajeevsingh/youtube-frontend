import { useLiveQuery } from 'dexie-react-hooks';
import { Link } from 'react-router-dom';
import db from '../../../helpers/db';
import { Trash2 } from 'lucide-react';
import { Button } from '@nextui-org/react';

const DownloadedVideos = () => {
  const videos = useLiveQuery(() => db.videos.toArray());

  const deleteVideo = async (videoId) => {
    try {
      await db.videos.delete(videoId);
    } catch (error) {
      console.error('Failed to delete video:', error);
    }
  };

  if (!videos) {
    return <div className="h-svh">Loading...</div>;
  }

  if (videos.length === 0) {
    return (
      <div className="w-full h-svh py-8">
        <h2 className="text-xl font-semibold">No Downloaded Videos</h2>
        <p className="text-gray-600 mt-2">
          Videos you download will appear here
        </p>
      </div>
    );
  }
  console.log(videos);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Downloaded Videos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div key={video._id} className="border rounded-lg overflow-hidden">
            <Link to={`/watch/offline/${video._id}`}>
              <div className="relative aspect-video">
                <img
                  src={URL.createObjectURL(video.thumbnail)}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-black text-white px-2 py-1 rounded text-sm">
                  {Math.floor(video.duration)}s
                </div>
              </div>
            </Link>

            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold line-clamp-2">{video.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {video.ownerDetails.username}
                  </p>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => deleteVideo(video._id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DownloadedVideos;
