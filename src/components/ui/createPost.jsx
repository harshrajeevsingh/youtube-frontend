import { useRef, useEffect, useState } from 'react';
import { Textarea, Button } from '@nextui-org/react';
import { SendHorizontal } from 'lucide-react';

/*
const CreatePost = ({ userId, autoFocus }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your post creation logic here
    console.log("Creating post for user:", userId);
    
    // Reset the input after posting
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <Input
        ref={inputRef}
        placeholder="What's on your mind?"
        className="mb-2"
      />
      <Button type="submit" color="primary">
        Post
      </Button>
    </form>
  );
};
*/
/*
const CreatePost = ({ userId, autoFocus, onPostCreated }) => {
  const [postContent, setPostContent] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postContent.trim()) return; // Prevent empty posts

    try {
      // Implement your post creation logic here
      // For example:
      // await createPost(userId, postContent);
      console.log("Creating post for user:", userId, "Content:", postContent);

      // Clear the input
      setPostContent("");

      // Notify parent component that a post was created
      if (onPostCreated) {
        onPostCreated();
      }
    } catch (error) {
      console.error("Error creating post:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <Input
        ref={inputRef}
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        placeholder="What's on your mind?"
        className="mb-2"
      />
      <Button type="submit" color="primary" disabled={!postContent.trim()}>
        Post
      </Button>
    </form>
  );
};
*/

// The autoFocus on input isn't working now. It works if we change tab and again open posts tab. Will fix later
const CreatePost = ({ userId, autoFocus, onPostCreated }) => {
  const [postContent, setPostContent] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postContent.trim()) return; // Prevent empty posts

    try {
      // Implement your post creation logic here
      // For example:
      // await createPost(userId, postContent);
      console.log('Creating post for user:', userId, 'Content:', postContent);

      // Clear the input
      setPostContent('');

      // Notify parent component that a post was created
      if (onPostCreated) {
        onPostCreated();
      }
    } catch (error) {
      console.error('Error creating post:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative mb-4 w-1/2">
      <Textarea
        ref={inputRef}
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        minRows={6}
        placeholder="What's on your mind?"
        autoFocus={autoFocus}
      />
      <Button
        isIconOnly
        type="submit"
        color="default"
        variant="light"
        className="absolute bottom-0 right-0 m-2"
        isDisabled={!postContent.trim()}
      >
        <SendHorizontal />
      </Button>
    </form>
  );
};
export default CreatePost;
