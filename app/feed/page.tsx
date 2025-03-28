import React from "react";
import { prisma } from "@/lib/prisma";
import { PostCard } from "@/components/cards/PostCard";
import AuthGuard from "../AuthGuard";
// import { getServerSession } from "next-auth";
// import { authConfig, sessionServer } from "@/lib/auth";
// import { redirect } from "next/navigation";

const Feed = async () => {
  // await sessionServer();
  // const session = await getServerSession(authConfig);
  // if (!session) return redirect("/feed");
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
    },
  });
  console.log(posts);
  // console.log("SESSION", session?.user?.email)
  return (
    <AuthGuard>

    <div className="w-[80%] m-auto pr-8 pl-8 pb-8 md:pt-8 pt-0  lg:w-[50%]">
      <h1 className="mb-8 text-2xl font-bold">Feed</h1>
      <ul className="grid grid-cols-1 m-auto lg:gap-16 gap-6 justify-center items-center">
        {posts.length ? (
          posts.map((post) => (
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
        </AuthGuard>
  );
};

export default Feed;
