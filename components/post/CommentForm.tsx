"use client";
import React, { useState } from "react";
import { createComment } from "@/actions/PrismaActions";
import Button from "../ui/buttons/Button";

export function CommentForm({ slug }: { slug: string }) {
  const [text, setText] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("text", text);
      formData.append("postId", slug); // Pass the slug as postId
      await createComment(formData);
      setText(""); // Clear the form after submission
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <label htmlFor="text">Comment</label>
        <textarea
          className="border rounded-lg min-h-[100px] resize-none p-2"
          id="text"
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
      </div>
      <Button size="medium" color="primary" className="!px-8 w-fit float-end mt-2 py-1">
        Submit
      </Button>
    </form>
  );
}