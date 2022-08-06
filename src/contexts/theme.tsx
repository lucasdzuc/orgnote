import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeProvider, DefaultTheme } from "styled-components"

import { dark, light } from '../styles/themes';

interface ThemeContextData {
  theme?: typeof light | typeof dark;
  toggleTheme?(): void;
}

interface IComponentProps {
  children?: React.ReactNode | any;
}

export const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const CustomThemeProvider: React.FC<IComponentProps> = ({ children }) => {

  const [theme, setTheme] = useState<DefaultTheme>(light);

  async function loadTheme(){
    const storagedTheme = await AsyncStorage.getItem('@OrgNote:theme');
    if(!storagedTheme){
      setTheme(light);
      await AsyncStorage.setItem('@OrgNote:theme', JSON.stringify(dark));
    } else {
      setTheme(JSON.parse(storagedTheme));
    }
  }

  useEffect(() => {
    loadTheme();
  }, []);


  const toggleTheme = useCallback(async () => {
    if (theme?.title === 'light') {
      setTheme(dark);
      await AsyncStorage.setItem('@OrgNote:theme', JSON.stringify(dark));
    } else {
      setTheme(light);
      await AsyncStorage.setItem('@OrgNote:theme', JSON.stringify(light));
    }
  }, [theme?.title]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
