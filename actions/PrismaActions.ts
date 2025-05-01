"use server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { saveFile } from "./uploadFile";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

// CREATE POST
export const createPost = async (formData: FormData): Promise<void> => {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const slug = (formData.get("title") as string)
    .replace(/\s+/g, "-")
    .toLowerCase();
  const session = await getServerSession(authConfig);

  if (!session || !session.user?.email) {
    throw new Error("You must be signed in to create a post.");
  }
  const userEmail = session.user?.email;
  const file = formData.get("image") as File;

  let imageUrl = "";
  imageUrl = await saveFile(file);

  try {
    await prisma.post.create({
      data: {
        title,
        content,
        slug,
        image: imageUrl,
        author: {
          connect: {
            email: userEmail,
          },
        },
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.log(
          "Unique constraint failed, a new user cannot be created with this email"
        );
      }
    }
  }
  revalidatePath("/feed");
  redirect("/feed");
};

// CREATE COMMENT
export const createComment = async (formData: FormData) => {
  const text = formData.get("text") as string;
  const slug = formData.get("postId") as string;
  const session = await getServerSession(authConfig);
  const userEmail = session?.user?.email as string;

  if (!session || !session.user?.email) {
    throw new Error("You must be signed in to create a comment.");
  }
  try {
    await prisma.comment.create({
      data: {
        text,
        post: {
          connect: {
            slug,
          },
        },
        author: {
          connect: {
            email: userEmail,
          },
        },
      },
    });
  } catch (err) {
    throw new Error(`Error creating comment: ${String(err)}`);
  }

  revalidatePath(`/post/${slug}`);
};

// CREATE LIKE
export const toggleLike = async (formData: FormData) => {
  const postId = formData.get("slug") as string;
  const session = await getServerSession(authConfig);
  const userEmail = session?.user?.email as string;

  if (!session || !userEmail) {
    throw new Error("You must be signed in to like a post.");
  }

  try {
    const user = await prisma.user.findUnique({ where: { email: userEmail } });
    const post = await prisma.post.findUnique({ where: { slug: postId } });

    if (!user || !post) throw new Error("Invalid user or post");

    const existingLike = await prisma.like.findFirst({
      where: { authorId: user.id, postId: post.id },
    });

    if (existingLike) {
      await prisma.like.delete({ where: { id: existingLike.id } });
    } else {
      await prisma.like.create({
        data: {
          author: { connect: { id: user.id } },
          post: { connect: { id: post.id } },
        },
      });
    }

    const count = await prisma.like.count({
      where: { postId: post.id },
    });

    const userHasLiked = !existingLike;

    return { count, userHasLiked };
  } catch (err) {
    throw new Error(`Error toggling like: ${String(err)}`);
  }
};

// COUNT LIKES
export const getLikes = async (postId: string) => {
  const session = await getServerSession(authConfig);
  const userEmail = session?.user?.email as string | undefined;

  try {
    const count = await prisma.like.count({ where: { postId } });

    let userHasLiked = false;
    if (userEmail) {
      userHasLiked = !!(await prisma.like.findFirst({
        where: { postId, author: { email: userEmail } },
      }));
    }

    return { count, userHasLiked };
  } catch (err) {
    console.error("Error fetching likes:", err);
    return { count: 0, userHasLiked: false };
  }
};
