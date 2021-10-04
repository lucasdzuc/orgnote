import React, { useState, useEffect, useCallback, useMemo, useRef, useContext } from 'react';
import { View, Text, TextInput, Image, Linking, Alert, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from 'styled-components';
import IconFeather from 'react-native-vector-icons/Feather';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { Portal } from 'react-native-portalize';
import { Modalize } from 'react-native-modalize';

// IMPORT HOOK OF BAG
import useFavorites from '../../hooks/useFavorites';

// IMPORT COMPONENTS
import SearchFavorites from '../../components/SearchFavorites';
// import Dashboard from '../../components/Dashboard';

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
  OrgName,
  OrgDescription,
  AreaButtons,
  ButtonAcessLink,
  TextButtonAcessLink,
  // ButtonSavedFavorityOrg,
  // TextButtonSavedFavorityOrg,
  ButtonSaveFavorityOrg,
  TextButtonSaveFavorityOrg,
  MessageNotFoundOrg,
  TextMessageNotFoundOrg,
  ContainerModalize,
  HeaderModalize,
  TitleHeaderModalize,
  ContainerButtonCloseModalModilize,
  ButtonCloseModalModalize,
  TextButtonCloseModilize,
  ContentOrdernation,
  ButtonOrdernation,
  ContentIconOrdernation,
  TextButtonOrdernation,
} from './styles';

interface OrganizationsFavorites {
  id: number;
  name: string;
  description?: string;
  avatar_url?: string;
  html_url?: string;
  isFavorite: boolean;
  addedIn?: string;
}

