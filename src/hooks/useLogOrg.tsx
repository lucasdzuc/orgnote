import { useContext } from 'react';

// import FavoritesContext from '../contexts/favorites';
import LogOrgFavorites from '../contexts/orglog';

interface Favority {
  id: number;
  name?: string;
  html_url?: string;
  addedIn?: string;
  idLog?: number;
}

interface LogOrgContext {
  logOrg: Favority[];
  loading: boolean;
  addOrgLog(item: Favority): void;
  clearOrgLog(): void;
}

function useLogOrg(): LogOrgContext {

    const context = useContext(LogOrgFavorites);
  
    if (!context) {
      throw new Error('useLogOrg must be used within a LogProvider');
    }
  
    return context;
  }
  
export default useLogOrg;