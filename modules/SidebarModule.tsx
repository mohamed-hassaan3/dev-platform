"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Sidebar, SidebarBody } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/ModeToggle";
import Image from "next/image";
import { cn } from "@/lib/utils";
import BarLinks from "../components/BarLinks";
import Logo from "@/components/Logo";
import LogoIcon from "@/components/LogoIcon";
import SidebarLink from "@/components/SidebarLink";
import { useRouter } from "next/navigation";

export function SidebarPage({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const route = useRouter();

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
              <BarLinks />
            </div>
            <div className="mt-3">
              <ModeToggle />
            </div>
          </div>
          <div>
            <div onClick={() => route.push("/profile")}>
              <SidebarLink
                link={{
                  label: session?.user?.name || session?.user?.email || "Login",
                  href: session ? "/" : "/signin",
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
                }}
              />
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="overflow-y-scroll w-full">{children}</div>
    </div>
  );
}
