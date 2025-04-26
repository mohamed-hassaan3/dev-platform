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
