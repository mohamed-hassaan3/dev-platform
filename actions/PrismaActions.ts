"use server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { saveFile } from "./uploadFile";

// CREATE POST
export const createPost = async (formData: FormData): Promise<void> => {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const slug = (formData.get("title") as string)
    .replace(/\s+/g, "-")
    .toLowerCase();
  const userEmail = "mmhassaan3@gmail.com";
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
    console.error("Error creating post:", error);
  }

  revalidatePath("/feed");
  redirect("/feed");
};

// CREATE COMMENT
/* export const createComment = async (formData: FormData) => {
  const text = formData.get("text")
  const comment = await prisma.comment.create({
    data:{
      id
    }
  })
} */
