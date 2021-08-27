import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TextInputProps } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// IMPORT DEBOUNCE
import useDebounce from '../../utils/useDebounce';

import { Container, TextInput, Icon, ButtonGoBack, ButtonClearInput } from './styles';

interface InputProps extends TextInputProps {
  type?: string;
  name?: string;
}

const SearchInput: React.FC<InputProps> = ({ value = '', ...rest }) => {

  const inputRef = useRef(null);

  const { goBack } = useNavigation();

  // const [displayValue, setDisplayValue] = useState(value);
  // const debouncedChange = useDebounce(onChangeText, 300);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  // function handleChange(inputRef: { current: { value: React.SetStateAction<string>; }; }){
  //   setDisplayValue(inputRef.current.value);
  //   debouncedChange(inputRef.current.value);
  // }

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!value);
  }, [value]);

  const navigateBack = useCallback(() => {
    goBack();
  }, []);

  return (
    <Container isFocused={isFocused}>
      <ButtonGoBack onPress={navigateBack} activeOpacity={0.8}>
        <Icon 
          name="arrow-left" 
          size={22} 
          color="#969696" 
        />
      </ButtonGoBack>

      <TextInput
        ref={inputRef}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        value={value}
        placeholderTextColor="#969696"
        testID="search-input"
        {...rest}
      />

      <Icon
        name="search"
        size={22}
        color={isFocused || isFilled ? '#2196f3' : '#969696'}
      />
    </Container>
  );
};

export default SearchInput;
