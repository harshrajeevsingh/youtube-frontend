import { useState, useRef, useEffect } from "react";

const DescriptionBox = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const textRef = useRef(null);

  const text = data?.description;
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
    window.addEventListener("resize", checkTextOverflow);

    return () => {
      window.removeEventListener("resize", checkTextOverflow);
    };
  }, [text]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className=" w-full mt-3 p-3 rounded-xl dark:bg-neutral-800 bg-neutral-100">
      <div className="flex gap-2 text-base font-semibold">
        <span>{data?.views} views</span>
        <span>2 years ago</span>
      </div>
      <p
        ref={textRef}
        className={`font-medium text-base text-default-700 tracking-tight my-2 ${
          isExpanded ? "" : "line-clamp-3"
        }`}
      >
        {text}
      </p>
      {showMoreButton && (
        <button
          onClick={toggleExpand}
          className="text-blue-600 text-sm cursor-pointer"
        >
          {isExpanded ? "Show less" : "...more"}
        </button>
      )}
    </div>
  );
};

export default DescriptionBox;
