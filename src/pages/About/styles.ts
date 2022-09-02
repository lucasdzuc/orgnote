import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  background: ${({ theme }: any) => theme.colors.background};
`;

export const Contents = styled.View`
  padding: 0px 16px;
  padding-top: ${Platform.OS === 'ios' ? getStatusBarHeight() + 16 : 16}px;
  align-items: center;
  /* justify-content: center; */
`;

export const ContentDescription = styled.View`
  padding: 32px 0px;
`;

export const TitleText = styled.Text``;

export const TextDefault = styled.Text`
  font-family: 'arimomedium';
  font-size: 16px;
  color: ${({ theme }: any) => theme.colors.text};
`;

export const TextSecundary = styled.Text`
  font-family: 'arimoregular';
  font-size: 16px;
  color: ${({ theme }: any) => theme.colors.subtext};
  line-height: 24px;
  text-align: center;
`;
