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

export const PostCard = ({ post }) => {
  return (
    <Card className="w-full md:w-1/2 bg-transparent">
      <CardBody className="py-2">
        <div className="flex justify-between items-start">
          <div className="flex gap-3">
            <Avatar src={post?.ownerDetails?.avatar?.url} size="sm" />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-small font-medium leading-none">
                @{post?.ownerDetails?.username}
              </h4>
              {/* <p className="text-tiny text-default-400">@{tweet.owner.handle}</p> */}
            </div>
          </div>
          {/* {currentUser.id === tweet.owner.id && ( */}
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
          {/* )} */}
        </div>
        <p className="py-2">{post?.content}</p>
      </CardBody>
      <CardFooter className="gap-3">
        <Button
          isIconOnly
          color="danger"
          variant="light"
          aria-label="Like"
          // onClick={handleLike}
        >
          {/* <HeartIcon className={isLiked ? "fill-current" : ""} /> */}
          <HeartIcon />
        </Button>
        <p className="font-semibold">45</p>
      </CardFooter>
    </Card>
  );
};
