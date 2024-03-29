import 'react-native-gesture-handler';
import React, { useState, useCallback } from 'react';
import { View, StatusBar, ActivityIndicator, LogBox } from 'react-native';
// import { ThemeProvider, DefaultTheme } from 'styled-components';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading'
// import usePersistedState from './utils/usePersistedState';
import { Host } from 'react-native-portalize';

import { CustomThemeProvider } from './contexts/theme';

// import light from './styles/themes/light';
// import dark from './styles/themes/dark';

import Routes from './routes';

import { FavoritesProvider } from './contexts/favorites';
import { LogOrgProvider } from './contexts/orglog';

import useFavorites from './hooks/useFavorites';
import useTheme from './hooks/useTheme';

const AppMobile: React.FC = () => {

  LogBox.ignoreAllLogs();

  const { loading } = useFavorites();
  const { theme } = useTheme();

  // const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', light);
  // const [theme, setTheme] = useState(light);

  // const toggleTheme = useCallback(() => {
  //   setTheme(theme?.title === 'light' ? dark : light);
  // }, [theme?.title]);

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
    <Host>
      <CustomThemeProvider>
      {/* <ThemeProvider theme={theme}> */}
        <View style={{ flex: 1, backgroundColor: theme?.title === 'light' ? "#FAFAFA" : "#000000" }}>
          <FavoritesProvider>
            <LogOrgProvider>
              <StatusBar barStyle={theme?.title === 'light' ? "dark-content" : "light-content"} backgroundColor="transparent" translucent />
              <Routes />
              {/* <Routes toggleTheme={toggleTheme} /> */}
            </LogOrgProvider>
          </FavoritesProvider>
        </View>
      </CustomThemeProvider>
    </Host>
  );
};

export default AppMobile;
