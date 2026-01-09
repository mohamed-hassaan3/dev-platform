import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import Image from "next/image";
import React from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import CommentsField from "@/components/post/CommentsField";
import { CommentForm } from "@/components/post/CommentForm";
import Link from "next/link";
import LikesButton from "@/components/post/LikeButton";
import { getLikes } from "@/actions/PrismaActions";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

const page = async ({ params }: PostPageProps) => {
  const { slug } = await params;
  
  // Decode the slug in case it's URL encoded
  const decodedSlug = decodeURIComponent(slug);
  
  const post = await prisma.post.findUnique({
    where: {
      slug: decodedSlug,
    },
    include: {
      author: true,
    },
  });

  if (!post) {
    // Debug: Log available slugs to help diagnose
    const allPosts = await prisma.post.findMany({
      select: { slug: true, title: true },
      take: 10,
    });
    console.log("Looking for slug:", decodedSlug);
    console.log("Available slugs:", allPosts.map((p: { slug: string; title: string }) => p.slug));
    
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-red-500">Post not found</p>
        <p className="text-sm text-gray-500 mt-2">Slug: {decodedSlug}</p>
      </div>
    );
  }
  
  const initialLikes = await getLikes(decodedSlug);

  dayjs.extend(relativeTime);
  const formattedDate = dayjs(post.createdAt).fromNow();

  return (
    <div className="md:w-[75%] w-[90%] m-auto my-18 flex flex-col gap-8">
      <Image
        src={
          post.image ||
          "https://res.cloudinary.com/dx14mtfkw/image/upload/v1745428783/developer-platform/not-found-post.jpg"
        }
        height={500}
        width={1000}
        alt="post"
        className="w-full h-[500px] object-cover md:object-fill m-auto shadow-lg rounded-lg"
      />
      <h1 className="text-xl font-bold">{post.title}</h1>
      <Link
        href={`/userProfile/${post.authorId}`}
        className="flex flex-row items-center space-x-4"
      >
        <Image
          src={
            post.author.image ||
            "https://res.cloudinary.com/dx14mtfkw/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1741642055/developer-platform/coding_prwarh.png"
          }
          height={40}
          width={40}
          alt="Avatar"
          className="h-10 w-10 rounded-full border-2 object-cover"
        />
        <div className="flex flex-col">
          <p className="font-normal text-base relative">
            {post.author.name || post.author.email}
          </p>
          <p className="text-sm text-gray-400">{formattedDate}</p>
        </div>
      </Link>
      <p className="text-base">{post.content}</p>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-1">
          <LikesButton slug={decodedSlug} initialLikes={initialLikes} />
        </div>
        <CommentForm slug={decodedSlug} />
        <CommentsField slug={decodedSlug} />
      </div>
    </div>
  );
};

export default page;
