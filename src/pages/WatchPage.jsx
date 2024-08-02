import { VideoWithBackground } from "../components/VideoCard";

export const WatchPage = () => {
  return (
    // <div className="w-96 h-full">
    <div className="w-full h-full">
      <VideoWithBackground src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
    </div>
  );
};
export default WatchPage;
