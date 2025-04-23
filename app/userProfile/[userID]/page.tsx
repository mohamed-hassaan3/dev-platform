import { prisma } from "@/lib/prisma";

const page = async ({ params }: { params: { userID: string } }) => {
  const userID = params.userID;
  const user = await prisma.user.findUnique({
    where: {
      id: userID
    },
    include: {
      posts: true, 
      comments: true,
      accounts: true,
      sessions: true,
    },
  });

  console.log("USER ID", userID);
  console.log("USER WITH RELATIONS", user);

  return (
    <div className="text-4xl m-auto">
      {user ? user.name : "Not found"}
    </div>
  );
};

export default page;
