import { useContext } from 'react';

import FavoritesContext from '../contexts/favorites';

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

function useFavorites(): FavotityContext {

    const context = useContext(FavoritesContext);
  
    if (!context) {
      throw new Error('useFavorites must be used within a FavoritesProvider');
    }
  
    return context;
  }
  
export default useFavorites;