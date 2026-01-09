"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { GithubButton, GoogleButton } from "./buttons/AuthButton";
import { BottomGradient, LabelInputContainer } from "./buttons/BottomGradient";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IconUser } from "@tabler/icons-react";
import { toast } from "react-toastify";

export default function SigninForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      toast.success("You are successfully logged in");
      setTimeout(() => router.push("/feed"), 1000);
    } else if (res?.error) {
      toast.error(res?.error);
    }
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-md absolute left-1/2 -translate-x-1/2 md:top-1/2 md:-translate-y-1/2 rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome to Board
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Login to the Dev-Platform if you have a new idea to share with
        Developers let&apos;s grow up together
      </p>
      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="MH3@email.com"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </LabelInputContainer>
        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
          disabled={email === "" && password === ""}
        >
          Sign in &rarr;
          <BottomGradient />
        </button>
      </form>
      <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
      <div className="flex flex-col space-y-4">
        <Link href="/signup">
          <button className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]">
            <IconUser className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              Signup
            </span>
            <BottomGradient />
          </button>
        </Link>
        <GithubButton />
        <GoogleButton />
      </div>
    </div>
  );
}
