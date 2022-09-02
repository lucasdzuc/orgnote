import React, { useCallback, useContext } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { ThemeContext } from 'styled-components';

// IMPORT HOOK
import useFavorites from '../hooks/useFavorites';
import useLogOrg from '../hooks/useLogOrg';

// import TabRoutes from './tab.routes';

import Home from '../pages/Home';
import Search from '../pages/Search';
import Favorites from '../pages/Favorites';
import LogOrg from '../pages/LogOrg';
import Settings from '../pages/Settings';
import About from '../pages/About';

// IMPORT COMPONENTS
// import Header from '../components/Header';

const App = createStackNavigator();

interface PropsTheme {
  toggleTheme?(): void;
}

const AppRoutes: React.FC<PropsTheme> = ({ toggleTheme }) => {

  const { title } = useContext(ThemeContext);

  const { clearFavorites, favorites } = useFavorites();
  const { clearOrgLog } = useLogOrg();

  const clearAllFavorites = useCallback(() => {
    Alert.alert(
      "Deseja realmente excluir todas as suas organizações salvas?",
      "Ao excluir suas organizações salvas todos os dados serão removidos da lista.",
      [
        {
          text: "Cancelar",
          onPress: () => { }, // console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK", onPress: () => {
            try {
              clearFavorites();
            } catch (error) {
              console.log(error);
            }
          }
        }
      ],
      { cancelable: false }
    );
  }, []);

  const clearLog = useCallback(() => {
    Alert.alert(
      "Limpar histórico?",
      "Ao limpar seu histórico não sera possível recupera-lo.",
      [
        {
          text: "Cancelar",
          onPress: () => { }, // console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK", onPress: () => {
            try {
              clearOrgLog();
            } catch (error) {
              console.log(error);
            }
          }
        }
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
          // component={Home}
          component={useCallback(() => (<Home toggleTheme={toggleTheme} />), [toggleTheme])}
          options={{
            headerShown: false,
            // header: () => <Header toggleTheme={toggleTheme} />,
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
                  name="trash"
                  size={20}
                  color={title === 'light' ? "#000" : "#FAFAFA"}
                  style={{ paddingHorizontal: 24 }}
                  onPress={clearAllFavorites}
                />
              )
            ),
            headerShown: true,
            title: 'Suas organizações salvas',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'arimoregular',
              fontSize: 16,
              color: title === 'light' ? '#000' : '#FAFAFA',
            },
            headerStyle: {
              backgroundColor: title === 'light' ? '#FAFAFA' : '#000',
              elevation: 0,
              borderWidth: 0,
              shadowColor: 'transparent',
            },
            // headerRightContainerStyle: {
            //   marginRight: 24,
            // },
          })}
        />

        <App.Screen
          name="Settings"
          component={Settings}
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
            // headerRight: () => (
            //   <Icon
            //     name="trash"
            //     size={20}
            //     color={title === 'light' ? '#000' : '#FAFAFA'}
            //     style={{ paddingHorizontal: 24 }}
            //     // onPress={clearLog}
            //   />
            // ),
            headerShown: true,
            title: 'Configurações',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'arimoregular',
              fontSize: 16,
              color: title === 'light' ? '#000' : '#FAFAFA',
            },
            headerStyle: {
              backgroundColor: title === 'light' ? '#FAFAFA' : '#000',
              elevation: 0,
              borderWidth: 0,
              shadowColor: 'transparent',
            },
            // headerRightContainerStyle: {
            //   marginRight: 24,
            // },
          })}
        />

        <App.Screen
          name="LogOrg"
          component={LogOrg}
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
              <Icon
                name="trash"
                size={20}
                color={title === 'light' ? '#000' : '#FAFAFA'}
                style={{ paddingHorizontal: 24 }}
                onPress={clearLog}
              />
            ),
            headerShown: true,
            title: 'Seu histórico',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'arimoregular',
              fontSize: 16,
              color: title === 'light' ? '#000' : '#FAFAFA',
            },
            headerStyle: {
              backgroundColor: title === 'light' ? '#FAFAFA' : '#000',
              elevation: 0,
              borderWidth: 0,
              shadowColor: 'transparent',
            },
            // headerRightContainerStyle: {
            //   marginRight: 24,
            // },
          })}
        />

        <App.Screen
          name="About"
          component={About}
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
            // headerRight: () => (
            //   <Icon
            //     name="trash"
            //     size={20}
            //     color={title === 'light' ? '#000' : '#FAFAFA'}
            //     style={{ paddingHorizontal: 24 }}
            //     onPress={clearLog}
            //   />
            // ),
            headerShown: true,
            title: 'Sobre',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'arimoregular',
              fontSize: 16,
              color: title === 'light' ? '#000' : '#FAFAFA',
            },
            headerStyle: {
              backgroundColor: title === 'light' ? '#FAFAFA' : '#000',
              elevation: 0,
              borderWidth: 0,
              shadowColor: 'transparent',
            }
          })}
        />

      </App.Navigator>
    </NavigationContainer>
  );
}

export default AppRoutes;
