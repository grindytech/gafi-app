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
import React, { useState } from 'react';

import { useSubstrate } from 'contexts/substrateContext';
import { CHROME_EXT_URL, FIREFOX_ADDON_URL } from 'utils/constants';

interface ConnectWalletModalProps {
  mounting: boolean;
  setMounting: React.DispatchWithoutAction;
}

import PolkadotIcon from 'public/assets/wallet/polkadot-js.svg';
import SubWalletIcon from 'public/assets/wallet/subwallet.svg';
import CloverWallet from 'public/assets/wallet/clover.svg';

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

export default function ConnectWalletModal({
  mounting,
  setMounting,
}: ConnectWalletModalProps) {
  const [errorMessage, setErrorMessage] = useState('');

  const { setAccounts } = useSubstrate();

  return (
    <Modal isOpen={mounting} onClose={() => ({})}>
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
                  leftIcon={
                    <Icon as={button.icon as any} width={8} height={8} />
                  }
                  iconSpacing={4}
                  onClick={async () => {
                    const message = await setAccounts(button.extensionName);

                    if (!message) {
                      setMounting();
                    }
                    if (message) {
                      setErrorMessage(message);
                    }
                  }}
                  disabled={
                    !window.injectedWeb3 ||
                    !window.injectedWeb3[button.extensionName]
                  }
                >
                  {button.title}
                </Button>
              ))
            )}
            <FormControl isInvalid={!!errorMessage}>
              <FormErrorMessage textAlign="center">
                {errorMessage}
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
  );
}
