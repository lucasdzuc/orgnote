import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, ScrollView, Image, Alert, TextInputProps } from 'react-native';
import axios from 'axios';

// IMPORT API SERVER
import api from '../../services/api';

// IMPORT HOOKS
import useFavorites from '../../hooks/useFavorites';
// import useDebouncePromise from '../../utils/useDebouncePromise';
import useDebounceNew from '../../utils/useDebounceNew';

// IMPORT COMPONENTS
import SearchInput from '../../components/SearchInput';

// IMPORT ICONS
import SalvoAzulIcon from '../../assets/icons/salvo_azul.svg';
import SalvoBrancoIcon from '../../assets/icons/salvo_branco.svg';
import EmojiTristeIcon from '../../assets/icons/emoji_triste.svg';

// IMPORT IMAGES
import ImageInfoSearch from '../../assets/images/info-search.svg';

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
  InfoMessageScreen,
  TextInfoMessageScreen,
  TextPlus
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

  // const searchRef = useRef<any>(null);

  const { addOrgFavorites, removeOrgFavorites, favorites } = useFavorites();

  const [organizations, setOrganizations] = useState<Organizations[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  // const debouncedPromise = useDebouncePromise(axios, 300);
  const { debounce } = useDebounceNew();

  // useEffect(() => {
  //   async function loadOrganizations(): Promise<void> {
  //     try {
  //       if(!searchValue){
  //         return;
  //       }
  //       // if(searchValue.length > 0){
  //         const params = {};
  //         if(searchValue){
  //           params.name_like = searchValue;
  //         }
  //         const response = await debouncedPromise({
  //           method: 'get',
  //           baseURL: `https://api.github.com/orgs/${searchValue}`,
  //           params
  //         });
  //         const existOrgFavority = favorites.find(f => f.id === response.data.id);
  //         if(existOrgFavority){
  //           setOrganizations(
  //             [response.data].map((item: Organizations) => ({
  //               ...item,
  //               isFavorite: true,
  //             }))
  //           );
  //           setIsFavorite(true);
  //         } else if (!existOrgFavority) {
  //           setOrganizations(
  //             [response.data].map((item: Organizations) => ({
  //               ...item,
  //               isFavorite: false,
  //             }))
  //           );
  //           setIsFavorite(false);
  //         }
  //       // }
  //     } catch (error) {
  //       // Alert.alert("Ocorreu um erro!", "Não foi possível consultar a organização!");
  //       console.log(error);
  //     }
  //   }
  //   loadOrganizations();
  // }, [searchValue, favorites]);

  async function loadOrganizations(org: string): Promise<void> {
    try {
      if(!searchValue){
        return;
      }
      if(searchValue.length > 0){

        const response = await api.get(`${org}`);

        const existOrgFavority = favorites.find(f => f.id === response.data.id);

        setOrganizations(
          [response.data].map((item: Organizations) => ({
            ...item,
            isFavorite: existOrgFavority ? true : false,
          }))
        );
        
        setIsFavorite(existOrgFavority ? true : false);
        
      }
    } catch (error) {
      setOrganizations([]);
      console.log(error);
      // Alert.alert("Ocorreu um erro!", "Não foi possível consultar a organização!");
      // eslint-disable-next-line no-console
    }
  }

  function handleChange(value: string) {
    setSearchValue(value);
    debounce(function () {
      loadOrganizations(value);
    }, 300)
  };

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

  const handleClearInput = () => {
    setSearchValue('');
    setOrganizations([]);
  }

  return (
    <Container>

      <ContentInputSearch>
        <SearchInput
          value={searchValue}
          onChangeText={(text) => handleChange(text)}
          placeholder="Procurar organizações..."
          handleClearInput={handleClearInput}
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
            <>
              {searchValue.length > 0 && organizations.length === 0 && (
                <MessageOrgNameNotExist>
                  <EmojiTristeIcon width={20} height={20} />
                  <TextMessageOrgNameNotExist>Não encontramos organizações com este nome!</TextMessageOrgNameNotExist>
                </MessageOrgNameNotExist>
              )}
              {searchValue.length === 0 && organizations.length === 0 && (
                <InfoMessageScreen>
                  <ImageInfoSearch width={200} height={200} />
                  <TextInfoMessageScreen>
                    Pesquise por organizações no <TextPlus>GitHub</TextPlus>{'\n'}
                    e salve nos seus favoritos!
                  </TextInfoMessageScreen>
                </InfoMessageScreen>
              )}
            </>
          )}
        </OrgContainer>
      </ScrollView>

    </Container>
  );
}

export default Search;