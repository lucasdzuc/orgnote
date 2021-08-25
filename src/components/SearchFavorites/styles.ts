import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
}

export const Container = styled.View<ContainerProps>`
  /* flex: 1; */
  width: 100%;
  height: 60px;
  padding: 0px 0px 0px 24px;
  background: #FFF;
  border-radius: 14px;
  border-width: 2px;
  border-color: #FFF;
  flex-direction: row;
  align-items: center;

  ${css`
    shadow-color: #fafafa;
    shadow-offset: {width: 0, height: 2};
    shadow-opacity: 0.9;
    elevation: 4;
  `}

  ${props =>
    props.isFocused &&
    css`
      border-color: #2196f3;
  `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #000;
  font-size: 16px;
`;

export const ButtonClearInput = styled.TouchableOpacity``;

export const Icon = styled(FeatherIcon)`
  margin: 0px 24px;
`;

export const ButtonSearch = styled.TouchableOpacity``;
