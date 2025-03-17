import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import relativeTime from "dayjs/plugin/relativeTime";

const CommentCard = ({ comment }: { comment: CommentProps }) => {
  const { id, text, author, createdAt } = comment;
  dayjs.extend(relativeTime);
  const formattedDate = dayjs(createdAt).fromNow();
  return (
    <div className="border shadow-lg py-2 px-4 rounded-md">
      <div className="">
        <Link
          href={`/profile/${id}`}
          className="flex flex-row items-center space-x-4 truncate z-10"
        >
          <Image
            src={author?.avatar || "Avatar"}
            height="100"
            width="100"
            alt="Avatar"
            className="h-10 w-10 rounded-full border-2 object-cover"
          />
          <div className="flex flex-col">
            <p className="font-normal text-base text-gray-600 relative z-10">
              {author?.name || author?.email}
            </p>
            <p className="text-sm text-gray-400">{formattedDate}</p>
          </div>
        </Link>
      </div>
      <div className="text content">
        <p className="font-normal text-sm text-gray-800 relative z-10 my-4 line-clamp-3">
          {text}
        </p>
      </div>
    </div>
  );
};

export default CommentCard;
