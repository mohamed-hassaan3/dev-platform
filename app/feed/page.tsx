import React from "react";
import { prisma } from "@/lib/prisma";
import { PostCard } from "@/components/cards/PostCard";

const Feed = async () => {
  const user = await prisma.user.findUnique({
    where: { email: "mmhassaan3@gmail.com" },
    include: {
      posts: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          author: {
            select: {
              name: true,
              email: true,
              avatar: true,
            },
          },
        },
      },
    },
  });
  console.log(user?.posts);
  return (
    <div className="w-[100%] m-auto pr-8 pl-8 pb-8 md:pt-8 pt-0  lg:w-[70%]">
      <h1 className="mb-8 text-2xl font-bold">Feed</h1>
      <ul className="grid grid-cols-1  m-auto lg:gap-16 gap-6 justify-center items-center">
        {user?.posts.length ? (
          user?.posts.map((post) => (
            <li key={post.id}>
              <PostCard post={post} />
            </li>
          ))
        ) : (
          <p className="text-center mt-24 text-xl absolute left-1/2 top-1/4">
            No Post yet
          </p>
        )}
      </ul>
    </div>
  );
};

export default Feed;
