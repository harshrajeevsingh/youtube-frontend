import { useSearchParams } from 'react-router-dom';
import { Spinner } from '@nextui-org/spinner';

import { useVideoById } from '../api/videosApi';
import VideoDetails from '../components/ui/watch-page-video/videoDetails';
import RecommendVideo from '../components/ui/watch-page-video/recommendVideo';
import CommentSection from '../components/ui/watch-page-video/comments/commentSection';
import { VideoWithBackground } from '../components/VideoWithBg';

export const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get('v');

  const { data: video, isLoading, error } = useVideoById(videoId);

  return (
    <div className="relative flex flex-wrap w-full min-h-svh md:mb-10 mb-0">
      {/* This will contain video */}
      {!video && (
        <div className="sticky lg:static w-full xl:w-4/6 top-16 grid place-content-center aspect-video">
          {isLoading && <Spinner size="lg" />}
          {error && (
            <div className="text-danger text-xl">Error loading video.</div>
          )}
        </div>
      )}
      {video && <VideoWithBackground src={video?.data?.videoFile?.url} />}

      {/* This will contain video details + Comment section */}
      <div className="w-full xl:w-4/6 z-10">
        {video && <VideoDetails video={video?.data} />}
        {video && <CommentSection videoId={video?.data?._id} />}
      </div>

      {/* This will contain recommended videos*/}
      <div className="static xl:absolute top-0 right-0 w-full xl:w-2/6 lg:mt-4  ">
        {video && <RecommendVideo excludeVideoId={videoId} />}
      </div>
    </div>
  );
};

export default WatchPage;
