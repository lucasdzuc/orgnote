import React, { useCallback, useContext } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { ThemeContext } from 'styled-components';

// IMPORT HOOK
import useFavorites from '../hooks/useFavorites';

// import TabRoutes from './tab.routes';

import Home from '../pages/Home';
import Search from '../pages/Search';
import Favorites from '../pages/Favorites';

// IMPORT COMPONENTS
import Header from '../components/Header';

const App = createStackNavigator();

interface PropsTheme {
  toggleTheme(): void;
}

const AppRoutes: React.FC<PropsTheme> = ({ toggleTheme }) => {

  const { title, colors } = useContext(ThemeContext);
  
  const { clearFavorites, favorites } = useFavorites();
  
  const clearAllFavorites = useCallback(() => {
    Alert.alert("Deseja realmente excluir todas as suas organizações salvas?", "",
    [
      {
        text: "Cancelar",
        onPress: () => {}, // console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => {
        try {
            clearFavorites();
          } catch (error) {
            console.log(error);
          }
        }}
      ],
      { cancelable: false }
    );
  }, []);

  return (
    <NavigationContainer>
      <App.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: true,
          cardStyle: { 
            backgroundColor: title === 'light' ? '#FAFAFA' : '#000', 
          },
        }}
      >
        <App.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: true,
            header: () => <Header toggleTheme={toggleTheme} />,
          }}
        />

        <App.Screen
          name="Search"
          component={Search}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />

        <App.Screen
          name="Favorites"
          component={Favorites}
          options={({ navigation }) => ({
            headerLeft: () => (
              <Icon
                name="arrow-left"
                size={24}
                color={title === 'light' ? '#000' : '#FAFAFA'}
                onPress={() => navigation.goBack()}
                style={{ paddingHorizontal: 24 }}
              />
            ),
            headerRight: () => (
              favorites.length > 0 && (
                <Icon 
                  name="x-circle" 
                  size={22} 
                  color="#2196f3" 
                  style={{ paddingHorizontal: 24 }}
                  onPress={clearAllFavorites}
                />
              )
            ),
            // headerRightContainerStyle: {
            //   marginRight: 24,
            // },
            title: 'Suas organizações salvas',
            headerTitleStyle: {
              fontFamily: 'arimoregular',
              fontSize: 16,
              color: title === 'light' ? '#000' : '#FAFAFA' ,
            },
            headerStyle: {
              backgroundColor: title === 'light' ? '#FAFAFA' : '#000',
              elevation: 0,
              borderWidth: 0,
              shadowColor: 'transparent',
            },
          })}
        />

      </App.Navigator>
    </NavigationContainer>
  );
}

export default AppRoutes;
