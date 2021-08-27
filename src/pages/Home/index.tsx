import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, FlatList, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import axios from 'axios';

// import api from '../../services/api';

import useFavorites from '../../hooks/useFavorites';

import DestaqueIcon from '../../assets/icons/destaque.svg';
import SalvoAzulIcon from '../../assets/icons/salvo_azul.svg';
import SalvoBrancoIcon from '../../assets/icons/salvo_branco.svg';
import SetaDireitaBrancoIcon from '../../assets/icons/seta_direita_branco.svg';

import { 
  Container,
  ContentInputSearch,
  ButtonRedirectPageSearch,
  TextButtonPageSearch,
  HeaderHighlighted,
  TextHeader,
  SubTextHeader,
  OrgContainer,
  Org,
  OrgInternContainer,
  OrgAvatarContainer,
  OrgAvatarImage,
  OrgContent,
  OrgTitle,
  OrgDescription,
  AreaButtons,
  ButtonSaveFavorityOrg,
  TextButtonSaveFavorityOrg,
  FloatingButton,
  ButtonNavigateFavority,
  TextButtonNavigate,
} from './styles';

interface Organizations {
  id: number;
  name: string;
  description: string;
  avatar_url: string;
  html_url: string;
  isFavorite: boolean;
}

const Home: React.FC = () => {

  const { addOrgFavorites, removeOrgFavorites, favorites } = useFavorites();

  const navigation = useNavigation();

  const [organizations, setOrganizations] = useState<Organizations[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    async function loadOrganizations(): Promise<void> {
      try {
        const response = await axios.get(`https://api.github.com/orgs/Microsoft`);
        // console.log(response.data);
        setOrganizations(
          [response.data].map((item) => ({
            ...item,
            isFavorite: false,
          }))
        );
      } catch (error) {
        if(error){
          // console.log(error);
          // Alert.alert("Não foi possível carregar as organização em destaque!");
        }
      }
    }
    loadOrganizations();
  }, []);

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
      addOrgFavorites(
        [org].map((item) => ({
          ...item,
          isFavorite: true
        }))
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
        <DestaqueIcon width={24} height={24} />
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
              <OrgTitle>{org.name}</OrgTitle>
              <OrgDescription>{org.description}</OrgDescription>
            </OrgContent>
          </OrgInternContainer>
          
          <AreaButtons>
            <ButtonSaveFavorityOrg onPress={() => toggleFavorite(org)} testID={`org-${org}`} isFavorite={isFavorite} activeOpacity={0.6}>
              {isFavorite ? <SalvoBrancoIcon width={20} height={20} /> : <SalvoAzulIcon width={20} height={20} /> }
              <TextButtonSaveFavorityOrg isFavorite={isFavorite}>{isFavorite ? 'Salvo' : 'Salvar'}</TextButtonSaveFavorityOrg>
            </ButtonSaveFavorityOrg>
          </AreaButtons>
        </Org>
      ))}
      </OrgContainer>

      <FloatingButton>
        <ButtonNavigateFavority onPress={handleNavigateFavorities} activeOpacity={0.7}>
          <TextButtonNavigate>Ver salvos</TextButtonNavigate>
          <SetaDireitaBrancoIcon width={20} height={20} />
        </ButtonNavigateFavority>
      </FloatingButton>

    </Container>
  );
}

export default Home;