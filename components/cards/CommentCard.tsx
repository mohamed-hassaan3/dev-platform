import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import relativeTime from "dayjs/plugin/relativeTime";

const CommentCard = ({ comment }: { comment: CommentProps }) => {
  const { text, author, createdAt, authorId } = comment;
  dayjs.extend(relativeTime);
  const formattedDate = dayjs(createdAt).fromNow();
  
  return (
    <div className="border shadow-sm py-2 px-4 rounded-md border-gray-400 dark:border-gray-600">
      <div className="">
        <Link
          href={`/userProfile/${authorId}`}
          className="flex flex-row items-center space-x-4 truncate  w-fit"
        >
          <Image
            src={
              author?.avatar ||
              "https://res.cloudinary.com/dx14mtfkw/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1741642055/developer-platform/coding_prwarh.png"
            }
            height="100"
            width="100"
            alt="Avatar"
            className="h-10 w-10 rounded-full border-2 object-cover"
          />
          <div className="flex flex-col">
            <p className="font-normal text-base text-gray-800 dark:text-gray-200 relative ">
              {author?.name || author?.email}
            </p>
            <p className="text-sm text-gray-800 dark:text-gray-500">
              {formattedDate}
            </p>
          </div>
        </Link>
      </div>
      <div className="text content">
        <p className="font-normal text-sm text-gray-800 dark:text-gray-400 relative  my-4 line-clamp-3">
          {text}
        </p>
      </div>
    </div>
  );
};

export default CommentCard;
