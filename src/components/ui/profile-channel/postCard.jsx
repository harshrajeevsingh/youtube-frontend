import {
  Card,
  CardBody,
  CardFooter,
  Avatar,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
  Button,
} from "@nextui-org/react";
import { EllipsisVertical, HeartIcon } from "lucide-react";
import ReactTimeAgo from "react-time-ago";

import { useUserStoreSelectors } from "../../../store/userSlice";

export const PostCard = ({ post }) => {
  const user = useUserStoreSelectors.use.user();
  return (
    <Card
      shadow="none"
      className="w-full md:w-2/3 bg-transparent border  border-gray-500 mb-4"
    >
      <CardBody className="pt-5 pl-5">
        <div className="flex justify-between items-start">
          <div className="flex gap-3">
            <Avatar
              src={post?.ownerDetails?.avatar?.url}
              size="md"
              className="self-center"
            />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-sm">@{post?.ownerDetails?.username}</h4>
              <ReactTimeAgo
                date={new Date(post?.createdAt)}
                locale="en-US"
                className="text-tiny text-default-400"
              />
            </div>
          </div>
          {user?._id === post?.ownerDetails?._id && (
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <EllipsisVertical />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Tweet actions">
                <DropdownItem>Update</DropdownItem>
                <DropdownItem className="text-danger" color="danger">
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
        </div>
        <p className="py-2">{post?.content}</p>
      </CardBody>
      <CardFooter>
        <Button
          isIconOnly
          //   color="primary"
          variant="light"
          aria-label="Like"
          // onClick={handleLike}
        >
          <HeartIcon className={post?.isLiked ? "fill-current" : ""} />
        </Button>
        <p className="font-semibold">{post?.likesCount}</p>
      </CardFooter>
    </Card>
  );
};
