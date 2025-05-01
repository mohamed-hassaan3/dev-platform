"use client";
import { useState } from "react";
import Button from "../ui/buttons/Button";
import { AiFillLike } from "react-icons/ai";
import { toggleLike } from "@/actions/PrismaActions";

const LikesButton = ({ 
  slug, 
  initialLikes 
}: { 
  slug: string;
  initialLikes: { count: number; userHasLiked: boolean };
}) => {
  interface LikesState {
    count: number;
    userHasLiked: boolean;
  }
  const [likes, setLikes] = useState<LikesState>(initialLikes);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async () => {
    setIsLoading(true);

    try {
      setLikes((prev) => ({
        count: prev.userHasLiked ? prev.count - 1 : prev.count + 1,
        userHasLiked: !prev.userHasLiked,
      }));

      const formData = new FormData();
      formData.append("slug", slug);

      await toggleLike(formData);
    } catch (error) {
      setLikes(initialLikes);
      console.error("Failed to update like:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Button
        onClick={handleLike}
        disabled={isLoading}
        size="meduim"
        color="primary"
        className="flex items-center gap-1 !px-6"
      >
         {likes.userHasLiked ? '❤️' : <AiFillLike />}
         <span>{likes.count}</span>
      </Button>
    </>
  );
};

export default LikesButton;
