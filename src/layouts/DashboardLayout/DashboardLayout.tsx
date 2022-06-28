import { Box, Flex, Text, Spinner, VStack } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import AccountInfo from './components/AccountInfo';
import Panel from './components/Panel';
import SideBar from './components/Sidebar';

import { useSubstrateState } from 'contexts/substrateContext';

const DashboardLayout: React.FC = ({ children }) => {
  const { apiState, apiError, keyringState } = useSubstrateState();
  const { t } = useTranslation();
  if (apiState === 'ERROR') return message(apiError);
  if (apiState !== 'READY') return loader(t('CONNECTING_TO_SUBSTRATE'));

  if (keyringState !== 'READY') {
    return loader(t('LOADING_ACCOUNTS_NOTIFY'));
  }

  return (
    <Box sx={dashBoardStyled}>
      <SideBar />
      <VStack
        flex={10}
        sx={{
          background: 'greyBg',
          display: 'flex',
        }}
      >
        <Panel />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            width: '100%',
            height: '100%',
          }}
        >
          <Box
            sx={{
              flex: 8,
              px: 4,
            }}
          >
            {children}
          </Box>
          <AccountInfo />
        </Box>
      </VStack>
    </Box>
  );
};
export default DashboardLayout;

const dashBoardStyled = {
  p: 4,
  display: 'flex',
  background: 'greyBg',
  alignItems: 'flex-start',
  minHeight: '100vh',
};

const message = (errObj: any) => {
  const { t } = useTranslation();
  return (
    <VStack
      pt={20}
      justifyContent="flex-start"
      alignItems="center"
      w="100vw"
      h="100vh"
      bg="greyBg"
    >
      <Text color="red.500">{t('ERROR_CONNECTING_TO_SUBTRATE')}</Text>
      <Text color="red.500">
        {t('CONNECTING_TO_WEBSOCKET_FAILED', {
          websocketName: errObj.target.url,
        })}
      </Text>
    </VStack>
  );
};

const loader = (text: string) => (
  <Flex
    bg="greyBg"
    justifyContent="center"
    flexDirection="column"
    alignItems="center"
    w="100vw"
    h="100vh"
  >
    <Text color="white">{text}</Text>

    <Spinner
      mt={4}
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
    />
  </Flex>
);
