"use client";
import { useOptimistic, useState } from "react";
import Button from "../ui/buttons/Button";
import { AiFillLike } from "react-icons/ai";
import { toggleLike } from "@/actions/PrismaActions";

const LikeButton = ({
  slug,
  initialLikes,
}: {
  slug: string;
  initialLikes: { count: number; userHasLiked: boolean };
}) => {
  const [likes, setLikes] = useOptimistic(
    initialLikes,
    (state: LikesState) => ({
      count: state.userHasLiked ? state.count - 1 : state.count + 1,
      userHasLiked: !state.userHasLiked,
    })
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async () => {
    setIsLoading(true);
    setLikes(null);
    const formData = new FormData();
    formData.append("slug", slug);
    await toggleLike(formData);
  };

  return (
    <form action={handleLike}>
      <Button
        disabled={isLoading}
        size="meduim"
        color="primary"
        className="flex items-center gap-1 !px-6"
      >
        {likes.userHasLiked ? "❤️" : <AiFillLike />}
        <span>{likes.count}</span>
      </Button>
    </form>
  );
};

export default LikeButton;
