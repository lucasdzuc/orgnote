import styled, { css } from 'styled-components/native';
import { Platform, FlatList } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  background: #fafafa;
  padding-top: ${Platform.OS === 'ios' ? getStatusBarHeight() + 24 : 64}px;
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
  background: #FFF;
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
  color: #969696;
`;

export const HeaderHighlighted = styled.View`
  /* flex: 1; */
  padding: 66px 0px 32px;
  justify-content: center;
  align-items: center;
`;

export const TextHeader = styled.Text`
  font-family: 'arimomedium';
  font-size: 22px;
  font-weight: 500;
  color: #000;
`;

export const SubTextHeader = styled.Text`
  font-family: 'arimoregular';
  font-size: 16px;
  color: #636363;
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
  background: #FFF;
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

export const OrgTitle = styled.Text`
  font-family: 'arimoregular';
  font-size: 16px;
  color: #2196f3;
  font-weight: 700;
`;

export const OrgDescription = styled.Text`
  font-family: 'arimoregular';
  font-size: 16px;
  color: #636363;
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
`;

export const TextButtonSaveFavorityOrg = styled.Text`
  font-family: 'arimomedium';
  font-size: 16px;
  color: #2196f3;
  padding: 0px 4px;
`;

export const FloatingButton = styled.View`
  /* flex: 1; */
  position: absolute;
  bottom: 32px;
  right: 16px;
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

