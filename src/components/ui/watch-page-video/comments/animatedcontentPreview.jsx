import { useEffect, useState } from 'react';
import { Avatar } from '@nextui-org/react';

const AnimatedCommentPreview = ({ comments }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % comments.length);
    }, 5000); // Show each comment for 5 seconds
    return () => clearInterval(interval);
  }, [comments]);

  if (!comments || comments.length === 0) return null;

  return (
    <div className="relative w-full h-10 overflow-hidden">
      {comments.map((comment, index) => (
        <div
          key={comment._id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}
          style={{ willChange: 'transform, opacity' }}
        >
          <div className="flex items-center gap-3">
            <Avatar
              src={comment.owner.avatar.url}
              alt={comment.owner.username}
              className='w-7 h-7'
            />
            <p className="text-sm truncate max-w-xs">{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnimatedCommentPreview;
