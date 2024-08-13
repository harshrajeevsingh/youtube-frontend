import { Avatar, Button } from "@nextui-org/react";

import DescriptionBox from "./descriptionBox";

import { ThumbsUpIcon } from "../icons/thumbsUpIcon";
import { ShareIcon } from "../icons/shareIcon";
import { DownloadIcon } from "../icons/downloadIcon";
import { SaveIcon } from "../icons/saveIcon";

function VideoDetails() {
  const description =
    "This is a long description that goes on for multiple lines. It contains lots of information about the video, its creator, and maybe some links or timestamps. This is a long description that goes on for multiple lines. It contains lots of information about the video, its creator, and maybe some links or timestamps. This is a long description that goes on for multiple lines. It contains lots of information about the video, its creator, and maybe some links or timestamps.This is a long description that goes on for multiple lines. It contains lots of information about the video, its creator, and maybe some links or timestamps";
  return (
    <div className="w-full pt-3 px-3">
      <h3 className="text-2xl text-default-600 font-semibold line-clamp-2">
        Cinematic Impact Trailer
      </h3>
      <div className="flex md:flex-row flex-col md:justify-between justify-normal md:items-center items-start mt-3">
        <div className="flex gap-4 md:w-2/5 w-full items-center ">
          <Avatar
            src="https://res.cloudinary.com/dqcwf8nvt/image/upload/v1719723598/amoggajyh3cszz7aggpc.png"
            className="-z-10"
          />
          <div className="flex flex-col">
            <p className="text-lg">@harsh</p>
            <p className="text-sm text-foreground/80">200 followers</p>
          </div>
          <Button
            color="primary"
            radius="full"
            className="font-semibold px-7 lg:ml-5 ml-auto -z-10"
          >
            Subscribe
          </Button>
        </div>
        <div className="flex  items-center gap-2  md:mt-0 mt-3 ">
          <Button
            radius="full"
            className="text-base -z-10"
            startContent={<ThumbsUpIcon />}
          >
            10k
          </Button>
          <Button
            radius="full"
            className="text-base -z-10"
            startContent={<ShareIcon />}
          >
            Share
          </Button>
          <Button
            radius="full"
            className="text-base -z-10"
            startContent={<DownloadIcon />}
          >
            download
          </Button>
          {/* <Button
            radius="full"
            className="text-base -z-10"
            startContent={<SaveIcon />}
          >
            Save
          </Button> */}
        </div>
      </div>
      {/* <div className="mt-5"> */}
      <DescriptionBox text={description} />
      {/* </div> */}
    </div>
  );
}

export default VideoDetails;
