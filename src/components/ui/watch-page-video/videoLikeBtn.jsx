import { useState } from 'react';
import { Button } from '@nextui-org/react';
import { toast } from 'sonner';
import { Heart } from 'lucide-react';

import { useUserStoreSelectors } from '../../../store/userSlice';
import { LoginModal } from '../loginModal';
import { useVideoLike } from '../../../api/videosApi';

export const VideoLikeBtn = ({ data: video }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const user = useUserStoreSelectors.use.user();

  const { mutate: toggleVideoLike, isLoading } = useVideoLike(video?._id);

  const handleSubscribe = () => {
    if (user) {
      toggleVideoLike(video.ownerDetails._id);
    } else {
      toast.info('Please Login first');
      setIsLoginModalOpen(true);
    }
  };

  return (
    <>
      <Button
        radius="full"
        variant="solid"
        onClick={handleSubscribe}
        isLoading={isLoading}
        disableRipple
        className="bg-primary-background text-default-700 flex-shrink-0  whitespace-nowrap ml-2 md:ml-0"
        startContent={
          <Heart
            fill={video?.isLiked ? 'currentColor' : 'none'}
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
