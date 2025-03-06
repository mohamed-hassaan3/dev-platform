import React from "react";
import { prisma } from "@/lib/prisma";
import { PostCard } from "@/components/cards/PostCard";

const Feed = async () => {
  const posts = await prisma.post.findMany();
  console.log(posts);
  return (
    <div className="w-[75%] m-auto p-16">
      <h1 className="mb-8 text-2xl font-bold">Feed</h1>
      <ul className="flex gap-4 justify-center items-center">
        {posts.length > 0
          ? posts.map((post) => (
              <li key={post.id}>
                <PostCard post={post} />
              </li>
            ))
          : "No Post yet"}
      </ul>
    </div>
  );
};

export default Feed;
