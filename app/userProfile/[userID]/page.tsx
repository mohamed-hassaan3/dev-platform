import { prisma } from "@/lib/prisma";

interface UserProps {
  params: Promise<{userID: string}>
}
const page = async ({ params }:  UserProps ) => {
  const userID = (await params).userID;
  const user = await prisma.user.findUnique({
    where: {
      id: userID,
    },
    include: {
      posts: true,
      comments: true,
      accounts: true,
      sessions: true,
    },
  });

  return (
    <main className="m-auto text-center p-4 space-y-4">
      <section className="space-y-2">
        <h1 className="text-4xl ">{user ? user.name : "Not found"}</h1>
        <p className="text-2xl">{user ? user.email : "Not found"}</p>
      </section>
      <section>
        <p className="text-xl">
          {user ? (
            <span className="font-semibold">POST : {user.posts.length}</span>
          ) : (
            "No post share yet"
          )}
        </p>
        <p className="text-xl">
          {user ? (
            <span className="font-semibold">
              Comment : {user.comments.length}
            </span>
          ) : (
            "No comment share yet"
          )}
        </p>
      </section>
    </main>
  );
};

export default page;
