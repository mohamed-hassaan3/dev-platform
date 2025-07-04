"use client";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "@/actions/PrismaActions";
import AvatarImg from "@/components/AvatarImg";
import React, { useState, useTransition } from "react";

export function PostForm() {
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setFormError(null);
    startTransition(async () => {
      try {
        await createPost(formData);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to create post.";
        setFormError(errorMessage);
      }
    });
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <p className="text-neutral-600 text-lg max-w-lg mt-2 dark:text-neutral-300 font-bold">
        Create Post
      </p>

      <form
        className="my-8"
        action={handleSubmit}
      >
        <div className="flex gap-6 flex-col space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="title">Title</Label>
            <Input
              id="text"
              placeholder="Add title"
              type="text"
              name="title"
              required
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="message">Description</Label>
            <Textarea name="content" className="max-h-[200px] min-h-[100px] resize-none" required />
          </LabelInputContainer>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <LabelInputContainer>
              <Label htmlFor="picture">Picture <small className=" italic opacity-85">(required)</small></Label>
              <AvatarImg />
            </LabelInputContainer>
          </div>
        </div>
        {formError && (
          <div className="text-red-500 text-sm mb-2">{formError}</div>
        )}
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Posting..." : "Create Post"}
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
