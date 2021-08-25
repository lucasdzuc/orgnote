import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, TextInput, Image, Linking } from 'react-native';

// IMPORT HOOK OF BAG
import useFavorites from '../../hooks/useFavorites';

// IMPORT COMPONENTS
import SearchFavorites from '../../components/SearchFavorites';

// IMPORT ICONS
import SalvoBrancoIcon from '../../assets/icons/salvo_branco.svg';
import SalvoAzulIcon from '../../assets/icons/salvo_azul.svg';
import SalvoCinzaIcon from '../../assets/icons/salvo_cinza.svg';
import EmojiTristeIcon from '../../assets/icons/emoji_triste.svg';

import {
  Container,
  HeaderContainer,
  ProductList,
  HeaderContainerList,
  Info,
  TextInfo,
  OrgContainer,
  Org,
  OrgInternContainer,
  OrgAvatarContainer,
  OrgAvatarImage,
  OrgContent,
  OrgTitle,
  OrgDescription,
  AreaButtons,
  ButtonAcessLink,
  TextButtonAcessLink,
  ButtonSavedFavorityOrg,
  TextButtonSavedFavorityOrg,
  ButtonSaveFavorityOrg,
  TextButtonSaveFavorityOrg,
  MessageNotFoundOrg,
  TextMessageNotFoundOrg,
} from './styles';

interface OrganizationsFavorites {
  id: number;
  name?: string;
  description?: string;
  avatar_url?: string;
  html_url?: string;
}

const Favorites: React.FC = () => {

  const { favorites, addOrgFavorites, removeOrgFavorites } = useFavorites();

  const [searchFavority, setSearchFavority] = useState('');

  const openOrganization = useCallback((url: string) => {
    Linking.openURL(url);
  }, []);

  const filterFavorites = useMemo(() => {
    // const lowerSearch = searchFavority?.toLowerCase(searchFavority);
    return favorites.filter(({ name }) => name?.includes(searchFavority));
  }, [searchFavority, favorites]);

  const toggleFavorite = useCallback((org) => {
    const favorityExists = favorites.find(p => p.id === org.id);
    if (favorityExists) {
      removeOrgFavorites(org.id);
    } else {
      addOrgFavorites([org]);
    }
  }, [favorites]);

  return (
    <Container>

      {favorites.length > 0 ? (
        <ProductList
          data={filterFavorites}
          keyExtractor={(item: OrganizationsFavorites) => String(item.id)}
          contentContainerStyle={{
            paddingVertical: 8,
            paddingHorizontal: 16,
          }}
          ListFooterComponent={<View />}
          ListFooterComponentStyle={{
            height: 80,
          }}
          ListHeaderComponent={
            <HeaderContainerList>
              <SearchFavorites
                value={searchFavority}
                onChangeText={setSearchFavority}
                placeholder="Procurar suas organizações salvas..."
              />
            </HeaderContainerList>
          }
          renderItem={({ item }) => (
            filterFavorites.length !== null ? (
              <Org>
                <OrgInternContainer>
                  <OrgAvatarContainer>
                    <OrgAvatarImage source={{ uri: item.avatar_url }} />
                  </OrgAvatarContainer>

                  <OrgContent>
                    <OrgTitle>{item.name}</OrgTitle>
                    <OrgDescription>{item.description}</OrgDescription>
                  </OrgContent>
                </OrgInternContainer>

                <AreaButtons>
                  <ButtonAcessLink onPress={() => openOrganization(item.html_url)} testID={`item-${item.id}`} activeOpacity={0.6}>
                    <TextButtonAcessLink>Acessar</TextButtonAcessLink>
                  </ButtonAcessLink>

                  <ButtonSavedFavorityOrg onPress={() => toggleFavorite(item)} testID={`item-${item.id}`} activeOpacity={0.6}>
                    <SalvoBrancoIcon width={20} height={20} />
                    <TextButtonSavedFavorityOrg>Salvo</TextButtonSavedFavorityOrg>
                  </ButtonSavedFavorityOrg>
                </AreaButtons>
              </Org>
            ) : (
              <MessageNotFoundOrg>
                <EmojiTristeIcon width={20} height={20} />
                <TextMessageNotFoundOrg>Oops! Não encontramos organizações{'\n'}com este nome.</TextMessageNotFoundOrg>
              </MessageNotFoundOrg>
            )
          )}
        />
      ) : (
        <Info>
          <TextInfo>
            Sua lista de organizações está vazia. Clique no {'\n'}
            ícone <SalvoCinzaIcon width={18} height={18} /> na página de pesquisa para salvar uma organização
          </TextInfo>
        </Info>
      )}
    </Container>
  );
}

export default Favorites;