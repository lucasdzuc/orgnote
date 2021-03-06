import React, { useState, useCallback } from 'react';
import { TextInputProps, Platform } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { 
  Container, 
  TextInput, 
  ButtonClearInput, 
  Icon,
  ButtonFilterOrg,
  FilterIcon,
} from './styles';

interface InputProps extends TextInputProps {
  name?: string;
  handleClearInput(): void;
  handleOpenModalFilter(): void;
}

const SearchInput: React.FC<InputProps> = ({ value = '', handleClearInput, handleOpenModalFilter, ...rest }) => {

  // const inputRef = useRef(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!value);
  }, [value]);

  // const handleClearInput = useCallback(() => {
  //   inputRef?.current.clear();
  // }, [inputRef?.current]);

  return (
    <Container isFocused={isFocused}>

      <TextInput
        placeholderTextColor="#B7B7CC"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        value={value}
        handleClearInput={handleClearInput}
        keyboardAppearance="dark"
        testID="search-input"
        {...rest}
      />

      {Platform.OS !== 'ios' && 
        value.length > 0 && (
        <ButtonClearInput onPress={handleClearInput} activeOpacity={0.6} >
          <Icon
            name="x"
            size={22}
            color={isFocused || isFilled ? '#2196f3' : '#e9bbbb'}
          />
        </ButtonClearInput>
        )
      }

      <ButtonFilterOrg onPress={handleOpenModalFilter} activeOpacity={0.7} >
        <FilterIcon name="sliders" />
      </ButtonFilterOrg>

    </Container>
  );
};

export default SearchInput;
