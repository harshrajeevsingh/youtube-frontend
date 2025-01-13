import { useState } from 'react';
import { Textarea, Button } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { SendHorizontal } from 'lucide-react';

import { useUserStoreSelectors } from '../../store/userSlice';
import { useAddPost } from '../../api/postTweetApi';

const CreatePost = () => {
  const { mutate: submitContent, isPending, error } = useAddPost();
  const user = useUserStoreSelectors.use.user();
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
      submitContent(data);
    }
    reset();
    setContentText('');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative mb-4 w-full md:w-1/2"
    >
      <Textarea
        {...register('content', { required: true })}
        placeholder="What's on your mind?"
        minRows={5}
        isClearable
        autoComplete="off"
        onClear={() => reset()}
        onChange={handleContentChange}
      />
      {contentText && (
        <Button
          isIconOnly
          type="submit"
          color="default"
          variant="light"
          className="absolute bottom-0 right-0 m-2"
          isDisabled={isPending}
        >
          <SendHorizontal />
        </Button>
      )}
    </form>
  );
};
export default CreatePost;
