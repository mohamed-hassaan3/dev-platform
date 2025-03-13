import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const initialPost: Prisma.PostCreateInput[] = [
  {
    title: "First Post",
    slug: "first-post",
    content: "I'm a First Post ever on that App",
    image:
      "https://collection.cloudinary.com/dx14mtfkw/f7bd6eee92f597b6d0e31a7d3dd27b3c",
    author: {
      connectOrCreate: {
        where: { email: "mmhassaan3@gmail.com" },
        create: {
          email: "mmhassaan3@gmail.com",
          password: "123456",
        },
      },
    },
  },
];
async function main() {
  for (const post of initialPost) {
    const newPost = await prisma.post.create({
      data: post,
    });
    console.log(`Created Post with ID: ${newPost.id}`);
  }
  console.log("Seeding Finish");
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
