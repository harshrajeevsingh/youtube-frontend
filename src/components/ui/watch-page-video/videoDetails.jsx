import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button } from '@nextui-org/react';
import { Bookmark, ArrowDownToLine, Forward } from 'lucide-react';

import useMediaQuery from '../../../hooks/useMediaQuery';

import DescriptionBox from './descriptionBox';
import { SubscribeBtn } from './subscribeBtn';
import { VideoLikeBtn } from './videoLikeBtn';
import DrawerDescriptionBox from './drawerDescriptionBox';

function VideoDetails({ video }) {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const Title = ({ title }) => {
    return (
      <h3 className="text-2xl text-default-700 font-semibold line-clamp-2 px-2 md:px-0">
        {title}
      </h3>
    );
  };
  return (
    <div className="w-full">
      <div className="md:pt-3 pt-2 pb-3">
        {isDesktop ? (
          <Title title={video?.title} />
        ) : (
          <DrawerDescriptionBox data={video} />
        )}
      </div>
      <div className="flex lg:flex-row flex-col md:justify-between justify-normal md:items-center items-start">
        <div className="flex gap-4 lg:w-2/5 w-full items-center px-2 md:px-0">
          <Link to={`/c/${video?.ownerDetails?.username}`}>
            <Avatar src={video?.ownerDetails?.avatar?.url} />
          </Link>
          <div className="flex flex-col">
            <Link to={`/c/${video?.ownerDetails?.username}`}>
              <p className="text-base text-default-700">
                @{video?.ownerDetails?.username}
              </p>
            </Link>
            <p className="text-sm text-default-700">
              {video?.ownerDetails?.subscribersCount} {video?.ownerDetails?.subscribersCount > 1 ? 'subscribers' : 'subscriber'}
            </p>
          </div>
          <SubscribeBtn
            getCreatorId={() => video?.ownerDetails?._id}
            getIsSubscribed={() => video?.ownerDetails?.isSubscribed}
            getSubscribeButtonId={() => video?._id}
          />
        </div>
        {/* Other Buttons */}
        <div className="relative w-full lg:w-auto pl-2 md:pl-0">
          <div className="flex items-center md:gap-2 gap-1 md:mt-0 mt-3 overflow-x-auto scrollbar-hide pb-2 lg:pb-0">
            <div className="flex-shrink-0">
              <VideoLikeBtn data={video} />
            </div>
            <Button
              radius="full"
              variant="solid"
              className="bg-primary-background text-default-700 flex-shrink-0 whitespace-nowrap"
              startContent={<Forward size={20} strokeWidth={1.5}/>}
            >
              Share
            </Button>
            <Button
              radius="full"
              variant="solid"
              className="bg-primary-background text-default-700 flex-shrink-0 whitespace-nowrap"
              startContent={<ArrowDownToLine size={20} strokeWidth={1.5}/>}
            >
              Download
            </Button>
            <Button
              radius="full"
              variant="solid"
              color="primary"
              className="bg-primary-background text-default-700 flex-shrink-0 whitespace-nowrap"
              startContent={<Bookmark size={20} strokeWidth={1.5}/>}
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
