import { Avatar, Button } from "@nextui-org/react";

import DescriptionBox from "./descriptionBox";

import { ThumbsUpIcon } from "../icons/thumbsUpIcon";
import { ShareIcon } from "../icons/shareIcon";
import { DownloadIcon } from "../icons/downloadIcon";
import { BookmarkIcon } from "../icons/bookMarkIcon";

function VideoDetails({ video }) {
  return (
    <div className="w-full pt-3 px-2 md:px-0">
      <h3 className="text-2xl text-default-700 font-semibold line-clamp-2">
        {video?.title}
      </h3>
      <div className="flex lg:flex-row flex-col md:justify-between justify-normal md:items-center items-start mt-3">
        <div className="flex gap-4 lg:w-2/5 w-full items-center">
          <Avatar src={video?.ownerDetails?.avatar?.url} />
          <div className="flex flex-col">
            <p className="text-lg text-default-700">
              @{video?.ownerDetails?.username}
            </p>
            <p className="text-sm text-default-700">
              {video?.ownerDetails?.subscribersCount} {"subscribers"}
            </p>
          </div>
          <Button
            color="primary"
            radius="full"
            className={`font-semibold px-7 lg:ml-5 ml-auto ${
              video?.ownerDetails?.isSubscribed ? "bg-default-100" : ""
            }`}
          >
            Subscribe
          </Button>
        </div>
        <div className="flex items-center md:gap-2 gap-1 md:mt-0 mt-3">
          <Button
            radius="full"
            variant="faded"
            className="bg-default-100 text-default-700 "
            startContent={<ThumbsUpIcon />}
          >
            {video?.likesCount}
          </Button>
          <Button
            radius="full"
            variant="faded"
            className="bg-default-100 text-default-700"
            startContent={<ShareIcon />}
          >
            Share
          </Button>
          <Button
            radius="full"
            variant="faded"
            className="bg-default-100 text-default-700 "
            startContent={<DownloadIcon />}
          >
            Download
          </Button>
          <Button
            radius="full"
            variant="faded"
            color="primary"
            className="bg-default-100 text-default-700 "
            startContent={<BookmarkIcon />}
          >
            Save
          </Button>
        </div>
      </div>
      <DescriptionBox data={video} />
    </div>
  );
}

export default VideoDetails;
