import { useState } from 'react';
import { Avatar, Input, Button } from '@nextui-org/react';
import { useForm } from 'react-hook-form';

import { useUserStoreSelectors } from '../../../../store/userSlice';
import { useAddComment } from '../../../../api/commentApi';
import { LoginModal } from '../../loginModal';
import { SendHorizonal } from 'lucide-react';
const AddComment = ({ videoId }) => {
  const user = useUserStoreSelectors.use.user();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { mutate: submitComment, isPending, error } = useAddComment(videoId);
  const { handleSubmit, reset, register } = useForm({
    defaultValues: {
      content: '',
    },
  });

  const [contentText, setContentText] = useState('');

  const handleContentChange = (e) => {
    setContentText(e.target.value);
  };

  const onSubmit = (data) => {
    if (user) {
      submitComment(data);
    } else {
      setIsLoginModalOpen(true);
    }
    reset();
    setContentText('');
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex gap-3 mb-5"
      >
        <div>
          <Avatar showFallback src={user?.avatar?.url} size="sm" />
        </div>
        <div className="flex-grow flex items-center">
          <Input
            {...register('content', { required: true })}
            isClearable
            type="text"
            variant="underlined"
            placeholder="Add a comment..."
            className="flex-grow"
            autoComplete="off"
            onClear={() => {
              reset();
              setContentText('');
            }}
            onChange={handleContentChange}
          />

          {contentText && (
            <Button
              isIconOnly
              type="submit"
              color="default"
              variant="light"
              className="ml-2"
              size="sm"
              isDisabled={isPending}
            >
              <SendHorizonal />
            </Button>
          )}
        </div>
      </form>
      <LoginModal
        isOpen={isLoginModalOpen}
        onOpenChange={setIsLoginModalOpen}
      />
    </>
  );
};
export default AddComment;
