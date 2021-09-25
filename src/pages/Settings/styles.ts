import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  background: ${props => props.theme.colors.background};
`;

export const ContentButtons = styled.View`
  padding: 0px 16px;
  padding-top: ${Platform.OS === 'ios' ? getStatusBarHeight() + 16 : 16}px;
`;

export const ButtonOptionSetting = styled.TouchableOpacity`
  /* width: 48px; */
  height: 56px;
  margin-bottom: 8px;
  padding: 0px 24px;
  border-radius: 14px;
  background: ${props => props.theme.colors.cardlog};
  /* background: #ebebeb; */
  flex-direction: row;
  align-items: center;
`;

export const TextButtonOptionSetting = styled.Text`
  font-family: 'arimomedium';
  font-size: 16px;
  color: ${props => props.theme.colors.text};
  padding: 0px 16px;
`;