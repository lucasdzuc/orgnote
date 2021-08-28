import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  padding: 0px 16px;
  padding-top: ${Platform.OS === 'ios' ? getStatusBarHeight() + 24 : 48}px;
  background: ${props => props.theme.colors.background};
  justify-content: space-between;
`;

export const ButtonTheme = styled.TouchableOpacity``;