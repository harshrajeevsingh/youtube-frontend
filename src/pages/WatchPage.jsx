import { VideoWithBackground } from "../components/VideoCard";

export const WatchPage = () => {
  return (
    // <div className="w-full min-h-svh">
    // <div className="w-full">
    //   <VideoWithBackground src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
    //   <div className="md:mt-0">
    //     <div className="bg-transparent border-5 border-orange-400 w-full h-96"></div>
    //     <div className="bg-transparent border-5 border-orange-400 w-full h-96"></div>
    //     <div className="bg-transparent border-5 border-orange-400 w-full h-96"></div>
    //     <div className="bg-transparent border-5 border-orange-400 w-full h-96"></div>
    //     <div className="bg-transparent border-5 border-orange-400 w-full h-96"></div>
    //     <div className="bg-transparent border-5 border-orange-400 w-full h-96"></div>
    //     <div className="bg-transparent border-5 border-orange-400 w-full h-96"></div>
    //   </div>
    // </div>
    <div className="w-full min-h-svh xl:mt-4 xl:ml-2">
      <div className="sticky lg:static top-16">
        <VideoWithBackground
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          className="w-full xl:w-[65%] aspect-video  lg:rounded-xl"
        />
      </div>
      <div>
        <div className="bg-transparent border-5 border-orange-400 w-full h-96"></div>
        <div className="bg-transparent border-5 border-orange-400 w-full h-96"></div>
        <div className="bg-transparent border-5 border-orange-400 w-full h-96"></div>
      </div>
    </div>
  );
};
export default WatchPage;
