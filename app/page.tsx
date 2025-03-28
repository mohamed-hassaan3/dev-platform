"use client"
import Hero from "@/modules/Hero";
import { useSession } from "next-auth/react";
export default function Home() {
  const { data: session } = useSession();
  if (!session) {
    return null; 
  }
  return (
    <main className="grid lg:grid-cols-2 place-items-center pt-16 pb-8 md:pt-12 md:pb-24 md:p-32 sm:p-8 p-4">
        <Hero />
    </main>
  );
}
