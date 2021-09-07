import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TextInputProps } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// IMPORT DEBOUNCE
// import useDebounce from '../../utils/useDebounce';

import { Container, TextInput, IconLeft, IconRight, ButtonGoBack } from './styles';

interface InputProps extends TextInputProps {
  name?: string;
  handleClearInput(): void;
}

interface InputRef {
  focus(): void;
}

const SearchInput: React.ForwardRefRenderFunction<InputRef, InputProps> = ({ value = '', handleClearInput, ...rest }) => {

  const inputRef = useRef<any>(null);

  const { goBack } = useNavigation();

  // const [displayValue, setDisplayValue] = useState(value);
  // const debouncedChange = useDebounce(onChangeText, 300);

  const [isFocused, setIsFocused] = useState(true);
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    inputRef?.current.focus();
  }, [inputRef?.current]);

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
        <IconLeft 
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
        keyboardAppearance="dark"
        testID="search-input"
        {...rest}
      />
      
      {value.length > 0 ? (
        <IconRight
          name="x" 
          size={22}
          color={isFocused || isFilled ? '#2196F3' : '#969696'}
          onPress={handleClearInput}
        />
      ) : (
        <IconRight
          name="search"
          size={22}
          color={isFocused || isFilled ? '#2196f3' : '#969696'}
        />
      )}
    </Container>
  );
};

export default SearchInput;
