import SignupForm from "@/components/signup-form";
import Button from "@/components/ui/buttons/Button";
import Link from "next/link";
import {
  Sidebar,
  SidebarBody,
  SidebarLink,
  SidebarProvider,
} from "@/components/ui/sidebar";

export default function Home() {
  return (
    <div className="">
      <SignupForm />
      {/* <SidebarProvider>
        <SidebarBody>
          <Sidebar>
            <SidebarLink
              link={{ href: "/profile", label: "Home", icon: <span>🏠</span> }}
            ></SidebarLink>
          </Sidebar>
        </SidebarBody>
      </SidebarProvider> */}

      
      {/* <h1 className="text-4xl">Hello Prisma Docker and Postgresql </h1>
      <div className="gap-16 flex justify-center items-center">
        <Link className="w-full" href={`/profile`}>
          <Button size="large" color="primary" className="text-black w-full">
            Profile
          </Button>
        </Link>
        <Link className="w-full" href={`/feed`}>
          <Button size="large" color="primary" className="text-black w-full">
            Feed
          </Button>
        </Link>
      </div> */}
    </div>
  );
}
