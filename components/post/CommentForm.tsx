"use client";
import React, { useState } from "react";
import Button from "../ui/buttons/Button";

const CommentForm = () => {
  const [comment, setComment] = useState("");
  const handleComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    console.log(comment);
  };
  return (
    <div className="flex flex-col gap-2">
      <textarea
        onChange={handleComment}
        value={comment}
        name="comment"
        className="border rounded-lg min-h-[100px] resize-none p-2"
      ></textarea>
      <Button size="meduim" color="primary" className="!px-8 w-fit self-end">
        Comment
      </Button>
    </div>
  );
};

export default CommentForm;
