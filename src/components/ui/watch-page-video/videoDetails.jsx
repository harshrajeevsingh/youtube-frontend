import { useEffect } from "react";
import { Avatar, Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { Bookmark, ArrowDownToLine, Forward } from "lucide-react";

import DescriptionBox from "./descriptionBox";
import { SubscribeBtn } from "./subscribeBtn";
import { VideoLikeBtn } from "./videoLikeBtn";

function VideoDetails({ video }) {
  useEffect(() => {
    console.log("VideoDetails rendered");
  }, []);

  return (
    <div className="w-full md:pt-3 pt-2 ">
      <h3 className="text-2xl text-default-700 font-semibold line-clamp-2 px-2 md:px-0">
        {video?.title}
      </h3>
      <div className="flex lg:flex-row flex-col md:justify-between justify-normal md:items-center items-start mt-3">
        <div className="flex gap-4 lg:w-2/5 w-full items-center px-2 md:px-0">
          <Link to={`/c/${video?.ownerDetails?.username}`}>
            <Avatar src={video?.ownerDetails?.avatar?.url} />
          </Link>
          <div className="flex flex-col">
            <Link to={`/c/${video?.ownerDetails?.username}`}>
              <p className="text-lg text-default-700">
                @{video?.ownerDetails?.username}
              </p>
            </Link>
            <p className="text-sm text-default-700">
              {video?.ownerDetails?.subscribersCount} {"subscribers"}
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
              variant="faded"
              className="bg-default-100 text-default-700 flex-shrink-0 whitespace-nowrap"
              startContent={<Forward size={20} />}
            >
              Share
            </Button>
            <Button
              radius="full"
              variant="faded"
              className="bg-default-100 text-default-700 flex-shrink-0 whitespace-nowrap"
              startContent={<ArrowDownToLine size={20} />}
            >
              Download
            </Button>
            <Button
              radius="full"
              variant="faded"
              color="primary"
              className="bg-default-100 text-default-700 flex-shrink-0 whitespace-nowrap"
              startContent={<Bookmark size={20} />}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
      <DescriptionBox data={video} />
    </div>
  );
}

export default VideoDetails;
