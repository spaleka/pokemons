import { useLike } from "@/contexts/LikeContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { GestureResponderEvent, Pressable } from "react-native";

type LikeButtonProps = {
  id: number;
  onSaveFavorite: () => void;
  onRemoveFavorite: () => void;
  stopPropagation?: boolean;
};

export default function LikeButton({
  id,
  onSaveFavorite,
  onRemoveFavorite,
  stopPropagation,
}: LikeButtonProps) {
  const { isLiked } = useLike();
  const liked = isLiked(id);

  const handlePress = (event: GestureResponderEvent) => {
    if (stopPropagation) {
      event.stopPropagation();
    }
    if (liked) {
      onRemoveFavorite();
    } else {
      onSaveFavorite();
    }
  };

  return (
    <Pressable onPress={(event) => handlePress(event)}>
      <FontAwesome size={28} name={liked ? "heart" : "heart-o"} color="red" />
    </Pressable>
  );
}
