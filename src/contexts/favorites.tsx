import React, { createContext, useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Favority {
  id: number;
  name: string;
  description?: string;
  avatar_url?: string;
  html_url?: string;
  isFavorite?: boolean;
}

interface FavotityContext {
  favorites: Favority[];
  loading: boolean;
  addOrgFavorites(item: Favority[]): void;
  removeOrgFavorites(id: string): void;
  clearFavorites(): void;
}

const FavoritesContext = createContext<FavotityContext | null>({} as FavotityContext);

export const FavoritesProvider: React.FC = ({ children }) => {

  const [favorites, setFavorites] = useState<Favority[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadFavorites(): Promise<void> {
    try {
      setLoading(true);
      const storagedFavorites = await AsyncStorage.getItem('@OrgNote:favorites');
  
      if (storagedFavorites) {
        setFavorites(JSON.parse(storagedFavorites));
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadFavorites();
  }, []);

  const addOrgFavorites = useCallback(async (favority) => {
    try {
      const existFavority = favorites.map(p => p);
      // console.log(existFavority);
      if(existFavority.length === 0){
        // console.log("Teste");
        setFavorites([ ...favorites, ...favority]);
        await AsyncStorage.setItem('@OrgNote:favorites', JSON.stringify(favorites));
      } else {
        // console.log("False");
        setFavorites([...favorites, ...favority ]);
        await AsyncStorage.setItem('@OrgNote:favorites', JSON.stringify(favorites));
      }

    } catch (error) {
      console.log(error);
    }
  }, [favorites] );

  const removeOrgFavorites = useCallback(async (favority) => {

    const index = favorites.indexOf(favority);

    if(index > -1){
      favorites.splice(index, 1);
    }

    const filterListFavorites = favorites.filter(f => f.id !== favority);
    
    setFavorites(filterListFavorites);
    await AsyncStorage.setItem('@OrgNote:favorites', JSON.stringify(filterListFavorites));
  }, [favorites]);

  const clearFavorites = useCallback(async () => {
    await AsyncStorage.removeItem('@OrgNote:favorites');
    setFavorites([]);
  }, []);

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addOrgFavorites,
      removeOrgFavorites,
      clearFavorites,
      loading,
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;
