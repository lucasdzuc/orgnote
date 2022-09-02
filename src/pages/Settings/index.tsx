import React, { useState, useEffect, useCallback, useRef, useContext } from 'react';
import { View, Text, Alert } from 'react-native';
import { ThemeContext } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import useLogOrg from '../../hooks/useLogOrg';

import {
   Container,
   ContentButtons,
   ButtonOptionSetting,
   TextButtonOptionSetting,
} from './styles';

const Settings: React.FC = () => {

  const { colors, title } = useContext(ThemeContext);

  const { clearOrgLog, logOrg } = useLogOrg();

  const navigation = useNavigation();

  const handleNavigateLog = useCallback(() => {
    navigation.navigate('LogOrg');
  }, []);

  const handleNavigateAbout = useCallback(() => {
    navigation.navigate('About');
  }, []);

  const clearLog = useCallback(() => {
    Alert.alert(
      "Limpar histórico?",
      "Ao limpar seu histórico não sera possível recupera-lo.",
      [
        {
          text: "Cancelar",
          onPress: () => { }, // console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK", onPress: () => {
            try {
              clearOrgLog();
            } catch (error) {
              console.log(error);
            }
          }
        }
      ],
      { cancelable: false }
    );
  }, []);

  const handleAlert = () => {
    Alert.alert("Seu histórico esta vazio!");
  };

  return (
    <Container>
      {/* <Text>Configurações</Text> */}

      <ContentButtons>

        <ButtonOptionSetting onPress={handleNavigateLog} activeOpacity={0.7}>
          <Icon name="archive" size={22} color={title === 'light' ? "#222" : "#FAFAFA" } />
          <TextButtonOptionSetting>Ver Histórico</TextButtonOptionSetting>
        </ButtonOptionSetting>

        <ButtonOptionSetting onPress={logOrg.length > 0 ? clearLog : handleAlert} activeOpacity={0.7}>
          <Icon name="trash" size={22} color={title === 'light' ? "#222" : "#FAFAFA" } />
          <TextButtonOptionSetting>Excluir histórico</TextButtonOptionSetting>
        </ButtonOptionSetting>

        <ButtonOptionSetting onPress={handleNavigateAbout} activeOpacity={0.7}>
          <Icon name="info" size={22} color={title === 'light' ? "#222" : "#FAFAFA" } />
          <TextButtonOptionSetting>Sobre</TextButtonOptionSetting>
        </ButtonOptionSetting>

      </ContentButtons>

    </Container>
  );
}

export default Settings;