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
  const slug = formData.get('slug') as string;
  const session = await getServerSession(authConfig);

  if (!session?.user?.email) {
    throw new Error('Unauthorized');
  }

  try {
    const post = await prisma.post.findUnique({ where: { slug } });
    if (!post) throw new Error('Post not found');

    const existingLike = await prisma.like.findFirst({
      where: {
        postId: post.id,
        author: { email: session.user.email }
      }
    });

    if (existingLike) {
      await prisma.like.delete({ where: { id: existingLike.id } });
    } else {
      await prisma.like.create({
        data: {
          postId: post.id,
          authorId: (await prisma.user.findUnique({ 
            where: { email: session.user.email } 
          }))!.id
        }
      });
    }

    revalidatePath(`/post/${slug}`);
  } catch (error) {
    console.error('Like action failed:', error);
    throw error;
  }
};

// COUNT LIKES
export const getLikes = async (slug: string) => {
  const session = await getServerSession(authConfig);

  try {
    const post = await prisma.post.findUnique({
      where: { slug },
      select: { id: true }
    });
    if (!post) return { count: 0, userHasLiked: false };

    const [count, userLike] = await Promise.all([
      prisma.like.count({ where: { postId: post.id } }),
      session?.user?.email 
        ? prisma.like.findFirst({
            where: {
              postId: post.id,
              author: { email: session.user.email }
            }
          })
        : null
    ]);

    return { 
      count,
      userHasLiked: !!userLike 
    };
  } catch (error) {
    console.error('Failed to fetch likes:', error);
    return { count: 0, userHasLiked: false };
  }
};