const Favorites: React.FC = () => {

  const { colors, title } = useContext(ThemeContext);

  const modalizeRef = useRef<Modalize>(null);

  // const navigation = useNavigation();

  const { favorites, removeOrgFavorites } = useFavorites();

  const [searchFavority, setSearchFavority] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  const openOrganization = useCallback((url: string) => {
    Linking.openURL(url);
  }, []);

  // FILTER FAVORITES
  const filterFavorites = useMemo(() => {
    const lowerSearch = searchFavority?.toLowerCase(searchFavority);
    return favorites.filter(({ name }) => name?.toLowerCase().includes(lowerSearch));
  }, [searchFavority, favorites]);

  // TOGGLE ADD OR REMOVE FAVORITE
  const toggleFavorite = useCallback((org) => {
    Alert.alert(`${org.name}`, `Deseja realmente excluir a organização da sua lista?`,
      [
        {
          text: "Cancelar",
          onPress: () => { }, // console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "SIM", onPress: () => {
            try {
              removeOrgFavorites(org.id);
            } catch (error) {
              console.log(error);
            }
          }
        }
      ],
      { cancelable: false }
    );
    // const favorityExists = favorites.find(p => p.id === org.id);
    // if (favorityExists) {
    //   removeOrgFavorites(org.id);
    // }
    // else {
    //   addOrgFavorites([org]);
    // }
    // setIsFavorite(!isFavorite);
  }, [isFavorite, favorites]);

  const handleClearInput = () => {
    setSearchFavority(''), filterFavorites;
  };

  const handleOpenModalFilter = () => {
    modalizeRef.current?.open();
  }
  
  const closeModal = () => {
    // setIdPost();
    modalizeRef.current?.close();
  };
  
  // const handleFilterOrgDate = useCallback((value: string) => {
  //   const filterOrg = filterFavorites.filter(({ addedIn }) => addedIn == value);
  // }, [filterFavorites]);

  // const handleNavigateLog = useCallback(() => {
  //   navigation.navigate('LogOrg');
  // }, []);


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
          ListHeaderComponent={
            <HeaderContainerList>
              <SearchFavorites
                value={searchFavority}
                onChangeText={setSearchFavority}
                placeholder="Procurar suas organizações salvas..."
                handleClearInput={handleClearInput}
                handleOpenModalFilter={handleOpenModalFilter}
              />
              {/* {searchFavority.length == 0 && (
                <Dashboard />
              )} */}
              {/* <View style={{ flex: 1 }}>
                <TouchableOpacity 
                  onPress={handleNavigateLog} 
                  style={{ flex: 1, height: 56, backgroundColor: '#C4C4C4', justifyContent: 'center', alignContent: 'center' }} 
                  activeOpacity={0.9}>
                  <Text style={{ textAlign: 'center' }}>Acessar Log's</Text>
                </TouchableOpacity>
              </View> */}
            </HeaderContainerList>
          }
          ListHeaderComponentStyle={{
            paddingHorizontal: 0,
            paddingBottom: 16,
          }}
          ListFooterComponent={
            searchFavority.length > 0 && filterFavorites.length === 0 ? (
              <MessageNotFoundOrg>
                <EmojiTristeIcon width={20} height={20} />
                <TextMessageNotFoundOrg>Oops! Não encontramos organizações{'\n'}com este nome.</TextMessageNotFoundOrg>
              </MessageNotFoundOrg>
            ) : (
              <View />
              )
            }
          ListFooterComponentStyle={{
            height: 80,
          }}
          renderItem={({ item }: any) => (
            filterFavorites.length > 0 && (
              <Org>
                <OrgInternContainer>
                  <OrgAvatarContainer>
                    <OrgAvatarImage source={{ uri: item.avatar_url }} />
                  </OrgAvatarContainer>

                  <OrgContent>
                    <OrgName>{item.name}</OrgName>
                    <OrgDescription>{item.description}</OrgDescription>
                  </OrgContent>
                </OrgInternContainer>

                <AreaButtons>
                  <ButtonAcessLink onPress={() => openOrganization(item.html_url)} testID={`item-${item.id}`} activeOpacity={0.6}>
                    <TextButtonAcessLink>Acessar</TextButtonAcessLink>
                  </ButtonAcessLink>

                  <ButtonSaveFavorityOrg onPress={() => toggleFavorite(item)} testID={`item-${item.id}`} isFavorite={item.isFavorite} activeOpacity={0.6}>
                    {item.isFavorite ? <SalvoBrancoIcon width={20} height={20} /> : <SalvoAzulIcon width={20} height={20} />}
                    <TextButtonSaveFavorityOrg isFavorite={item.isFavorite}>{item.isFavorite ? 'Salvo' : 'Salvar'}</TextButtonSaveFavorityOrg>
                  </ButtonSaveFavorityOrg>
                </AreaButtons>
              </Org>
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

      <Portal>  
        <Modalize
          ref={modalizeRef}
          snapPoint={320}
          modalHeight={320}
          handlePosition="inside"
          modalStyle={{
            backgroundColor: colors.secondary,
          }}
          HeaderComponent={
            <HeaderModalize>
              <TitleHeaderModalize>Ordenar por</TitleHeaderModalize>
            </HeaderModalize>
          }
          FooterComponent={
            <ContainerButtonCloseModalModilize>
              <ButtonCloseModalModalize onPress={closeModal} activeOpacity={0.7} style={{ backgroundColor: colors.buttonCancelModal }} >
                <TextButtonCloseModilize style={{ color: colors.textButtonCancelModal }}>Cancelar</TextButtonCloseModilize>
              </ButtonCloseModalModalize>
            </ContainerButtonCloseModalModilize>
          }
        >
          <ContainerModalize>
            {/* <Text style={{ textAlign: 'center' }}>Ordernar por data</Text> */}
            <ContentOrdernation>

              <ButtonOrdernation onPress={() => {}} activeOpacity={1}>
                <ContentIconOrdernation>
                  <IconAntDesign name="swap" size={32} color="#939393" />
                </ContentIconOrdernation>
                <TextButtonOrdernation>Ordenação{'\n'}padrão</TextButtonOrdernation>
              </ButtonOrdernation>
              
              <ButtonOrdernation onPress={() => {}} activeOpacity={1}>
                <ContentIconOrdernation>
                  <IconAntDesign name="clockcircleo" size={32} color="#939393" />
                </ContentIconOrdernation>
                <TextButtonOrdernation>Hoje</TextButtonOrdernation>
              </ButtonOrdernation>

              <ButtonOrdernation onPress={() => {}} activeOpacity={1}>
                <ContentIconOrdernation>
                  <IconAntDesign name="calendar" size={32} color="#939393" />
                </ContentIconOrdernation>
                <TextButtonOrdernation>Data</TextButtonOrdernation>
              </ButtonOrdernation>

            </ContentOrdernation>

          </ContainerModalize>
        </Modalize>
      </Portal>
    </Container>
  );
}

export default Favorites;