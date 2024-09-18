import { useEffect, memo } from "react";
import { useSearchParams } from "react-router-dom";
import { Spinner } from "@nextui-org/spinner";

import { useVideoBackground } from "../hooks/UseVideoBg";

import { useVideoById } from "../api/videosApi";
import VideoDetails from "../components/ui/watch-page-video/videoDetails";
import RecommendVideo from "../components/ui/watch-page-video/recommendVideo";
export const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");

  const { videoRef, canvasRef } = useVideoBackground();

  const { data: video, isLoading, error } = useVideoById(videoId);

  useEffect(() => {
    console.log("Watch Page rendered");
  }, []);

  return (
    <div className="relative flex flex-wrap w-full min-h-svh">
      {/* This will contain video */}

      {!video && (
        <div className="sticky lg:static w-full xl:w-4/6 top-16 grid place-content-center aspect-video">
          {isLoading && <Spinner size="lg" />}
          {error && (
            <div className="text-danger text-xl">Error loading video.</div>
          )}
        </div>
      )}
      {video && (
        <>
          {" "}
          <video
            ref={videoRef}
            controls
            className="sticky lg:static w-full xl:w-4/6 top-16 aspect-video lg:rounded-xl lg:mt-4  z-20"
            src={video.data.videoFile.url}
          />
          <canvas
            width="10"
            height="6"
            aria-hidden="true"
            className="absolute -top-16 lg:-left-4 left-0 -z-30 lg:w-10/12 w-full h-[900px]  dark:opacity-20 opacity-15"
            ref={canvasRef}
          />
          <div className="pointer-events-none absolute -top-16 lg:-left-4 left-0 -z-30 lg:w-10/12 w-full h-[900px]">
            <div className="absolute hidden lg:block right-0 top-0 w-32 h-full bg-gradient-to-l from-background to-transparent dark:from-background" />
            <div className="absolute  bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent dark:from-background" />
          </div>
        </>
      )}

      {/* This will contain video details + Comment section */}
      <div className="w-full xl:w-4/6 z-10">
        {video && <VideoDetails video={video?.data} />}
        <div className="bg-transparent border-5 border-red-400 w-full h-96"></div>
        <div className="bg-transparent border-5 border-red-400 w-full h-96"></div>
        <div className="bg-transparent border-5 border-red-400 w-full h-96"></div>
      </div>

      {/* This will contain recommended videos*/}
      <div className="static xl:absolute top-0 right-0 w-full xl:w-2/6 lg:mt-4  ">
        {video && <RecommendVideo excludeVideoId={videoId} />}
        {/* <div className="bg-transparent border-5 border-yellow-400 w-full h-96"></div> */}
        {/* <div className="bg-transparent border-5 border-yellow-400 w-full h-96"></div> */}
        {/* <div className="bg-transparent border-5 border-yellow-400 w-full h-96"></div> */}
        {/* <div className="bg-transparent border-5 border-yellow-400 w-full h-96"></div> */}
      </div>
    </div>
  );
};

export default WatchPage;
