import { useState, useRef } from "react";
import { Avatar, Input, Button } from "@nextui-org/react";
import { useForm, Controller, useWatch } from "react-hook-form";

import { useUserStoreSelectors } from "../../../../store/userSlice";
import { useAddComment } from "../../../../api/commentApi";

/*
const AddComment = ({ videoId }) => {
  const user = useUserStoreSelectors.use.user();
  console.log(videoId);
  const { mutate: submitComment, isPending, error } = useAddComment(videoId);
  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      content: "",
    },
  });

  const contentText = watch("content");

  const onSubmit = (data) => {
    console.log(data);
    if (user) {
      submitComment(data);
    } else {
      console.log("Login to add comment");
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex gap-3 mb-5">
      <div>
        <Avatar showFallback src={user?.avatar?.url} />
      </div>
      <div className="flex-grow flex items-center">
        <Controller
          name="content"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              {...field}
              isClearable
              type="text"
              variant="underlined"
              placeholder="Add a comment..."
              className="flex-grow"
              onClear={() => reset()}
            />
          )}
        />
        {contentText && (
          <Button
            type="submit"
            color="primary"
            size="sm"
            className="ml-2"
            isDisabled={isPending}
          >
            Post
          </Button>
        )}
      </div>
      {error && <p>{error.message}</p>}
    </form>
  );
};
*/
/*
const AddComment = ({ videoId }) => {
  const user = useUserStoreSelectors.use.user();
  console.log(videoId);
  const { mutate: submitComment, isPending, error } = useAddComment(videoId);
  const { handleSubmit, reset, register } = useForm({
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    if (user) {
      submitComment(data);
    } else {
      console.log("Login to add comment");
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex gap-3 mb-5">
      <div>
        <Avatar showFallback src={user?.avatar?.url} />
      </div>
      <div className="flex-grow flex items-center">
        <Input
          {...register("content", { required: true })}
          isClearable
          type="text"
          variant="underlined"
          placeholder="Add a comment..."
          className="flex-grow"
          onClear={() => reset()}
        />

        <Button
          type="submit"
          color="primary"
          size="sm"
          className="ml-2"
          isDisabled={isPending}
        >
          Post
        </Button>
      </div>
      {error && <p>{error.message}</p>}
    </form>
  );
};
*/
const AddComment = ({ videoId }) => {
  const user = useUserStoreSelectors.use.user();
  console.log(videoId);
  const { mutate: submitComment, isPending, error } = useAddComment(videoId);
  const { handleSubmit, reset, register } = useForm({
    defaultValues: {
      content: "",
    },
  });

  const [contentText, setContentText] = useState("");

  const handleContentChange = (e) => {
    setContentText(e.target.value);
  };

  const onSubmit = (data) => {
    if (user) {
      submitComment(data);
    } else {
      console.log("Login to add comment");
    }
    reset();
    setContentText("");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex gap-3 mb-5">
      <div>
        <Avatar showFallback src={user?.avatar?.url} />
      </div>
      <div className="flex-grow flex items-center">
        <Input
          {...register("content", { required: true })}
          isClearable
          type="text"
          variant="underlined"
          placeholder="Add a comment..."
          className="flex-grow"
          onClear={() => {
            reset();
            setContentText("");
          }}
          onChange={handleContentChange}
        />

        {contentText && (
          <Button
            type="submit"
            color="primary"
            size="sm"
            className="ml-2"
            isDisabled={isPending}
            radius="full"
          >
            Comment
          </Button>
        )}
      </div>
    </form>
  );
};
export default AddComment;
