"use client";

import { Button } from "@heroui/button";
import { useState } from "react";

import { HeartIcon } from "../ui/icons";

import { favoriteRecipe, unfavoriteRecipe } from "@/actions/recipe-actions";

interface LikeButtonProps {
  isFav: boolean;
  userId?: string;
  recipeId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ isFav, userId, recipeId }) => {
  const [isFavorite, setIsFavorite] = useState(isFav);

  const handleFavorite = async () => {
    if (!userId) {
      return;
    }

    if (isFavorite) {
      await unfavoriteRecipe(userId, recipeId);
      setIsFavorite(false);
    } else {
      await favoriteRecipe(userId, recipeId);
      setIsFavorite(true);
    }
  };

  if (!userId) {
    return null;
  }

  return (
    <Button
      isIconOnly
      aria-label={isFavorite ? "Unlike" : "Like"}
      className={`transition-transform hover:scale-110 ${
        isFavorite
          ? "bg-red-100 text-red-500 hover:text-white"
          : "bg-white text-gray-400 hover:text-red-500"
      }`}
      color="danger"
      onPress={handleFavorite}
    >
      <HeartIcon fill="currentColor" />
    </Button>
  );
};

export default LikeButton;
