import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  Icon,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import React from 'react';

import {
  CHROME_EXT_URL,
  FIREFOX_ADDON_URL,
  GAFI_WALLET_ACCOUNT_KEY,
  GAFI_WALLET_STORAGE_KEY,
} from 'utils/constants';

import PolkadotIcon from 'public/assets/wallet/polkadot-js.svg';
import SubWalletIcon from 'public/assets/wallet/subwallet.svg';
import CloverWallet from 'public/assets/wallet/clover.svg';

import { loadAccounts } from './ConnectSubstrateUtils';
import { injectedAccount } from 'redux/injected';

export default function ConnectSubstrate() {
  const extensionName = localStorage.getItem(GAFI_WALLET_STORAGE_KEY);
  const accountName = localStorage.getItem(GAFI_WALLET_ACCOUNT_KEY);

  const pairsAccount = accountName?.includes('address')
    ? JSON.parse(accountName)
    : undefined;

  const dispatch = useAppDispatch();
  const { apiState } = useAppSelector(state => state.substrate);
  const { keyringState } = useAppSelector(state => state.injected);

  const wallets = [
    {
      title: 'Polkadot Wallet',
      icon: PolkadotIcon,
      extensionName: 'polkadot-js',
    },
    {
      title: 'SubWallet',
      icon: SubWalletIcon,
      extensionName: 'subwallet-js',
    },
    {
      title: 'CloverWallet',
      icon: CloverWallet,
      extensionName: 'clover',
    },
  ];

  React.useEffect(() => {
    if (apiState === 'READY' && !keyringState && extensionName) {
      loadAccounts({
        extensionName,
        dispatch,
      });
    }

    if (pairsAccount) {
      const { address, name } = pairsAccount;

      dispatch(
        injectedAccount({
          polkadot: {
            account: { address, name },
          },
        })
      );
    }
  }, [apiState]);

  return (
    <>
      {extensionName ? null : (
        <Modal isOpen={keyringState !== 'READY'} onClose={() => ({})}>
          <ModalOverlay />

          <ModalContent p={4}>
            <ModalHeader>Connect Wallet</ModalHeader>

            <ModalBody alignSelf="center">
              <ButtonGroup
                flexDirection="column"
                spacing={0}
                gap={4}
                variant="ghost"
                size="md"
              >
                {React.Children.toArray(
                  wallets.map(button => (
                    <Button
                      justifyContent="start"
                      w="full"
                      iconSpacing={4}
                      onClick={async () => {
                        loadAccounts({
                          extensionName: button.extensionName,
                          dispatch,
                        });
                      }}
                      leftIcon={<Icon as={button.icon} width={8} height={8} />}
                      disabled={
                        !window.injectedWeb3 ||
                        !window.injectedWeb3[button.extensionName]
                      }
                    >
                      {button.title}
                    </Button>
                  ))
                )}
                <FormControl
                  isInvalid={
                    keyringState === 'ERROR' || keyringState === 'INSTALL'
                  }
                >
                  <FormErrorMessage textAlign="center" justifyContent="center">
                    {keyringState === 'ERROR'
                      ? 'not found wallet polkadot'
                      : 'please install extension'}
                  </FormErrorMessage>
                </FormControl>
              </ButtonGroup>
            </ModalBody>

            <ModalFooter justifyContent="center" letterSpacing={1}>
              {!window.injectedWeb3 && (
                <Text textAlign="center">
                  Create an account with Polkadot-JS Extension (
                  <Link
                    color="primary"
                    target="_blank"
                    rel="noreferrer"
                    href={CHROME_EXT_URL}
                  >
                    Chrome
                  </Link>
                  ,&nbsp;
                  <Link
                    color="primary"
                    target="_blank"
                    rel="noreferrer"
                    href={FIREFOX_ADDON_URL}
                  >
                    Firefox
                  </Link>
                  )&nbsp;
                </Text>
              )}
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
