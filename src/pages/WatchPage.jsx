import { Spinner } from "@nextui-org/spinner";

import { useVideoById } from "../api/videosApi";
import { VideoWithBackground } from "../components/VideoWithBg";
import { useSearchParams } from "react-router-dom";

export const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");

  const { data: video, isLoading, error } = useVideoById(videoId);

  return (
    <div className="relative flex flex-wrap w-full min-h-svh">
      {/* This will contain video */}
      <div
        className={`sticky lg:static w-full xl:w-4/6 top-16 ${
          isLoading || error ? "grid place-content-center aspect-video" : ""
        }`}
      >
        {isLoading && <Spinner size="lg" />}
        {error && (
          <div className="text-danger text-xl">Error loading video.</div>
        )}
        {video && <VideoWithBackground src={video.data.videoFile.url} />}
      </div>

      {/* This will contain video details + Comment section */}
      <div className="w-full xl:w-4/6">
        <div className="bg-transparent border-5 border-red-400 w-full h-96"></div>
        <div className="bg-transparent border-5 border-red-400 w-full h-96"></div>
        <div className="bg-transparent border-5 border-red-400 w-full h-96"></div>
      </div>

      {/* This will contain recommended videos*/}
      <div className="static xl:absolute top-0 right-0 w-full xl:w-2/6 xl:mt-7">
        <div className="bg-transparent border-5 border-yellow-400 w-full h-96"></div>
        <div className="bg-transparent border-5 border-yellow-400 w-full h-96"></div>
        <div className="bg-transparent border-5 border-yellow-400 w-full h-96"></div>
        <div className="bg-transparent border-5 border-yellow-400 w-full h-96"></div>
      </div>
    </div>
  );
};

export default WatchPage;
