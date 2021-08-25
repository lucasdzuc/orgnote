import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';

// IMPORT API SERVER
import api from '../../services/api';

// IMPORT HOOKS
import useFavorites from '../../hooks/useFavorites';

// IMPORT COMPONENTS
import SearchInput from '../../components/SearchInput';

// IMPORT ICONS
import SalvoAzulIcon from '../../assets/icons/salvo_azul.svg';

import {
  Container,
  ContentInputSearch,
  ContentInput,
  ButtonGoBack,
  TextInput,
  ButtonSearch,
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
} from './styles';

interface Organizations {
  id: number;
  name: string;
  description?: string;
  avatar_url?: string;
  html_url?: string;
}

const Search: React.FC = () => {

  const { addOrgFavorites, removeOrgFavorites, favorites } = useFavorites();

  // const { goBack } = useNavigation();

  const [organizations, setOrganizations] = useState<Organizations[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    async function loadOrganizations(): Promise<void> {
      try {
        if(!searchValue){
          return;
        }
        if(searchValue.length > 0){
          const response = await api.get(`/${searchValue}`);
          // console.log(response.data);
          setOrganizations([response.data]);
        }
      } catch (error) {
        console.log(error);
      }
    }
    loadOrganizations();
  }, [searchValue]);

  const toggleFavorite = useCallback((org) => {

    const favorityExists = favorites.find(p => p.id === org.id);
    // console.log(favorityExists);

    if (favorityExists) {
      removeOrgFavorites(org.id);
    } else {
      addOrgFavorites([org]);
    }
    setIsFavorite(!isFavorite);
  }, [isFavorite, favorites]);

  // const favoriteIconName = useMemo(() => (
  //   isFavorite ? 'favorite' : 'favorite-border'
  // ), [isFavorite]);

  return (
    <Container>

      <ContentInputSearch>
        <SearchInput
          value={searchValue}
          onChangeText={setSearchValue}
          placeholder="Procurar organizações..."
        />
      </ContentInputSearch>

      <ScrollView>
        <OrgContainer>
          {organizations.map(org => (
            <Org key={org.id}>
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
                <ButtonSaveFavorityOrg onPress={() => toggleFavorite(org)} testID={`org-${org}`} activeOpacity={0.6}>
                  <SalvoAzulIcon width={20} height={20} />
                  <TextButtonSaveFavorityOrg>Salvar</TextButtonSaveFavorityOrg>
                </ButtonSaveFavorityOrg>
              </AreaButtons>
            </Org>
          ))}
        </OrgContainer>
      </ScrollView>

    </Container>
  );
}

export default Search;