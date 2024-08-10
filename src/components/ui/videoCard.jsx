import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardBody,
  Avatar,
  CardHeader,
  Image,
  Button,
} from "@nextui-org/react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ReactTimeAgo from "react-time-ago";
import { Volume2, VolumeX } from "lucide-react";

import { formatDuration } from "../../helpers/formatVideoDuration";

TimeAgo.addDefaultLocale(en);

const VideoCard = ({ video }) => {
  const [hover, setHover] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);

  const videoRef = useRef(null);

  useEffect(() => {
    if (hover && videoRef.current) {
      videoRef.current.load();
    }
  }, [hover]);

  const handleVideoReady = () => {
    setVideoReady(true);
    if (hover && videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseEnter = () => {
    setHover(true);
    if (videoReady && videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setHover(false);
    setVideoReady(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const remainingTime = video?.duration - currentTime;

  return (
    <Card
      className="w-full bg-transparent"
      shadow="none"
      radius="none"
      fullWidth
      isPressable
      disableRipple
      disableAnimation
    >
      <CardHeader
        className="relative rounded-xl z-0 p-0 "
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <video
          ref={videoRef}
          muted={isMuted}
          disablePictureInPicture
          src={video?.videoFile?.url}
          onLoadedData={handleVideoReady}
          onTimeUpdate={handleTimeUpdate}
          className={`${
            hover && videoReady ? "block" : "hidden"
          } aspect-video w-full rounded-lg object-cover`}
        />
        <Image
          src={video?.thumbnail?.url}
          alt={video?.title}
          className={`${
            hover && videoReady ? "hidden" : "block"
          } aspect-video w-full rounded-lg object-cover`}
        />
        <div
          className={`absolute bottom-2 right-2 px-1 bg-black/55 z-10 rounded-md`}
        >
          {hover && videoReady
            ? formatDuration(remainingTime)
            : formatDuration(video?.duration)}
        </div>
        {hover && videoReady && (
          <Button
            isIconOnly
            radius="full"
            className="absolute top-2 right-2 bg-black/40 z-10"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleMute();
            }}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-white" />
            ) : (
              <Volume2 className="w-4 h-4 text-white" />
            )}
          </Button>
        )}
      </CardHeader>
      <CardBody className="flex flex-row items-start px-1 py-2 gap-3">
        <Avatar
          radius="full"
          size="md"
          src={video?.ownerDetails?.avatar.url}
          className="flex-shrink-0 mt-2"
        />
        <div className="flex flex-col w-full min-w-0">
          <h4 className="text-large font-semibold text-default-600 line-clamp-2">
            {video?.title}
          </h4>
          <div className="flex lg:flex-col gap-1">
            <h5 className="text-sm text-default-500 truncate">
              {video?.ownerDetails?.username}
            </h5>
            <span className="lg:hidden block text-sm text-default-500">•</span>
            <h5 className="text-sm text-default-500 flex items-center gap-1">
              <span className="truncate">
                {video?.views} {video?.views > 1 ? "views" : "view"}
              </span>
              <span>•</span>
              <ReactTimeAgo date={new Date(video?.createdAt)} locale="en-US" />
            </h5>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default VideoCard;
