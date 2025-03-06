import { prisma } from "@/lib/prisma";
import React from "react";

const page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: {
      slug: slug,
    },
  });
  return (
    <div>
      <p>I&apos;m a slug</p>
      <h1>{post?.content}</h1>
    </div>
  );
};

export default page;
