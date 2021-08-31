import React, { useContext } from 'react';
import { View } from 'react-native';
import { ThemeContext } from 'styled-components';
import Icon from 'react-native-vector-icons/Feather';

import { Container, ButtonTheme } from './styles';

interface PropsTheme {
  toggleTheme(): void;
}

const Header: React.FC<PropsTheme> = ({ toggleTheme }) => {

  const { title } = useContext(ThemeContext);

  return (
    <Container>
      <ButtonTheme onPress={toggleTheme} activeOpacity={0.7}>
        <Icon name={title === 'light' ? 'moon' : 'sun'} size={24} color={title === 'light' ? "#000" : "#2196f3" } />
        {/* {title === 'light' ? <Icon name="moon" size={30} color="#000" /> : <Icon name="sun" size={30} color="#4F8EF7" /> } */}
      </ButtonTheme>
    </Container>
  );
}

export default Header;