import React from "react";

export {};

declare global {
  type ButtonProps = {
    className?: string;
    children: React.ReactNode;
    color?: primary | secondary;
    size?: small | meduim | large;
    disabled?: boolean;
    type?: "reset" | "submit" | "button" | undefined;
  };
  type PostProps = {
    post: {
      id: string;
      title: string;
      slug: string;
      content: string | null;
      image: string;
      published: boolean;
      authorId: string;
      posts: [];
      createdAt: string;
      updateAt: string;
  }
  };
  type Posts = {
    post: PostProps.post
  }
 type AllPosts = {
  posts: Posts[]
 }
}
