import { Image } from '@nextui-org/react';
import ReactTimeAgo from 'react-time-ago';

import { formatDuration } from '../../../helpers/formatVideoDuration';

const LikedVideoCard = ({ data }) => {
  return (
    <div className="w-full px-3 md:px-0  flex gap-4 mb-5">
      <div className="relative md:w-3/12 w-5/12 aspect-video">
        <Image src={data?.thumbnail?.url} />
        <div
          className={`absolute bottom-2 right-2 px-1 bg-black/55 z-10 rounded-md text-default dark:text-primary-foreground`}
        >
          {formatDuration(data?.duration)}
        </div>
      </div>
      <div className="md:w-9/12 w-7/12">
        <p className="text-large font-medium leading-snug text-default-600 line-clamp-2">
          {data?.title}
        </p>
        <p className="text-sm text-default-500 line-clamp-2 pt-1">
          {data?.ownerDetails?.username}
          {' • '}
          {data?.views} views
          {' • '}
          <ReactTimeAgo date={new Date(data?.createdAt)} locale="en-US" />
        </p>
      </div>
    </div>
  );
};

export default LikedVideoCard;
