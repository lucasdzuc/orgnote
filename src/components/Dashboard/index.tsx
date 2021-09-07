import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

import categories from '../categories';

import { 
  Container,
  CardDash, 
  ContentResult,
  TotalResultCardDash,
  ContentTitle,
  TextCardDash,
} from './styles';

const Dashboard: React.FC = () => {
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
          <ContentResult bgColor={category.bgColor}>
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