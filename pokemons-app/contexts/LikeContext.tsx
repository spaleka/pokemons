import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type LikeContextType = {
  likedItems: Record<string, boolean>;
  isLiked: (id: number) => boolean;
  toggleLike: (id: number) => void;
};

const LIKE_STORAGE_KEY = "likedItems";

const LikeContext = createContext<LikeContextType | undefined>(undefined);

export const LikeProvider = ({ children }: { children: ReactNode }) => {
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const loadLikes = async () => {
      try {
        const data = await AsyncStorage.getItem(LIKE_STORAGE_KEY);
        if (data) {
          setLikedItems(JSON.parse(data));
        }
      } catch (e) {
        console.error("Failed to load liked items", e);
      }
    };
    loadLikes();
  }, []);

  useEffect(() => {
    const saveLikes = async () => {
      try {
        await AsyncStorage.setItem(
          LIKE_STORAGE_KEY,
          JSON.stringify(likedItems)
        );
      } catch (e) {
        console.error("Failed to save liked items", e);
      }
    };
    saveLikes();
  }, [likedItems]);

  const toggleLike = useCallback((id: number) => {
    setLikedItems((prev) => {
      const key = id.toString();
      const updated = { ...prev, [key]: !prev[key] };
      if (!updated[key]) {
        delete updated[key];
      }
      return updated;
    });
  }, []);

  const isLiked = useCallback(
    (id: number) => {
      return !!likedItems[id.toString()];
    },
    [likedItems]
  );

  return (
    <LikeContext.Provider value={{ likedItems, isLiked, toggleLike }}>
      {children}
    </LikeContext.Provider>
  );
};

export const useLike = () => {
  const context = useContext(LikeContext);
  if (!context) {
    throw new Error("useLike must be used within LikeProvider");
  }
  return context;
};
