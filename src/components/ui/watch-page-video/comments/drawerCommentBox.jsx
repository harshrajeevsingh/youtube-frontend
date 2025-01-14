import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Drawer } from 'vaul';
import { Divider } from '@nextui-org/divider';
import { X } from 'lucide-react';

import useScrollLock from '../../../../hooks/useScrollLock';
import { fetchCommentByVideoId } from '../../../../api/commentApi';

import AnimatedCommentPreview from './animatedcontentPreview';
import CommentList from './commentList';
import AddComment from './addComment';

const DrawerCommentBox = ({ videoId }) => {
  const [open, setOpen] = useState(false);
  const [totalOffset, setTotalOffset] = useState(0);

  const { data, status } = useQuery({
    queryKey: ['initialComments', videoId],
    queryFn: () => fetchCommentByVideoId({ videoId, limit: 2 }),
  });

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
      <Drawer.Trigger className="px-2 pb-3 w-full">
        <div className="bg-primary-background w-full h-20 p-2 flex flex-col rounded-lg">
          <h5 className="text-left text-sm font-medium">Comments</h5>
          <div className="flex-grow mt-2">
            {status === 'loading' ? (
              <p className="text-sm">Loading comments...</p>
            ) : status === 'error' ? (
              <p className="text-sm text-red-500">Failed to load comments</p>
            ) : data?.data?.docs?.length > 0 ? (
              <AnimatedCommentPreview
                comments={data?.data?.docs?.slice(0, 2)}
              />
            ) : (
              <p className="text-sm">Be the first to comment.</p>
            )}
          </div>
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
          <div className="bg-background flex flex-col h-full">
            {/* Fixed Header */}
            <div className="px-3 py-2">
              <div className="max-w-md mx-auto">
                <div className="flex justify-between content-center">
                  <Drawer.Title className="font-bold text-lg self-center">
                    Comments
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
            <div className="flex-1 px-3 pb-10 overflow-y-auto">
              <CommentList videoId={videoId} />
            </div>
            <div className="relative bg-primary-background px-3 pt-3">
              <div className="absolute bottom-[71px] left-0 w-full h-16 bg-gradient-to-t from-background to-transparent" />
              <AddComment videoId={videoId} />
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default DrawerCommentBox;
