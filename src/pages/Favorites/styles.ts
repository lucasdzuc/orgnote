import styled, { css } from 'styled-components/native';
import { Platform, FlatList } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  background: ${props => props.theme.colors.background};
  /* padding-top: ${Platform.OS === 'ios' ? getStatusBarHeight() + 24 : 64}px; */
`;

export const HeaderContainer = styled.View`
  margin-bottom: 8px;
  /* padding: 16px 16px 0px; */
  background: ${props => props.theme.colors.background};;
`;

export const ProductList = styled(FlatList)``;

export const HeaderContainerList = styled.View`
  margin-bottom: 0px;
  background: ${props => props.theme.colors.background};
`;

export const Info = styled.View`
  /* flex: 1; */
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const TextInfo = styled.Text`
  font-family: 'arimoregular';
  font-size: 15px;
  color: ${props => props.theme.colors.subtext};
  text-align: center;
`;

export const OrgContainer = styled.View`
  /* flex: 1; */
  margin-top: 40px;
  padding: 0px 16px;
`;

export const Org = styled.View`
  /* display: flex; */
  /* flex: 1; */
  /* width: 100%; */
  padding: 14px;
  flex-direction: column;
  /* align-items: center; */
  background: ${props => props.theme.colors.card};
  border-radius: 14px;
  margin-bottom: 10px;

  ${css`
  shadow-color: #969696;
  shadow-offset: {width: 0, height: 2};
  shadow-opacity: 0.5;
  elevation: 5;
  `}
`;

export const OrgInternContainer = styled.View`
  flex: 1;
  /* padding: 0px 0px 8px 0px; */
  flex-direction: row;
`;

export const OrgAvatarContainer = styled.View``;

export const OrgAvatarImage = styled.Image`
  width: 50px;
  height: 50px;
`;

export const OrgContent = styled.View`
  flex: 1;
  padding: 0px 12px 14px;
  flex-wrap: nowrap;
  /* background: lightgreen; */
`;

export const OrgName = styled.Text`
  font-family: 'arimomedium';
  font-size: 16px;
  color: ${props => props.theme.colors.cardname};
  font-weight: 700;
`;

export const OrgDescription = styled.Text`
  font-family: 'arimoregular';
  font-size: 16px;
  color: ${props => props.theme.colors.carddescription};
`;

export const AreaButtons = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const ButtonAcessLink = styled.TouchableOpacity`
  /* width: 194px; */
  height: 32px;
  margin-right: 8px;
  padding: 0px 16px;
  border-radius: 16px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #828282;
`;

export const TextButtonAcessLink = styled.Text`
  font-family: 'arimomedium';
  font-size: 15px;
  color: #FFF;
`;

export const ButtonSaveFavorityOrg = styled.TouchableOpacity`
  width: 104px;
  height: 32px;
  padding: 0px 16px;
  border-radius: 16px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: rgba(33, 150, 243, 0.1);

  ${props => props.isFavorite && 
    css`
      background: #2196f3;
    `
  }
`;

export const TextButtonSaveFavorityOrg = styled.Text`
  font-family: 'arimomedium';
  font-size: 15px;
  color: #2196f3;
  padding: 0px 4px;

  ${props => props.isFavorite &&
    css`
      color: #FFF;
      padding: 0px 4px;
    `
  }
`;

export const MessageNotFoundOrg = styled.View`
  flex: 1;
  /* background: grey; */
  justify-content: center;
  align-items: center;
`;

export const TextMessageNotFoundOrg = styled.Text`
  font-family: 'arimoregular';
  font-size: 16px;
  color: #636363;
  text-align: center;
`;

/** MODALIZE */
export const ContainerModalize = styled.View`
  flex: 1;
`;

export const HeaderModalize = styled.View`
  padding: 32px 0px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const TitleHeaderModalize = styled.Text`
  font-size: 15px;
  color: #2196f3;
  font-weight: 700;
`;

export const ContainerButtonCloseModalModilize = styled.View`
  width: 100%;
  padding: 0px 16px 16px;
`;

export const ButtonCloseModalModalize = styled.TouchableOpacity`
  /* flex: 1; */
  width: 100%;
  height: 56px;
  margin-top: 16px;
  /* margin: 0px 24px; */
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  background: #f3f4f6;
`;

export const TextButtonCloseModilize = styled.Text`
    /* font-family: 'gilroyregular'; */
    font-size: 16px;
    font-weight: 700;
    color: #464646;
  /* padding: 24px 0px; */
`;
