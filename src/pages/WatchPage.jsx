import { VideoWithBackground } from "../components/VideoWithBg";

export const WatchPage = () => {
  return (
    <div className="relative flex flex-wrap w-full min-h-svh">
      {/* This will contain video */}
      <div className="sticky lg:static w-full xl:w-4/6 top-16">
        <VideoWithBackground src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
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
      </div>
    </div>
  );
};

export default WatchPage;
