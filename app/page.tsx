"use client"
import Hero from "@/modules/Hero";
export default function Home() {
 
  return (
    <main className="grid lg:grid-cols-2 place-items-center pt-16 pb-8 md:pt-12 md:pb-24 md:p-32 sm:p-8 p-4">
        <Hero />
    </main>
  );
}
