import { useState, useEffect } from 'react';
import { Drawer } from 'vaul';
import { Divider } from '@nextui-org/divider';
import ReactTimeAgo from 'react-time-ago';
import { X } from 'lucide-react';
import useScrollLock from '../../../hooks/useScrollLock';

const DrawerDescriptionBox = ({ data }) => {
  const { title, description, createdAt, views } = data;
  const [open, setOpen] = useState(false);
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

  useScrollLock(open);

  return (
    <Drawer.Root open={open} onOpenChange={setOpen} modal={false}>
      <Drawer.Trigger>
        <h3 className="text-xl text-left text-default-700 font-semibold line-clamp-2 px-2 md:px-0">
          {title}
        </h3>
        <div className="flex gap-1 px-2 text-default-700 text-sm font-light mt-1">
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
            height: `calc(100svh - ${totalOffset}px)`,
          }}
        >
          <div className="bg-background flex flex-col h-full">
            {/* Fixed Header */}
            <div className="px-3 py-2">
              <div className="max-w-md mx-auto">
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
              </div>
            </div>

            <Divider />

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="max-w-md mx-auto px-3 pb-3 space-y-4">
                <h3 className="mt-3 text-xl text-default-700 font-semibold line-clamp-none">
                  {title}
                </h3>
                <p className="dark:bg-neutral-800 bg-neutral-100 text-base p-2 rounded-md">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default DrawerDescriptionBox;
