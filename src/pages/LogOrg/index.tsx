import React from 'react';
import { View, Text } from 'react-native';

// IMPORT HOOKS
import useLogOrg from '../../hooks/useLogOrg';

// IMPORT HOOKS FUNCTIONS
import formatDate from '../../utils/formatDate';

import {
  ContainerScrollView,
  Header,
  TextHeader,
  CardLog,
  DateCardLog,
  NameCardLog,
  CardEmptyStateScreen,
  TextEmptyStateScreen,
} from './styles';

const LogOrg: React.FC = () => {

  const { logOrg } = useLogOrg();

  // console.log(logOrg);

  return (
    <ContainerScrollView
      vertical
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 24,
      }}
    >

      {logOrg.length > 0 ? (
      <>
        <Header>
          <TextHeader>Nome</TextHeader>
          <TextHeader>Data</TextHeader>
        </Header>

        {logOrg.reverse().map(log => (
          <CardLog key={log.idLog}>
            <DateCardLog>{log.name}</DateCardLog>
            <NameCardLog>{formatDate("2021-09-19T14:46:26")}</NameCardLog>
            {/* <NameCardLog>{log.addedIn}</NameCardLog> */}
          </CardLog>
        ))}
      </>
      ) : (
        <CardEmptyStateScreen>
          <TextEmptyStateScreen>Seu histórico de log's esta vazio!</TextEmptyStateScreen>
        </CardEmptyStateScreen>
      )}

    </ContainerScrollView>
  );
}

export default LogOrg;