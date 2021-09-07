import styled, { css } from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  /* padding-top: 12px; */
  /* flex-direction: row; */
  /* align-items: center; */
  /* background: lightskyblue; */
`;

export const CardDash = styled.View`
  /* flex: 1; */
  width: 100px;
  height: 100px;
  margin-right: 8px;
  padding: 4px;
  border-radius: 14px;
  background: ${props => props.theme.colors.carddash};
  /* background-color: ${props => props.bgColor}; */
  justify-content: center;
  /* align-items: center; */
  ${css`
    shadow-color: #969696;
    shadow-offset: {width: 0, height: 2};
    shadow-opacity: 0.5;
    elevation: 5;
  `}
`;

export const ContentResult = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  /* background: lightpink; */
`;

export const TotalResultCardDash = styled.Text`
  font-family: 'arimomedium';
  font-size: 16px;
  color: ${props => props.theme.colors.text};
  text-align: center;
`;

export const ContentTitle = styled.View`
  flex: 1;
  /* background: lightsalmon; */
  /* justify-content: center; */
  /* align-items: center; */
`;

export const TextCardDash = styled.Text`
  font-family: 'arimoregular';
  font-size: 12px;
  color: ${props => props.theme.colors.text};
  text-align: center;
`;