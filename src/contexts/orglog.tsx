import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const LogOrgFavorites = createContext<LogOrgContext | null>({} as LogOrgContext);

export const LogOrgProvider: React.FC = ({ children }) => {

  const [logOrg, setLogOrg] = useState<Favority[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadLogOrganizations(): Promise<void> {
    try {
      setLoading(true);
      const storagedLogOrg = await AsyncStorage.getItem('@OrgNote:log');
      // console.log(JSON.parse(storagedLogOrg));

      if (storagedLogOrg) {
        setLogOrg(JSON.parse(storagedLogOrg));
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadLogOrganizations();
  }, []);

  const addOrgLog = useCallback( async (favority: Favority) => {
    try {

      const idDate = new Date();
      // console.log(idDate.getTime());
      const newsLogOrg = [...logOrg, {...favority, idLog: idDate.getTime()}];
      setLogOrg(newsLogOrg);
      await AsyncStorage.setItem('@OrgNote:log', JSON.stringify(newsLogOrg));

    } catch (error) {
      console.log(error);
    }
  }, [logOrg]);

  const clearOrgLog = useCallback(async() => {
    await AsyncStorage.removeItem('@OrgNote:log');
    setLogOrg([]);
  }, []);

  const value = useMemo(() => ({ logOrg, addOrgLog, clearOrgLog, loading }),
    [logOrg, addOrgLog, clearOrgLog, loading],
  );

  return (
    <LogOrgFavorites.Provider value={value}>
      {children}
    </LogOrgFavorites.Provider>
  )
}

export default LogOrgFavorites;