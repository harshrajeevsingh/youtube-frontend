import React, { useState, useEffect } from 'react';
import { Drawer } from 'vaul';
import { Divider } from '@nextui-org/divider';
import ReactTimeAgo from 'react-time-ago';
import { X } from 'lucide-react';

const DrawerDescriptionBox = ({ data }) => {
  const { title, description, createdAt, views } = data;
  const [open, setOpen] = React.useState(false);
  const [totalOffset, setTotalOffset] = useState(0);

  useEffect(() => {
    const updateOffset = () => {
      const navbar = document.querySelector('.navbar');
      const videoContainer = document.querySelector('.video-container');

      if (navbar && videoContainer) {
        const navHeight = navbar.offsetHeight;
        const videoHeight = videoContainer.offsetHeight;
        setTotalOffset(navHeight + videoHeight);
      }
    };

    updateOffset();

    window.addEventListener('resize', updateOffset);

    return () => window.removeEventListener('resize', updateOffset);
  }, []);

  // Scroll lock that preserves video interaction
  useEffect(() => {
    if (open) {
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
  }, [open]);

  console.log(data);
  return (
    <Drawer.Root open={open} onOpenChange={setOpen} modal={false}>
      <Drawer.Trigger>
        <h3 className="text-2xl text-left text-default-700 font-semibold line-clamp-2 px-2 md:px-0">
          {title}
        </h3>
        <div className="flex gap-1 px-2 text-default-700 text-base font-light mt-1">
          <span>{views} views</span>
          <span>•</span>
          <ReactTimeAgo date={new Date(createdAt)} locale="en-US" />
        </div>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-40" />
        <Drawer.Content
          className=" z-50 flex flex-col rounded-t-[10px] fixed bottom-0 left-0 right-0 outline-none"
          style={{
            top: `${totalOffset}px`,
            height: `calc(100vh - ${totalOffset}px)`,
          }}
        >
          <div className="dark:bg-background p-3 flex-1 overflow-y-auto">
            <div className="max-w-md mx-auto space-y-4">
              {/* <div aria-hidden className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8" /> */}
              <div className="flex justify-between content-center">
                <Drawer.Title className="font-bold text-lg self-center">
                  Description
                </Drawer.Title>
                <button
                  className="inline-flex p-3"
                  onClick={() => setOpen(false)}
                >
                  <X />
                </button>
              </div>
              <Divider />
              <h3 className="text-xl text-default-700 font-semibold line-clamp-none">
                {title}
              </h3>
              <p className="dark:bg-neutral-800 bg-neutral-100 text-base p-2 rounded-md">
                {description}
              </p>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default DrawerDescriptionBox;
