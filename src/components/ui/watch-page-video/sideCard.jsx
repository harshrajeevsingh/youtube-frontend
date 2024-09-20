import { Card, CardBody, Avatar, CardHeader, Image } from "@nextui-org/react";
import ReactTimeAgo from "react-time-ago";

import { formatDuration } from "../../../helpers/formatVideoDuration";

const SideCard = ({ video }) => {
  return (
    <Card
      className={`w-full bg-transparent 
        flex sm:flex-row  flex-col mb-4 md:pl-4 md:pr-1 px-2 gap-1
      `}
      shadow="none"
      radius="none"
      fullWidth
      isPressable
      disableRipple
      disableAnimation
    >
      <CardHeader
        className={`w-full sm:w-2/5 aspect-video relative rounded-xl z-0 p-0`}
      >
        <Image
          src={video?.thumbnail?.url}
          alt={video?.title}
          className={` aspect-video w-full rounded-lg object-cover`}
        />
        <div
          className={`absolute bottom-1 right-1 px-1 bg-black/55 z-10 rounded-md text-default dark:text-primary-foreground`}
        >
          {formatDuration(video?.duration)}
        </div>
      </CardHeader>
      <CardBody
        className={`
         sm:w-3/5 w-full flex flex-row items-center p-0 pl-1 gap-3`}
      >
        <Avatar
          radius="full"
          size="md"
          src={video?.ownerDetails?.avatar.url}
          className="sm:hidden block flex-shrink-0 mt-2"
        />

        <div className="flex flex-col w-full min-w-0">
          <h4
            className={`text-large md:text-medium font-medium text-default-600 leading-tight line-clamp-2 mt-1 mb-1 md:mt-0`}
          >
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

export default SideCard;
