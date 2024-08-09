import {
  Card,
  CardBody,
  CardFooter,
  Avatar,
  CardHeader,
  Image,
  Button,
} from "@nextui-org/react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ReactTimeAgo from "react-time-ago";

TimeAgo.addDefaultLocale(en);

const VideoCard = ({ video }) => {
  return (
    // <Card
    //   className="w-[400px] xl:w-[380px] lg:w-[320px] md:w-[280px] bg-transparent"
    //   shadow="none"
    //   radius="none"
    //   fullWidth
    // >
    //   <CardHeader className="rounded-xl p-0">
    //     <Image
    //       src={video.thumbnail.url}
    //       alt={video.title}
    //       className="aspect-video rounded-lg"
    //     />
    //   </CardHeader>
    //   <CardBody className="w-full flex items-start px-0 gap-3">
    //     <div className="flex w-full gap-8">
    //       <div className="w-6 h-6">
    //         <Avatar
    //           radius="full"
    //           size="md"
    //           className="mt-2 "
    //           src={video.ownerDetails.avatar.url}
    //         />
    //       </div>
    //       <div className="flex flex-col w-full items-start justify-center">
    //         <h4 className="text-large w-full font-semibold truncate text-default-600">
    //           {video.title}
    //         </h4>
    //         <h5 className="text-base text-default-500">
    //           {video.ownerDetails.username}
    //         </h5>
    //         <h5 className="text-base  text-default-500">
    //           {video.views} {video.views > 1 ? "views" : "view"} •{" "}
    //           <ReactTimeAgo date={new Date(video.createdAt)} locale="en-US" />
    //         </h5>
    //       </div>
    //     </div>
    //   </CardBody>
    // </Card>

    <Card
      className="w-full bg-transparent"
      shadow="none"
      radius="none"
      fullWidth
      isFooterBlurred
    >
      <CardHeader className="relative rounded-xl z-0 p-0 ">
        <Image
          src={video?.thumbnail?.url}
          alt={video?.title}
          className="aspect-video w-full rounded-lg object-cover "
        />
        <div className="absolute bottom-0 right-0  z-10">{video.duration}</div>
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
              <ReactTimeAgo
                date={new Date(video?.createdAt)}
                locale="en-US"
                timeStyle="twitter"
              />
            </h5>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default VideoCard;
