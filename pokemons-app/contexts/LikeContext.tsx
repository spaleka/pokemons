import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const LIKE_STORAGE_KEY = "likedPokemonIds";

type LikeContextType = {
  likedItems: Record<number, boolean>;
  toggleLike: (id: number) => void;
  isLiked: (id: number) => boolean;
  favPokemon: number[];
  saveFavorite: (pokemon: { id: number }) => void;
  removeFavorite: (pokemonId: number) => void;
  clearFavorite: () => void;
};

const LikeContext = createContext<LikeContextType | undefined>(undefined);

type LikeProviderProps = {
  children: ReactNode;
};

export const LikeProvider = ({ children }: LikeProviderProps) => {
  const [likedItems, setLikedItems] = useState<Record<number, boolean>>({});

  useEffect(() => {
    AsyncStorage.getItem(LIKE_STORAGE_KEY).then((data) => {
      if (data) {
        setLikedItems(JSON.parse(data));
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(LIKE_STORAGE_KEY, JSON.stringify(likedItems));
  }, [likedItems]);

  const toggleLike = useCallback((id: number) => {
    setLikedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const isLiked = useCallback((id: number) => !!likedItems[id], [likedItems]);

  const favPokemon = useMemo(
    () =>
      Object.keys(likedItems)
        .filter((id) => likedItems[Number(id)])
        .map(Number),
    [likedItems]
  );

  const saveFavorite = useCallback(
    (pokemon: { id: number }) => {
      if (!isLiked(pokemon.id)) toggleLike(pokemon.id);
    },
    [isLiked, toggleLike]
  );

  const removeFavorite = useCallback(
    (pokemonId: number) => {
      if (isLiked(pokemonId)) toggleLike(pokemonId);
    },
    [isLiked, toggleLike]
  );

  const clearFavorite = useCallback(() => {
    Object.keys(likedItems).forEach((id) => {
      if (likedItems[Number(id)]) toggleLike(Number(id));
    });
  }, [likedItems, toggleLike]);

  return (
    <LikeContext.Provider
      value={{
        likedItems,
        toggleLike,
        isLiked,
        favPokemon,
        saveFavorite,
        removeFavorite,
        clearFavorite,
      }}
    >
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
