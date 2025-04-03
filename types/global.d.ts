import { DefaultSession } from "next-auth";
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
    };
  };
  type Posts = {
    post: PostProps.post;
  };
  type AllPosts = {
    posts: Posts[];
  };
  type Author = {
    email: string;
    name?: string;
    avatar?: string;
  };

  type CommentProps = {
    id: string;
    author: Author;
    text: string;
    createdAt: Date;
    authorId?: string;
    avatar?: string;
  };
  type CommentsProps = {
    Comment: CommentProps[];
  };
  interface Links {
    onClick?: () => void;
    label: string;
    href: string;
    icon: React.JSX.Element | React.ReactNode;
  }
  
  interface SidebarContextProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    animate: boolean;
  }
}
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
