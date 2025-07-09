import { useLike } from "@/contexts/LikeContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { Pressable } from "react-native";

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

  const handlePress = () => {
    if (liked) {
      onRemoveFavorite();
    } else {
      onSaveFavorite();
    }
  };

  return (
    <Pressable onPress={handlePress}>
      <FontAwesome size={28} name={liked ? "heart" : "heart-o"} color="red" />
    </Pressable>
  );
}
