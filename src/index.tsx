import 'react-native-gesture-handler';
import React, { useState, useCallback } from 'react';
import { View, StatusBar, ActivityIndicator } from 'react-native';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading'
import usePersistedState from './utils/usePersistedState';

import light from './styles/themes/light';
import dark from './styles/themes/dark';

import Routes from './routes';

import { FavoritesProvider } from './contexts/favorites';

import useFavorites from './hooks/useFavorites';

const AppMobile: React.FC = () => {

  const { loading } = useFavorites();

  // const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', light);
  const [theme, setTheme] = useState(light);

  const toggleTheme = useCallback(() => {
    setTheme(theme.title === 'light' ? dark : light);
  }, [theme.title]);

  const [fontsLoaded] = useFonts({
    'arimoregular': require('./assets/fonts/Arimo-Regular.ttf'),
    'arimomedium': require('./assets/fonts/Arimo-Medium.ttf'),
  });

  if (!fontsLoaded) return (<AppLoading />);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', }}>
        <ActivityIndicator size='large' color="#999591" />
      </View>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <View style={{ flex: 1, backgroundColor: theme.title === 'light' ? "#FAFAFA" : "#000000" }}>
        <FavoritesProvider>
          <StatusBar barStyle={theme.title === 'light' ? "dark-content" : "light-content"} backgroundColor="transparent" translucent />
          <Routes toggleTheme={toggleTheme} />
        </FavoritesProvider>
      </View>
    </ThemeProvider>
  );
};

export default AppMobile;
