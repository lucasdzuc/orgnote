import React, { useState, useEffect, useCallback, useRef, useContext } from 'react';
import { View, Text, FlatList, Image, Alert } from 'react-native';
import { ThemeContext } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Feather';

// import api from '../../services/api';

import useFavorites from '../../hooks/useFavorites';

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
}

interface PropsTheme {
  toggleTheme(): void;
}

const Home: React.FC<PropsTheme> = ({ toggleTheme }) => {

  const { colors, title } = useContext(ThemeContext);

  const { addOrgFavorites, removeOrgFavorites, favorites } = useFavorites();

  const navigation = useNavigation();

  const [organizations, setOrganizations] = useState<Organizations[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    async function loadOrganizations(): Promise<void> {
      try {
        const response = await axios.get(`https://api.github.com/orgs/Microsoft`);
        // const response = await axios.get(`https://api.github.com/organizations`);
        // console.log(response.data);
        const equalsOrg = favorites.find(org => org.id === response.data.id);

        setOrganizations(
          [response.data].map((item) => ({
            ...item,
            name: item.login,
            isFavorite: equalsOrg ? true : false,
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

  const handleNavigateFavorities = useCallback(() => {
    navigation.navigate('Favorites');
  }, []);

  const toggleFavorite = useCallback((org) => {
    const favorityExists = favorites.find(p => p.id === org.id);
    if (favorityExists) {
      removeOrgFavorites(org.id);
    } else {
      addOrgFavorites({
        ...org,
        isFavorite: true
      }
        // [org].map((item) => ({
        //   ...item,
        //   isFavorite: true
        // }))
      );
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
          <Icon name={title === 'light' ? 'moon' : 'sun'} size={24} color={title === 'light' ? "#000" : "#2196f3" } />
        </ButtonTheme>

        <ButtonNavigateFavority onPress={handleNavigateFavorities} activeOpacity={0.7}>
          <TextButtonNavigate>Ver salvos</TextButtonNavigate>
          <IconSetaDireitaBranco />
        </ButtonNavigateFavority>
      </FloatingButton>

    </Container>
  );
}

export default Home;