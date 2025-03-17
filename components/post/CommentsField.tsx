import { prisma } from "@/lib/prisma";
import React from "react";
import CommentCard from "../cards/CommentCard";

const CommentsField = async () => {
  const comments = await prisma.comment.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: {
        select: {
          avatar: true,
          email: true,
          name: true,
        },
      },
    },
  });
  console.log(comments);
  return (
    <div className="border h-[500px] w-full rounded-lg p-4">
      {comments?.length &&
        comments.map((comment) => (
          <div key={comment.id}>
            <CommentCard
              comment={{
                ...comment,
                author: {
                  ...comment.author,
                  name: comment.author.name ?? undefined,
                  avatar: comment.author.avatar ?? undefined
                },
              }}
            />
          </div>
        ))}
    </div>
  );
};

export default CommentsField;
