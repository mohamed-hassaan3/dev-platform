import { prisma } from "@/lib/prisma";
import React from "react";
import CommentCard from "../cards/CommentCard";

const CommentsField = async ({ slug }: { slug: string }) => {
  const comments = await prisma.comment.findMany({
    where: {
      post: {
        slug, 
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: {
        select: {
          image: true,
          email: true,
          name: true,
        },
      },
    },
  });

  return (
    <div className="border space-y-4 max-h-[2000px] min-h-[500px] w-full rounded-lg p-4 overflow-y-scroll overflow-hidden">
      {comments?.length ? (
        comments.map((comment) => (
          <div key={comment.id}>
            <CommentCard
              comment={{
                ...comment,
                author: {
                  ...comment.author,
                  name: comment.author.name ?? undefined,
                  avatar: comment.author.image ?? undefined,
                },
              }}
            />
          </div>
        ))
      ) : (
        <p className="text-center mt-12 opacity-70 italic">No Comment yet</p>
      )}
    </div>
  );
};

export default CommentsField;