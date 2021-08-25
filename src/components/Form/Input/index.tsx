import React from 'react';
import { View } from 'react-native';

import { 
  Container,
  TextInput 
} from './styles';

const Input: React.FC = () => {
  return (
    <Container>
      <TextInput 
        // onChangeText={}
        placeholderTextColor="#666360"
      />
    </Container>
  );
}

export default Input;