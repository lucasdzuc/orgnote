import React from 'react';
import { View, Text, Dimensions } from 'react-native';

// const { width } = Dimensions.get('window');

// IMPORT HOOKS
// import useFavorites from '../../hooks/useFavorites';

// IMPORT COMPONENTS
import { categories } from '../Categories';

import { 
  ContainerScrollProvider,
  CardDash, 
  ContentResult,
  TotalResultCardDash,
  ContentTitle,
  TextCardDash,
} from './styles';

const Dashboard: React.FC = () => {

  // const { favorites } = useFavorites();

  // console.log(favorites.length);

  return (
    <ContainerScrollProvider
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 4,
        paddingVertical: 16,
      }}
    >

      {categories.map(category => (
        <CardDash key={category.id} backgroundColor={category.backgroundColor}>
          <ContentResult>
            <TotalResultCardDash colorValue={category.colorValue}>{category.value}</TotalResultCardDash>
          </ContentResult>
          <ContentTitle>
            <TextCardDash>{category.title}</TextCardDash>
          </ContentTitle>
        </CardDash>
      ))}

    </ContainerScrollProvider>
  );
}

export default Dashboard;