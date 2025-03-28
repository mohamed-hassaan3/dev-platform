"use client";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { signIn } from "next-auth/react";
import React from "react";
import { BottomGradient } from "./BottomGradient";

export const GithubButton = () => {
  const handleClick = () => {
    signIn("github");
  };
  return (
    <>
      <button
        onClick={handleClick}
        className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
        type="submit"
      >
        <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
        <span className="text-sm text-neutral-700 dark:text-neutral-300">
          GitHub
        </span>
        <BottomGradient />
      </button>
    </>
  );
};

export const GoogleButton = () => {
  const handleClick = () => {
    signIn("google");
  };
  return (
    <>
      <button
        onClick={handleClick}
        className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
        type="submit"
      >
        <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
        <span className="text-sm text-neutral-700 dark:text-neutral-300">
          Google
        </span>
        <BottomGradient />
      </button>
    </>
  );
};
