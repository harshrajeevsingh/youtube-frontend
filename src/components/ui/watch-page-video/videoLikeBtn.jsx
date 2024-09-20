import { useState } from "react";
import { Button } from "@nextui-org/react";

import { LoginModal } from "../loginModal";
import { Heart } from "lucide-react";
import { useVideoLike } from "../../../api/videosApi";
import { useUserStoreSelectors } from "../../../store/userSlice";

export const VideoLikeBtn = ({ data: video }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const user = useUserStoreSelectors.use.user();

  const { mutate: toggleVideoLike, isLoading } = useVideoLike(video?._id);

  const handleSubscribe = () => {
    if (user) {
      toggleVideoLike(video.ownerDetails._id);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <>
      <Button
        radius="full"
        variant="faded"
        onClick={handleSubscribe}
        isLoading={isLoading}
        disableRipple
        className="bg-default-100 text-default-700 "
        startContent={
          <Heart
            fill={video?.isLiked ? "currentColor" : "none"}
            strokeWidth={1}
          />
        }
      >
        {video?.likesCount}
      </Button>
      <LoginModal
        isOpen={isLoginModalOpen}
        onOpenChange={setIsLoginModalOpen}
      />
    </>
  );
};
