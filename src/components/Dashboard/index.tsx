import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// IMPORT HOOKS
import useFavorites from '../../hooks/useFavorites';

// IMPORT COMPONENTS
import { categories } from '../Categories';

import { 
  Container,
  CardDash, 
  ContentResult,
  TotalResultCardDash,
  ContentTitle,
  TextCardDash,
} from './styles';

const Dashboard: React.FC = () => {

  const { favorites } = useFavorites();

  return (
    <Container
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 4,
        paddingVertical: 16,
      }}
    >

    {/* <ScrollView
      style={{ flex: 1 }}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 0,
      }}
    > */}

      {categories.map(category => (
        <CardDash key={category.id}>
          <ContentResult>
            <TotalResultCardDash>{category.value}</TotalResultCardDash>
          </ContentResult>
          <ContentTitle>
            <TextCardDash>{category.title}</TextCardDash>
          </ContentTitle>
        </CardDash>
      ))}

    {/* </ScrollView> */}

    </Container>
  );
}

export default Dashboard;