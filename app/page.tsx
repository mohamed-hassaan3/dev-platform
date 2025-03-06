import Button from "@/components/ui/buttons/Button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-semibold text-center grid justify-center items-center min-h-screen">
      <h1 className="text-4xl">Hello Prisma Docker and Postgresql </h1>
      <div className="gap-16 flex justify-center items-center">
        <Button size="large" color="primary" className="text-black">
          <Link href={`/profile`}>Profile</Link>
        </Button>
        <Button size="large" color="primary" className="text-black">
          <Link href={`/feed`}>Feed</Link>
        </Button>
      </div>
    </div>
  );
}
