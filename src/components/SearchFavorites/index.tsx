import React, { useState, useCallback, useRef } from 'react';
import { TextInputProps } from 'react-native';

import { Container, TextInput, ButtonClearInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  name?: string;
}

const SearchInput: React.FC<InputProps> = ({ value = '', ...rest }) => {

  const inputRef = useRef(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!value);
  }, [value]);

  const handleClearInput = useCallback(() => {

    inputRef.current.clear();

  }, [inputRef]);

  return (
    <Container isFocused={isFocused}>

      <TextInput
        ref={inputRef}
        placeholderTextColor="#B7B7CC"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        value={value}
        testID="search-input"
        {...rest}
      />

      {value.length > 0 && (
      <ButtonClearInput onPress={handleClearInput} activeOpacity={0.6} >
        <Icon
          name="x"
          size={22}
          color={isFocused || isFilled ? '#2196f3' : '#969696'}
        />
      </ButtonClearInput>
      )}
    </Container>
  );
};

export default SearchInput;
