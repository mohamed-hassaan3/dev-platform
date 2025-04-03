"use client";
import { signOut, useSession } from "next-auth/react";
import SidebarLink from "./SidebarLink";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconCoffee,
  IconUserBolt,
} from "@tabler/icons-react";

const BarLinks = () => {
  const { data: session } = useSession();
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
      label: session ? "Log Out" : "Log In",
      href: session ? "/" : "/signin",
      icon: (
        <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      onClick: session ? (() => signOut({callbackUrl: "/"})) : undefined,
    },
  ];
  return (
    <>
      {links.map((link, idx) => (
        <SidebarLink key={idx} link={link} />
      ))}
    </>
  );
};

export default BarLinks;
