import { Link } from 'react-router-dom';
import { Avatar, Button } from '@nextui-org/react';
import { Bookmark } from 'lucide-react';

import useMediaQuery from '../../../hooks/useMediaQuery';

import DescriptionBox from './descriptionBox';
import { SubscribeBtn } from './subscribeBtn';
import { VideoLikeBtn } from './videoLikeBtn';
import DrawerDescriptionBox from './drawerDescriptionBox';
import VideoDownloadManager from '../download-offline/videoDownloadManager';
import ShareVideo from '../shareVideo';
import { toast } from 'sonner';

function VideoDetails({ video }) {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const videoUrl = `${window.location.origin}/watch?v=${video?._id}`;
  const videoTitle = video?.title;
  const ownerUsername = video?.ownerDetails?.username;
  const ownerAvatar = video?.ownerDetails?.avatar?.url;
  const subscribersCount = video?.ownerDetails?.subscribersCount;
  const ownerId = video?.ownerDetails?._id;
  const isSubscribed = video?.ownerDetails?.isSubscribed;
  const videoId = video?._id;

  const Title = ({ title }) => {
    return (
      <h3 className="text-xl text-default-700 font-semibold line-clamp-2 px-2 md:px-0">
        {title}
      </h3>
    );
  };

  return (
    <div className="w-full">
      <div className="md:pt-3 pt-2 pb-3">
        {isDesktop ? (
          <Title title={videoTitle} />
        ) : (
          <DrawerDescriptionBox data={video} />
        )}
      </div>
      <div className="flex lg:flex-row flex-col md:justify-between justify-normal md:items-center items-start">
        <div className="flex gap-4 lg:w-2/5 w-full items-center px-2 md:px-0">
          <Link to={`/c/${ownerUsername}`}>
            <Avatar src={ownerAvatar} />
          </Link>
          <div className="flex flex-col">
            <Link to={`/c/${ownerUsername}`}>
              <p className="text-base text-default-700">@{ownerUsername}</p>
            </Link>
            <p className="text-sm text-default-700">
              {subscribersCount}{' '}
              {subscribersCount > 1 ? 'subscribers' : 'subscriber'}
            </p>
          </div>
          <SubscribeBtn
            getCreatorId={() => ownerId}
            getIsSubscribed={() => isSubscribed}
            getSubscribeButtonId={() => videoId}
          />
        </div>
        {/* Other Buttons */}
        <div className="relative w-full lg:w-auto">
          <div className="flex justify-evenly items-center md:gap-2 gap-1 md:mt-0 mt-3 overflow-x-auto scrollbar-hide pb-2 lg:pb-0">
            <VideoLikeBtn data={video} />
            <ShareVideo videoUrl={videoUrl} videoTitle={videoTitle} />
            <VideoDownloadManager videoData={video} />
            <Button
              onClick={() => toast.info('This feature is under development')}
              radius="full"
              variant="solid"
              color="primary"
              className="bg-primary-background text-default-700 flex-shrink-0 whitespace-nowrap mr-2 md:mr-0"
              startContent={<Bookmark size={20} strokeWidth={1.5} />}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
      {isDesktop && <DescriptionBox data={video} />}
    </div>
  );
}

export default VideoDetails;
