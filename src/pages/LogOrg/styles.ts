import styled from 'styled-components/native';

export const ContainerScrollView = styled.ScrollView`
  flex: 1;
`;

export const Header = styled.View`
  padding: 14px 8px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TextHeader = styled.Text`
  font-family: 'arimoregular';
  font-size: 15px;
  color: ${props => props.theme.colors.text};
`;

export const CardLog = styled.View`
  margin-bottom: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  background: ${props => props.theme.colors.cardlog};
  flex-direction: row;
  justify-content: space-between;
`;

export const NameCardLog = styled.Text`
  font-family: 'arimoregular';
  font-size: 15px;
  color: ${props => props.theme.colors.text};
`;

export const DateCardLog = styled.Text`
  font-family: 'arimoregular';
  font-size: 15px;
  color: ${props => props.theme.colors.text};
`;

export const CardEmptyStateScreen = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const TextEmptyStateScreen = styled.Text`
  font-family: 'arimoregular';
  font-size: 16px;
  color: ${props => props.theme.colors.text};
  /* padding: 0px 4px; */
`;