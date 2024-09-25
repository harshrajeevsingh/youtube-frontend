import { useState } from "react";
import { Button } from "@nextui-org/react";
import { LoginModal } from "../loginModal";

import { useSubscribeToCreator } from "../../../api/subscribeApi";
import { useUserStoreSelectors } from "../../../store/userSlice";

/*
export const SubscribeBtn = ({ data }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const user = useUserStoreSelectors.use.user();

  const { mutate: subscribeToCreator, isLoading } = useSubscribeToCreator(
    data?._id
  );

  const handleSubscribe = () => {
    if (user) {
      subscribeToCreator(data.ownerDetails._id);
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
          data?.ownerDetails?.isSubscribed
            ? "bg-default-100 text-foreground/65"
            : ""
        }`}
      >
        {data?.ownerDetails?.isSubscribed ? "Unsubscribe" : "Subscribe"}
        {console.log("Subscribe btn re-rendered")}
      </Button>
      <LoginModal
        isOpen={isLoginModalOpen}
        onOpenChange={setIsLoginModalOpen}
      />
    </>
  );
};
*/

export const SubscribeBtn = ({
  getCreatorId,
  getIsSubscribed,
  getSubscribeButtonId,
}) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const user = useUserStoreSelectors.use.user();
  const isSubscribed = getIsSubscribed();
  const creatorId = getCreatorId();
  const subscribeButtonId = getSubscribeButtonId();

  const { mutate: subscribeToCreator, isLoading } =
    useSubscribeToCreator(subscribeButtonId);

  const handleSubscribe = () => {
    if (user) {
      subscribeToCreator(creatorId);
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
          isSubscribed ? "bg-default-100 text-foreground/65" : ""
        }`}
      >
        {isSubscribed ? "Unsubscribe" : "Subscribe"}
      </Button>
      <LoginModal
        isOpen={isLoginModalOpen}
        onOpenChange={setIsLoginModalOpen}
      />
    </>
  );
};
