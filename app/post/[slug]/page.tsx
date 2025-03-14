import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import Image from "next/image";
import React from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import Button from "@/components/ui/buttons/Button";
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa";

const page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: {
      slug: slug,
    },
    include: {
      author: true,
    },
  });
  dayjs.extend(relativeTime);
  const formattedDate = dayjs(post?.createdAt).fromNow();
  return (
    <div className="md:w-[75%] m-auto my-18 flex flex-col gap-8">
      <div className="flex flex-row items-center space-x-4 truncate z-10">
        <Image
          src={post?.image || "No Image"}
          height="100"
          width="100"
          alt="Avatar"
          className="h-10 w-10 rounded-full border-2 object-cover"
        />
        <div className="flex flex-col">
          <p className="font-normal text-base relative z-10">
            {post?.author?.name || post?.author?.email}
          </p>
          <p className="text-sm text-gray-400">{formattedDate}</p>
        </div>
      </div>
      <Image
        src={post?.image || "No Image"}
        height={100}
        width={100}
        alt="post"
        className="w-full h-[500px] object-fill m-auto border shadow-lg rounded-lg"
      />
      <div className="flex-1 space-y-3">
        <h1 className="text-xl font-bold">{post?.title}</h1>
        <h1>{post?.content}</h1>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-1">
          <Button size="meduim" color="primary" className="flex items-center gap-1">
            <AiFillLike />
            <small>527</small>
          </Button>
          <Button size="meduim" color="primary" className="!px-12">
            <FaComment />
          </Button>
        </div>
        <div className="flex flex-col gap-2">
        <textarea name="comment" className="border rounded-lg min-h-[100px] resize-none p-2"></textarea>
        <Button size="meduim" color="primary" className="!px-8 w-fit self-end">
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
