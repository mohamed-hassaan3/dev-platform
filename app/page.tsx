import Link from "next/link";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import Button from "@/components/ui/buttons/Button";
export default function Home() {
  return (
    <main className="grid lg:grid-cols-2 place-items-center pt-16 pb-8 md:pt-12 md:pb-24 md:p-32 sm:p-8 p-4">
      <div className="py-6 md:order-1 hidden md:block">
        <Image
          src={
            "https://res.cloudinary.com/dx14mtfkw/image/upload/v1742500127/developer-platform/hero_d8vsct.png"
          }
          alt="logo"
          width={600}
          height={200}
          sizes="(max-width: 800px) 100vw, 620px"
          loading="eager"
        />
      </div>
      <div>
        <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold lg:tracking-tight xl:tracking-tighter">
        Welcome to DevPlatform
        </h1>
        <p className="text-lg mt-4 text-slate-600 max-w-xl">
        Your all-in-one platform to share ideas, connect with developers, and grow your community.
          <wbr /> Track likes, comments, and engagement effortlessly. You can quickly create
          any post with this starter.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-6">
          <Link
            href="/signup"
            className="flex gap-1 items-center justify-center"
            rel="noopener"
          >
            <Button>Get Started</Button>
          </Link>
          <Link
            rel="noopener"
            href="https://github.com/mohamed-hassaan3/dev-platform"
            className="flex gap-1 items-center justify-center"
            target="_blank"
          >
            <FaGithub />
            Github Repo
          </Link>
        </div>
      </div>
    </main>
  );
}
