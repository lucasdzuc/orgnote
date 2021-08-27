import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, ScrollView, Image, Alert } from 'react-native';

// IMPORT API SERVER
import api from '../../services/api';

// IMPORT HOOKS
import useFavorites from '../../hooks/useFavorites';

// IMPORT COMPONENTS
import SearchInput from '../../components/SearchInput';

// IMPORT ICONS
import SalvoAzulIcon from '../../assets/icons/salvo_azul.svg';
import SalvoBrancoIcon from '../../assets/icons/salvo_branco.svg';
import EmojiTristeIcon from '../../assets/icons/emoji_triste.svg';

// IMPORT STYLES OF SCREEN
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
  MessageOrgNameNotExist,
  TextMessageOrgNameNotExist,
} from './styles';

interface Organizations {
  id: number;
  name: string;
  description?: string;
  avatar_url?: string;
  html_url?: string;
  isFavorite?: boolean;
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
          // const params = {};
          // if(searchValue){
          //   params.name_like = searchValue;
          // }
          const response = await api.get(`${searchValue}`);
          // console.log(response.data);
          // setOrganizations([response.data]);
          const existOrgFavority = await favorites.find(f => f.id === response.data.id );

          if(existOrgFavority){
            setOrganizations(
              [response.data].map((item: Organizations) => ({
                ...item,
                isFavorite: true,
              }))
            );
            setIsFavorite(true);
          } else if (!existOrgFavority) {
            setOrganizations(
              [response.data].map((item: Organizations) => ({
                ...item,
                isFavorite: false,
              }))
            );
            setIsFavorite(false);
          }

        }
      } catch (error) {
        // Alert.alert("Ocorreu um erro!", "Não foi possível consultar a organização!");
        console.log(error);
      }
    }
    loadOrganizations();
  }, [searchValue, favorites]);

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
        <SearchInput
          value={searchValue}
          onChangeText={setSearchValue}
          placeholder="Procurar organizações..."
        />
      </ContentInputSearch>

      <ScrollView>
        <OrgContainer>
          {organizations.length > 0 ? (
            organizations.map(org => (
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
                  <ButtonSaveFavorityOrg onPress={() => toggleFavorite(org)} testID={`org-${org}`} isFavorite={isFavorite} activeOpacity={0.6}>
                    {isFavorite ? <SalvoBrancoIcon width={20} height={20} /> : <SalvoAzulIcon width={20} height={20} /> }
                    <TextButtonSaveFavorityOrg isFavorite={isFavorite}>{isFavorite ? 'Salvo' : 'Salvar'}</TextButtonSaveFavorityOrg>
                  </ButtonSaveFavorityOrg>
                </AreaButtons>
              </Org>
            ))
          ) : (
            searchValue.length > 0 && organizations.length === 0 && (
              <MessageOrgNameNotExist>
                <EmojiTristeIcon width={20} height={20} />
                <TextMessageOrgNameNotExist>Não encontramos organizações com este nome!</TextMessageOrgNameNotExist>
              </MessageOrgNameNotExist>
            ) 
          )}
        </OrgContainer>
      </ScrollView>

    </Container>
  );
}

export default Search;