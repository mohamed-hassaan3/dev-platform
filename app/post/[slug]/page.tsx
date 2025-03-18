import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import Image from "next/image";
import React from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import Button from "@/components/ui/buttons/Button";
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import CommentsField from "@/components/post/CommentsField";
import { CommentForm } from "@/components/post/CommentForm";

const page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params; // Get the slug from the URL params
  const post = await prisma.post.findUnique({
    where: {
      slug: slug,
    },
    include: {
      author: true,
    },
  });

  if (!post) {
    return <p>Post not found</p>; // Handle case where the post is not found
  }

  dayjs.extend(relativeTime);
  const formattedDate = dayjs(post.createdAt).fromNow();

  return (
    <div className="md:w-[75%] w-[90%] m-auto my-18 flex flex-col gap-8">
      <Image
        src={post.image || "No Image"}
        height={100}
        width={100}
        alt="post"
        className="w-full h-[500px] object-cover md:object-fill m-auto shadow-lg rounded-lg"
      />
      <h1 className="text-xl font-bold">{post.title}</h1>
      <div className="flex flex-row items-center space-x-4 truncate z-10">
        <Image
          src={post.author.avatar || "No Image"}
          height="100"
          width="100"
          alt="Avatar"
          className="h-10 w-10 rounded-full border-2 object-cover"
        />
        <div className="flex flex-col">
          <p className="font-normal text-base relative z-10">
            {post.author.name || post.author.email}
          </p>
          <p className="text-sm text-gray-400">{formattedDate}</p>
        </div>
      </div>
      <h1>{post.content}</h1>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-1">
          <Button
            size="meduim"
            color="primary"
            className="flex items-center gap-1"
          >
            <AiFillLike />
            <small>527</small>
          </Button>
          <Button size="meduim" color="primary" className="!px-12">
            <FaComment />
          </Button>
        </div>
        {/* Pass the slug to both CommentForm and CommentsField */}
        <CommentForm slug={slug} />
        <CommentsField slug={slug} />
      </div>
    </div>
  );
};

export default page;