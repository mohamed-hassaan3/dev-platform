"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
export function PostCard({ post }: Posts) {
  const { content, title, author, slug, createdAt, image } = post;
  dayjs.extend(relativeTime);
  const formattedDate = dayjs(createdAt).fromNow();

  return (
    <Link href={`/post/${slug}`} className="max-w-xs w-full group/card">
      <div
        className={cn(
          "cursor-pointer overflow-hidden relative card h-96 rounded-md border dark:border-white shadow-xl max-w-full mx-auto backgroundImage flex flex-col justify-between p-4"
        )}
      >
        <Image
          height={100}
          width={100}
          src={image}
          alt="Post"
          style={{ objectFit: "fill" }}
          className="absolute inset-0 w-full h-full"
        />
        <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
        <div className="flex flex-row items-center space-x-4 truncate z-10">
          <Image
            src={image}
            height="100"
            width="100"
            alt="Avatar"
            className="h-10 w-10 rounded-full border-2 object-cover"
          />
          <div className="flex flex-col">
            <p className="font-normal text-base text-gray-50 relative z-10">
              {author?.name || author?.email}
            </p>
            <p className="text-sm text-gray-400">{formattedDate}</p>
          </div>
        </div>
        <div className="text content">
          <h1 className="font-bold text-xl md:text-2xl text-gray-50 relative z-10">
            {title}
          </h1>
          <p className="font-normal text-sm text-gray-50 relative z-10 my-4 line-clamp-3">
            {content}
          </p>
        </div>
      </div>
    </Link>
  );
}
