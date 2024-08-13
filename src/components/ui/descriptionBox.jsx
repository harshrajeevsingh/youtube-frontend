import { useState, useRef, useEffect } from "react";

const DescriptionBox = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const textRef = useRef(null);

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
    <div className=" w-full mt-5 p-4 rounded-xl bg-neutral-800">
      <p
        ref={textRef}
        className={`font-medium text-base tracking-tight mb-2 ${
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
