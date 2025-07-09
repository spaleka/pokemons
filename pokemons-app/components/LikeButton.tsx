import { useLike } from "@/contexts/LikeContext";
import React from "react";
import { Pressable, Text } from "react-native";

type LikeButtonProps = {
  id: number;
  onSaveFavorite: () => void;
  onRemoveFavorite: () => void;
};

export default function LikeButton({
  id,
  onSaveFavorite,
  onRemoveFavorite,
}: LikeButtonProps) {
  const { isLiked } = useLike();
  const liked = isLiked(id);
  const like = liked ? "❤️" : "💔";

  const handlePress = () => {
    if (liked) {
      onRemoveFavorite();
    } else {
      onSaveFavorite();
    }
  };

  return (
    <Pressable onPress={handlePress}>
      <Text style={{ fontSize: 22 }}>{like}</Text>
    </Pressable>
  );
}
