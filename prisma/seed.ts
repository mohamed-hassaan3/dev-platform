import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const initialPost: Prisma.PostCreateInput[] = [
  {
    title: "First Post",
    slug: "first-post",
    content: "I'm a First Post ever on that App",
    comments: {
      connectOrCreate: [
        {
          where: { id: "cm8dct4m60000kmv4ok4rrzhe" },
          create: {
            text: "I'm the first comment on this post",
            author: {
              connectOrCreate: {
                where: { email: "mmhassaan3@gmail.com" },
                create: {
                  avatar:
                    "https://res.cloudinary.com/dx14mtfkw/image/upload/v1741633510/developer-platform/banner_sneuet.webp",
                  email: "mmhassaan3@gmail.com",
                  name: "Mohamed Hassaan",
                  password: "123456",
                },
              },
            },
          },
        },
      ],
    },
    image:
      "https://res.cloudinary.com/dx14mtfkw/image/upload/v1741633510/developer-platform/banner_sneuet.webp",
    author: {
      connectOrCreate: {
        where: { email: "mmhassaan3@gmail.com" },
        create: {
          avatar:
            "https://res.cloudinary.com/dx14mtfkw/image/upload/v1741633510/developer-platform/banner_sneuet.webp",
          email: "mmhassaan3@gmail.com",
          name: "Mohamed Hassaan",
          password: "123456",
        },
      },
    },
  },
];

async function main() {
  for (const post of initialPost) {
    const newPost = await prisma.post.upsert({
      where: { slug: post.slug }, 
      update: {}, 
      create: post,
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
