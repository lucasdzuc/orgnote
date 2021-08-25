import 'react-native-gesture-handler';
import React from 'react';
import { View, StatusBar, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading'

import { FavoritesProvider } from './contexts/favorites';

import Routes from './routes';

import useFavorites from './hooks/useFavorites';

const AppMobile: React.FC = () => {

  const { loading } = useFavorites();

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
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fafafa' }}>
      <FavoritesProvider>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
        <Routes />
      </FavoritesProvider>
    </View>
  );
};

export default AppMobile;
