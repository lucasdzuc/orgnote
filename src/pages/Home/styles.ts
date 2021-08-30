import styled, { css } from 'styled-components/native';
import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import DestaqueIcon from '../../assets/icons/destaque.svg';
import SalvoAzulIcon from '../../assets/icons/salvo_azul.svg';
import SalvoBrancoIcon from '../../assets/icons/salvo_branco.svg';
import SetaDireitaBrancoIcon from '../../assets/icons/seta_direita_branco.svg';

export const Container = styled.View`
  flex: 1;
  padding-top: ${Platform.OS === 'ios' ? getStatusBarHeight() + 24 : 24}px;
  background: ${props => props.theme.colors.background};
`;

export const ContentInputSearch = styled.View`
  width: 100%;
  /* height: 60px; */
  padding: 0px 16px;
`;

export const ButtonRedirectPageSearch = styled.TouchableOpacity`
  /* flex: 1; */
  height: 60px;
  padding: 0px 24px;
  border-radius: 14px;
  background: ${props => props.theme.colors.searchinput};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
  ${css`
    shadow-color: #969696;
    shadow-offset: {width: 0, height: 4};
    shadow-opacity: 0.5;
    /* shadow-radius: 5; */
    elevation: 4;
  `}
`;

export const TextButtonPageSearch = styled.Text`
  font-family: 'arimoregular';
  font-size: 16px;
  color: ${props => props.theme.colors.searchplaceholder};
`;

export const HeaderHighlighted = styled.View`
  /* flex: 1; */
  padding: 66px 0px 32px;
  justify-content: center;
  align-items: center;
`;

export const IconDestaque = styled(DestaqueIcon)`
  width: 24px;
  height: 24px;
`;

export const TextHeader = styled.Text`
  font-family: 'arimomedium';
  font-size: 22px;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
`;

export const SubTextHeader = styled.Text`
  font-family: 'arimoregular';
  font-size: 16px;
  color: ${props => props.theme.colors.subtext};
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
  margin-bottom: 16px;

  ${css`
  shadow-color: #969696;
  shadow-offset: {width: 0, height: 2};
  shadow-opacity: 0.5;
  elevation: 5;
  `}
`;

export const OrgInternContainer = styled.View`
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
  font-family: 'arimoregular';
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
  align-items: flex-end;
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

export const IconSalvoBranco = styled(SalvoBrancoIcon)`
  width: 20px;
  height: 20px;
`;

export const IconSalvoAzul = styled(SalvoAzulIcon)`
  width: 20px;
  height: 20px;
`;

export const TextButtonSaveFavorityOrg = styled.Text`
  font-family: 'arimomedium';
  font-size: 16px;
  color: #2196f3;
  padding: 0px 4px;

  ${props => props.isFavorite &&
    css`
      color: #FFF;
    `
  }
`;

export const FloatingButton = styled.View`
  /* flex: 1; */
  position: absolute;
  /* width: 100%; */
  /* padding: 0px 16px; */
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  bottom: 32px;
  right: 16px;
`;

export const ButtonTheme = styled.TouchableOpacity`
  width: 48px;
  height: 48px;

  border-radius: 50px;
  background: ${props => props.theme.colors.secondary};
  justify-content: center;
  align-items: center;
`;


export const ButtonNavigateFavority = styled.TouchableOpacity`
  /* flex: 1; */
  /* position: absolute; */
  width: 150px;
  height: 48px;
  border-radius: 39px;
  background: #2196f3;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  bottom: 0px;
  right: 0px;
`;

export const TextButtonNavigate = styled.Text`
  font-family: 'arimomedium';
  font-size: 16px;
  color: #FFF;
  padding: 0px 8px;
`;

export const IconSetaDireitaBranco = styled(SetaDireitaBrancoIcon)`
  width: 20px;
  height: 20px;
`;
