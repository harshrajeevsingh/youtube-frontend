import { useEffect } from 'react';

const useScrollLock = (isLocked) => {
  useEffect(() => {
    if (isLocked) {
      const content = document.querySelector('main') || document.body;
      content.style.overflow = 'hidden';
      content.style.touchAction = 'none';

      // Ensure video container remains interactive
      const videoContainer = document.querySelector('.video-container');
      if (videoContainer) {
        videoContainer.style.touchAction = 'auto';
      }
    } else {
      // Reset styles when drawer closes
      const content = document.querySelector('main') || document.body;
      content.style.overflow = '';
      content.style.touchAction = '';

      const videoContainer = document.querySelector('.video-container');
      if (videoContainer) {
        videoContainer.style.touchAction = '';
      }
    }

    return () => {
      const content = document.querySelector('main') || document.body;
      content.style.overflow = '';
      content.style.touchAction = '';

      const videoContainer = document.querySelector('.video-container');
      if (videoContainer) {
        videoContainer.style.touchAction = '';
      }
    };
  }, [isLocked]);
};

export default useScrollLock;
