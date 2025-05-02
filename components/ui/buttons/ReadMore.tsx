"use client";
import React, { useState } from "react";

const ReadMore = ({ children }: { children: React.ReactNode }) => {
  const [readMore, setReadMore] = useState(false);
  const content = typeof children === "string" ? children : "";

  const handleClick = () => {
    if (readMore == false) setReadMore(true);
  };

  return (
    <div className="flex place-items-end">
      <p
        className={`font-normal text-sm text-gray-800 dark:text-gray-400 relative  my-4 ${
          readMore ? " line-clamp-none" : "line-clamp-3"
        }`}
      >
        {children}
      </p>
      {!readMore && content.length > 400 ? (
        <button className=" cursor-pointer" onClick={handleClick}>
          more
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default ReadMore;
