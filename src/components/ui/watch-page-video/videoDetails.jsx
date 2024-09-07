import { useEffect } from "react";
import { Avatar, Button } from "@nextui-org/react";

import DescriptionBox from "./descriptionBox";
import { SubscribeBtn } from "./subscribeBtn";
import { VideoLikeBtn } from "./videoLikeBtn";
import { Bookmark, ArrowDownToLine, Forward } from "lucide-react";

function VideoDetails({ video }) {
  useEffect(() => {
    console.log("VideoDetails rendered");
  }, []);

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
          <SubscribeBtn data={video} />
        </div>
        <div className="flex items-center md:gap-2 gap-1 md:mt-0 mt-3">
          <VideoLikeBtn data={video} />
          <Button
            radius="full"
            variant="faded"
            className="bg-default-100 text-default-700"
            startContent={<Forward strokeWidth={1} />}
          >
            Share
          </Button>
          <Button
            radius="full"
            variant="faded"
            className="bg-default-100 text-default-700 "
            startContent={<ArrowDownToLine strokeWidth={1} />}
          >
            Download
          </Button>
          <Button
            radius="full"
            variant="faded"
            color="primary"
            className="bg-default-100 text-default-700 "
            startContent={<Bookmark strokeWidth={1} />}
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
