"use client";
import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/ModeToggle";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconCoffee,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function SidebarPage({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession(); // Access session data
  const [open, setOpen] = useState(false);

  const links = [
    {
      label: "Feed",
      href: "/feed",
      icon: (
        <IconCoffee className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Profile",
      href: "/profile",
      icon: (
        <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: session ? "Sign Out" : "Sign In",
      href: session ? "#" : "/signin",
      icon: (
        <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      onClick: session ? () => signOut({ callbackUrl: "/signin" }) : undefined, // Redirect to /signin after sign-out
    },
  ];
  console.log("Session:", session);
  return (
    <div
      className={cn(
        "mx-auto overflow-scroll flex w-full max-w-full flex-1 flex-col rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-dvh"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className={`justify-between gap-10`}>
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
            <div className="mt-3">
              <ModeToggle />
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: session?.user?.name || session?.user?.email || "User",
                href: session ? "#" : "/signin",
                icon: (
                  <Image
                    src={
                      session?.user?.image ||
                      "https://res.cloudinary.com/dx14mtfkw/image/upload/v1742327599/dx14mtfkw/zpygzmfwed3omckmnvbo.webp"
                    }
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
                onClick: session ? () => signOut() : undefined,
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>

      {children}
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <Image
        src={
          "https://res.cloudinary.com/dx14mtfkw/image/upload/v1742321794/dx14mtfkw/qd4rcjs4vc0jgso2ta6v.png"
        }
        alt="Logo"
        width={20}
        height={20}
      />
      <span className="ml-1 bg-neutral-100 text-black dark:bg-neutral-800 dark:text-white">
        Home
      </span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="/feed"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <Image
        src={
          "https://res.cloudinary.com/dx14mtfkw/image/upload/v1742321794/dx14mtfkw/qd4rcjs4vc0jgso2ta6v.png"
        }
        alt="Logo"
        width={20}
        height={20}
      />
    </Link>
  );
};
