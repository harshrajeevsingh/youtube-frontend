import { useState, useRef, useEffect } from 'react';
import ReactTimeAgo from 'react-time-ago';

const DescriptionBox = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const textRef = useRef(null);

  const { description, createdAt, views } = data;

  useEffect(() => {
    const checkTextOverflow = () => {
      if (textRef.current) {
        const lineHeight = parseInt(
          window.getComputedStyle(textRef.current).lineHeight
        );
        const maxHeight = lineHeight * 3;
        setShowMoreButton(textRef.current.scrollHeight > maxHeight);
      }
    };

    checkTextOverflow();
    window.addEventListener('resize', checkTextOverflow);

    return () => {
      window.removeEventListener('resize', checkTextOverflow);
    };
  }, [description]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className=" w-full mt-3 p-3 rounded-xl dark:bg-neutral-800 bg-neutral-100">
      <div className="flex gap-2 text-default-700 text-sm font-medium">
        <span>{views} views</span>
        <ReactTimeAgo date={new Date(createdAt)} locale="en-US" />
      </div>
      <p
        ref={textRef}
        className={`text-default-700 tracking-tight my-2 ${
          isExpanded ? '' : 'line-clamp-3'
        }`}
      >
        {description}
      </p>
      {showMoreButton && (
        <button
          onClick={toggleExpand}
          className="text-blue-600 text-sm cursor-pointer"
        >
          {isExpanded ? 'Show less' : '...more'}
        </button>
      )}
    </div>
  );
};

export default DescriptionBox;
