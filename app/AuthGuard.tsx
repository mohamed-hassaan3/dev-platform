"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin"); 
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>; 
  }

  return (
    <>
      {session && (
        <button
          onClick={() => signOut({ callbackUrl: "/signin" })} 
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Sign Out
        </button>
      )}
      {children}
    </>
  );
}
