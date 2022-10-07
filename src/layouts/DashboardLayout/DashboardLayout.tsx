import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { mdiWalletOutline } from '@mdi/js';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import AccountInfo from './components/AccountInfo';
import Panel from './components/Panel';
import SideBar from './components/Sidebar';

import { useSubstrateState } from 'contexts/substrateContext';
import WalletConnect from 'layouts/WalletConnect/WalletConnect';
import { GAFI_WALLET_STORAGE_KEY } from 'utils/constants';

const DashboardLayout: React.FC = ({ children }) => {
  const { apiState, apiError } = useSubstrateState();
  const [drawerOpen, setDrawerOpen] = useState('');
  const onClose = () => {
    setDrawerOpen('');
  };

  const onSidebarOpen = () => {
    setDrawerOpen('sidebar');
  };

  const onAccountInfoOpen = () => {
    setDrawerOpen('accountInfo');
  };
  const { t } = useTranslation();
  if (apiState === 'ERROR') return message(apiError);
  if (apiState !== 'READY') return loader(t('CONNECTING_TO_SUBSTRATE'));

  const checkPolkadotAccounts = localStorage.getItem(GAFI_WALLET_STORAGE_KEY);

  return (
    <>
      <WalletConnect isOpen={!checkPolkadotAccounts} />

      <Box sx={dashBoardStyled}>
        <SideBar display={{ base: 'none', lg: 'flex' }} />
        <Drawer
          autoFocus={false}
          isOpen={drawerOpen === 'sidebar'}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
        >
          <DrawerOverlay />
          <DrawerContent bg="transparent">
            <SideBar onClose={onClose} />
          </DrawerContent>
        </Drawer>
        <Drawer
          autoFocus={false}
          isOpen={drawerOpen === 'accountInfo'}
          placement="bottom"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="md"
        >
          <DrawerOverlay />
          <DrawerContent bg="transparent">
            <AccountInfo onClose={onClose} />
          </DrawerContent>
        </Drawer>
        <Flex
          direction="column"
          flex={1}
          sx={{
            background: 'greyBg',
            display: 'flex',
          }}
        >
          <Panel onOpen={onSidebarOpen} />
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
                flex: 1,
                px: { base: 'none', lg: 4 },
                p: 0,
              }}
            >
              {children}
            </Box>
            <AccountInfo display={{ base: 'none', lg: 'flex' }} />
          </Box>
        </Flex>
        <IconButton
          sx={accountInfoButtonStyled}
          onClick={onAccountInfoOpen}
          variant="white"
          aria-label="open menu"
          icon={
            <Icon color="primary">
              <path fill="currentColor" d={mdiWalletOutline} />
            </Icon>
          }
        />
      </Box>
    </>
  );
};
export default DashboardLayout;

const dashBoardStyled = {
  p: { base: '0 10px 0 0' },
  display: 'flex',
  background: 'greyBg',
  alignItems: 'flex-start',
  minHeight: '100vh',
};

const accountInfoButtonStyled = {
  display: { base: 'block', lg: 'none' },
  w: 16,
  h: 16,
  position: 'fixed',
  right: 8,
  bottom: 16,
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
    <Text textAlign="center" color="blackAlpha.700">
      {text}
    </Text>

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
