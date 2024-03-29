import React, { useState, useEffect, useCallback, useRef, useContext } from 'react';
// import { View, Text, FlatList, Image, Alert } from 'react-native';
import { ThemeContext } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Feather';

// import api from '../../services/api';

// IMPORT HOOKS
import useFavorites from '../../hooks/useFavorites';
import useLogOrg from '../../hooks/useLogOrg';
import useTheme from '../../hooks/useTheme';

import { 
  Container,
  ContentInputSearch,
  ButtonRedirectPageSearch,
  TextButtonPageSearch,
  HeaderHighlighted,
  IconDestaque,
  TextHeader,
  SubTextHeader,
  OrgContainer,
  Org,
  OrgInternContainer,
  OrgAvatarContainer,
  OrgAvatarImage,
  OrgContent,
  OrgName,
  OrgDescription,
  AreaButtons,
  ButtonSaveFavorityOrg,
  IconSalvoBranco,
  IconSalvoAzul,
  TextButtonSaveFavorityOrg,
  FloatingButton,
  ButtonTheme,
  ButtonLog,
  TextButtonLog,
  ButtonNavigateFavority,
  TextButtonNavigate,
  IconSetaDireitaBranco,
} from './styles';

interface Organizations {
  id: number;
  name?: string;
  description?: string;
  avatar_url?: string;
  html_url?: string;
  isFavorite?: boolean;
  addedIn?: any;
}

interface PropsTheme {
  toggleTheme?(): void;
}

const Home: React.FC<PropsTheme> = () => {

  const { title } = useContext(ThemeContext);
  const { toggleTheme } = useTheme();

  const { addOrgFavorites, removeOrgFavorites, favorites } = useFavorites();
  const { addOrgLog } = useLogOrg();

  const navigation = useNavigation();

  const [organizations, setOrganizations] = useState<Organizations[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    async function loadOrganizations(): Promise<void> {
      try {
        const response = await axios.get(`https://api.github.com/orgs/Microsoft`);
        // const response = await axios.get(`https://api.github.com/organizations`);
        const equalsOrg = favorites.find(org => org.id === response.data.id);
        // const dateNow = new Date();

        setOrganizations(
          [response.data].map((item) => ({
            ...item,
            name: item.login,
            isFavorite: equalsOrg ? true : false,
            // addedIn: dateNow.toLocaleString(),
          }))
        );
        setIsFavorite(equalsOrg ? true : false);
      } catch (error) {
        if(error){
          setOrganizations([]);
          console.log(error);
          // Alert.alert("Não foi possível carregar as organização em destaque!");
        }
      }
    }
    loadOrganizations();
  }, [favorites]);

  const handleNavigateSearch = useCallback(() => {
    navigation.navigate('Search');
  }, []);

  const handleNavigateLog = useCallback(() => {
    navigation.navigate('LogOrg');
  }, []);

  const handleNavigateSettings = useCallback(() => {
    navigation.navigate('Settings');
  }, []);
  
  const handleNavigateFavorities = useCallback(() => {
    navigation.navigate('Favorites');
  }, []);

  function toLocal(date: Date) {
    var local = new Date(date);
    // local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON();
  };

  const toggleFavorite = useCallback((org) => {
    const favorityExists = favorites.find(p => p.id === org.id);
    const dateNow = new Date();
    // const beforeDateNow = dateNow.toLocaleString();

    if (favorityExists) {
      removeOrgFavorites(org.id);
    } else {
      addOrgFavorites({
        ...org,
        isFavorite: true,
        addedIn: toLocal(dateNow),
      });
      addOrgLog({
        ...org,
        isFavorite: true,
        addedIn: toLocal(dateNow),
      });
    }
    setIsFavorite(!isFavorite);
  }, [isFavorite, favorites]);

  return (
    <Container>

      <ContentInputSearch>
        <ButtonRedirectPageSearch onPress={handleNavigateSearch} activeOpacity={1} >
          <TextButtonPageSearch>Procurar organizações...</TextButtonPageSearch>
          <Icon name="search" size={22} color="#969696" />
        </ButtonRedirectPageSearch>
      </ContentInputSearch>

      <HeaderHighlighted>
        <IconDestaque />
        <TextHeader>Organizações em destaque</TextHeader>
        <SubTextHeader>Veja as organizações em têndencia no GitHub.</SubTextHeader>
      </HeaderHighlighted>

      <OrgContainer>
      {organizations.map(org => (
        <Org key={org.id} >
          <OrgInternContainer>
            <OrgAvatarContainer>
              <OrgAvatarImage source={{ uri: org.avatar_url }}/>
            </OrgAvatarContainer>

            <OrgContent>
              <OrgName>{org.name}</OrgName>
              <OrgDescription>{org.description}</OrgDescription>
            </OrgContent>
          </OrgInternContainer>
          
          <AreaButtons>
            <ButtonSaveFavorityOrg onPress={() => toggleFavorite(org)} testID={`org-${org}`} isFavorite={isFavorite} activeOpacity={0.6}>
              {isFavorite ? <IconSalvoBranco /> : <IconSalvoAzul /> }
              <TextButtonSaveFavorityOrg isFavorite={isFavorite}>{isFavorite ? 'Salvo' : 'Salvar'}</TextButtonSaveFavorityOrg>
            </ButtonSaveFavorityOrg>
          </AreaButtons>
        </Org>
      ))}
      </OrgContainer>

      <FloatingButton>
        <ButtonTheme onPress={toggleTheme} activeOpacity={0.7}>
          <Icon name={title === 'light' ? 'moon' : 'sun'} size={24} color={title === 'light' ? "#000" : "#2196f3"} />
        </ButtonTheme>

        <ButtonLog onPress={handleNavigateSettings} activeOpacity={0.8}>
          <Icon name="settings" size={22} color={title === 'light' ? "#222" : "#FAFAFA" } />
        </ButtonLog>

        <ButtonNavigateFavority onPress={handleNavigateFavorities} activeOpacity={0.7}>
          <TextButtonNavigate>Ver salvos</TextButtonNavigate>
          <IconSetaDireitaBranco />
        </ButtonNavigateFavority>
      </FloatingButton>

    </Container>
  );
}

export default Home;