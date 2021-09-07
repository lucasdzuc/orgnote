import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
}

export const Container = styled.View<ContainerProps>`
  /* flex: 1; */
  width: 100%;
  height: 60px;
  padding: 0px 0px 0px 0px;
  background: ${props => props.theme.colors.searchinput};
  border-radius: 14px;
  border-width: 2px;
  border-color: ${props => props.theme.colors.searchinput};
  flex-direction: row;
  align-items: center;

  ${css`
    shadow-color: #969696;
    shadow-offset: {width: 0, height: 2};
    shadow-opacity: 0.2;
    /* shadow-radius: 5; */
    elevation: 3;
  `}

  ${props =>
    props.isFocused &&
    css`
      border-color: #2196f3;
  `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-family: 'arimoregular';
  font-size: 16px;
  color: ${props => props.theme.colors.searchtextvalue};
`;

export const IconLeft = styled(FeatherIcon)`
  margin: 0px 24px;
`;

export const IconRight = styled(FeatherIcon)`
  margin: 0px 24px;
`;

export const ButtonGoBack = styled.TouchableOpacity``;

export const ButtonSearch = styled.TouchableOpacity``;
