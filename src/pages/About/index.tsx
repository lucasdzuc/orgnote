import React from 'react';
// import { Text, View } from 'react-native';
import pkg from '../../../app.json';

import { 
  Container,
  Contents,
  ContentDescription,
  TextDefault,
  TextSecundary,
} from './styles';

const About: React.FC = () => {

  const date = new Date();

  const { expo } = pkg;

  return (
    <Container>

      <Contents>
        <TextDefault>Versão {expo.version}</TextDefault>
        <TextDefault>© 2021 - {date.getFullYear()} Orgnote</TextDefault>
        <TextDefault>Todos os direitos reservados</TextDefault>

        <ContentDescription>
          <TextSecundary>
            Orgnote é um app para que você possa salvar as organizações presentes no GitHub.
            Com ele, você realiza buscas de organizações do seu interesse e pode salvar no 
            seu dispositivo de forma prática e acessar quando quiser.
          </TextSecundary>
        </ContentDescription>
      </Contents>

    </Container>
  );
}

export default About;