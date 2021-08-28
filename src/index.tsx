import 'react-native-gesture-handler';
import React, { useState, useCallback } from 'react';
import { View, StatusBar, ActivityIndicator } from 'react-native';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading'
import usePersistedState from './utils/usePersistedState';

import Routes from './routes';

import { FavoritesProvider } from './contexts/favorites';

import useFavorites from './hooks/useFavorites';

import light from './styles/themes/light';
import dark from './styles/themes/dark';

const AppMobile: React.FC = () => {

  const { loading } = useFavorites();

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
    <View style={{ flex: 1, backgroundColor: theme.title === 'light' ? "#FAFAFA" : "#000000" }}>
      <FavoritesProvider>
        <ThemeProvider theme={theme}>
          <StatusBar barStyle={theme.title === 'light' ? "dark-content" : "light-content"} backgroundColor="transparent" translucent />
          <Routes toggleTheme={toggleTheme} />
        </ThemeProvider>
      </FavoritesProvider>
    </View>
  );
};

export default AppMobile;
