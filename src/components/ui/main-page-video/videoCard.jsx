import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Avatar, CardHeader, Image } from '@nextui-org/react';
import ReactTimeAgo from 'react-time-ago';
import { Volume2, VolumeX } from 'lucide-react';

import { useMuteSelectors } from '../../../store/muteSlice';
import { formatDuration } from '../../../helpers/formatVideoDuration';

const VideoCard = ({ video, layout = 'mainPage' }) => {
  const [hover, setHover] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const isMuted = useMuteSelectors.use.isMute();
  const toggleMuteState = useMuteSelectors.use.toggleMute();

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
      toggleMuteState();
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
      className={`w-full bg-transparent ${
        layout === 'channelPage' ? 'flex flex-row md:flex-col gap-1' : ''
      }`}
      shadow="none"
      radius="none"
      fullWidth
      isPressable
      disableRipple
      disableAnimation
    >
      <CardHeader
        className={`relative  ${
          layout === 'channelPage' ? 'w-2/6 md:w-full' : 'w-full'
        } aspect-video rounded-xl z-0 p-0`}
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
            hover && videoReady ? 'block' : 'hidden'
          } aspect-video w-full rounded-lg object-cover`}
        />
        <Image
          src={video?.thumbnail?.url}
          alt={video?.title}
          className={`${
            hover && videoReady ? 'hidden' : 'block'
          } aspect-video w-full rounded-lg object-cover`}
        />
        <div
          className={`absolute bottom-2 right-2 px-1 bg-black/55 z-10 rounded-md text-default dark:text-primary-foreground`}
        >
          {hover && videoReady
            ? formatDuration(remainingTime)
            : formatDuration(video?.duration)}
        </div>
        {hover && videoReady && (
          <div
            role="button"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
            tabIndex={0}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleMute();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                toggleMute();
              }
            }}
            className="absolute top-2 right-2 bg-black/40 z-10 p-2 rounded-full"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-white" />
            ) : (
              <Volume2 className="w-5 h-5 text-white" />
            )}
          </div>
        )}
      </CardHeader>
      <CardBody
        className={`${layout === 'channelPage' ? 'py-0' : 'py-2'} flex flex-row items-start px-1 gap-3`}
      >
        {layout === 'mainPage' && (
          <Link to={`/c/${video?.ownerDetails?.username}`}>
            <Avatar
              radius="full"
              size="md"
              src={video?.ownerDetails?.avatar.url}
              className="flex-shrink-0 mt-2"
            />
          </Link>
        )}
        <div className="flex flex-col w-full min-w-0">
          <h4
            className={`${
              layout === 'channelPage' ? 'mt-0' : 'mt-1'
            } text-large font-semibold text-default-600 line-clamp-2`}
          >
            {video?.title}
          </h4>
          <div className="flex lg:flex-col gap-1">
            <Link to={`/c/${video?.ownerDetails?.username}`}>
              <h5 className="text-sm text-default-500 truncate">
                {video?.ownerDetails?.username}
              </h5>
            </Link>
            <span className="lg:hidden block text-sm text-default-500">•</span>
            <h5 className="text-sm text-default-500 flex items-center gap-1">
              <span className="truncate">
                {video?.views} {video?.views > 1 ? 'views' : 'view'}
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
