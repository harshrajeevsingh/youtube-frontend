import CommentList from './commentList';
import AddComment from './addComment';
import { useEffect } from 'react';

const CommentSection = ({ videoId }) => {
  useEffect(() => {
    console.log('CommentSection is rendered');
  });
  return (
    <div className="w-full mt-2 md:mt-10">
      <AddComment videoId={videoId} />
      <CommentList videoId={videoId} />
    </div>
  );
};

export default CommentSection;
