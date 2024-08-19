import { useState } from "react";
import { Button } from "@nextui-org/react";
import { LoginModal } from "../loginModal";

import { useSubscribeToCreator } from "../../../api/subscribeApi";
import { useUserStoreSelectors } from "../../../store/userSlice";

export const SubscribeBtn = ({ data: video }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const user = useUserStoreSelectors.use.user();

  const { mutate: subscribeToCreator, isLoading } = useSubscribeToCreator(
    video?._id
  );

  const handleSubscribe = () => {
    if (user) {
      subscribeToCreator(video.ownerDetails._id);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <>
      <Button
        color="primary"
        radius="full"
        onClick={handleSubscribe}
        isLoading={isLoading}
        className={`font-semibold px-7 lg:ml-5 ml-auto ${
          video?.ownerDetails?.isSubscribed
            ? "bg-default-100 text-foreground/65"
            : ""
        }`}
      >
        {video?.ownerDetails?.isSubscribed ? "Unsubscribe" : "Subscribe"}
        {console.log("Subscribe btn re-rendered")}
      </Button>
      <LoginModal
        isOpen={isLoginModalOpen}
        onOpenChange={setIsLoginModalOpen}
      />
    </>
  );
};
