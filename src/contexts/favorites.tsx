import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import useLogOrg from '../hooks/useLogOrg';

interface Favority {
  id: number;
  name: string;
  description?: string;
  avatar_url?: string;
  html_url?: string;
  isFavorite?: boolean;
  addedIn?: string;
}

interface FavotityContext {
  favorites: Favority[];
  loading: boolean;
  addOrgFavorites(item: Favority): void;
  removeOrgFavorites(id: string): void;
  clearFavorites(): void;
}

interface PropsLog {
  addOrgLog(item: Favority): void;
}

const FavoritesContext = createContext<FavotityContext | null>({} as FavotityContext);

export const FavoritesProvider: React.FC<PropsLog> = ({ children }) => {

  const { addOrgLog } = useLogOrg();

  const [favorites, setFavorites] = useState<Favority[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadFavorites(): Promise<void> {
    try {
      setLoading(true);
      const storagedFavorites = await AsyncStorage.getItem('@OrgNote:favorites');
      // console.log(JSON.parse(storagedFavorites));

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

  const addOrgFavorites = useCallback(async (favority: Favority) => {
    try {
      
      const newFavorites = [...favorites, {...favority}];

      setFavorites(newFavorites);
      await AsyncStorage.setItem('@OrgNote:favorites', JSON.stringify(newFavorites));

      // addOrgLog(favority);

    } catch (error) {
      console.log(error);
    }
  }, [favorites]);

  const removeOrgFavorites = useCallback(async (favority) => {

    const index = favorites.indexOf(favority);

    if (index > -1) {
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

  const value = useMemo(() => ({ favorites, addOrgFavorites, removeOrgFavorites, clearFavorites, loading }),
    [favorites, addOrgFavorites, removeOrgFavorites, clearFavorites, loading],
  );

  return (
    // <FavoritesContext.Provider value={{
    //   favorites,
    //   addOrgFavorites,
    //   removeOrgFavorites,
    //   clearFavorites,
    //   loading,
    // }}>
    <FavoritesContext.Provider value={value} >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;
