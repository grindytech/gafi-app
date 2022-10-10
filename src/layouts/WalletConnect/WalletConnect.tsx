import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  Image,
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
import { useTranslation } from 'react-i18next';

import { useSubstrate } from 'contexts/substrateContext';
import { CHROME_EXT_URL, FIREFOX_ADDON_URL } from 'utils/constants';

export interface IButtonWalletProps {
  key: number;
  title: string;
  icon: string;
}

interface IWalletConnectProps {
  onCloseWallet?: () => void;
  isOpen: boolean;
}

export default function WalletConnect({
  onCloseWallet,
  isOpen,
}: IWalletConnectProps) {
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState('');

  const { setAccounts } = useSubstrate();

  const connectWalletButtons = [
    {
      title: t('POLKADOT_WALLET'),
      icon: '/assets/logo/polkadot-js.svg',
      extensionName: 'polkadot-js',
    },
    {
      title: t('SUBWALLET'),
      icon: '/assets/logo/subwallet.png',
      extensionName: 'subwallet-js',
    },
    {
      title: t('CLOVER_WALLET'),
      icon: '/assets/logo/clover.svg',
      extensionName: 'clover',
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={() => onCloseWallet}>
      <ModalOverlay />

      <ModalContent p={4}>
        <ModalHeader>{t('CONNECT_WALLET')}</ModalHeader>

        <ModalBody alignSelf="center">
          <ButtonGroup
            flexDirection="column"
            spacing={0}
            gap={4}
            variant="ghost"
            size="md"
          >
            {React.Children.toArray(
              connectWalletButtons.map(button => (
                <Button
                  justifyContent="start"
                  w="full"
                  leftIcon={
                    <Image
                      w="32px"
                      height="32px"
                      src={button.icon}
                      alt={button.title}
                    />
                  }
                  iconSpacing={4}
                  onClick={async () => {
                    const message = await setAccounts(button.extensionName);
                    setErrorMessage(message);
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
                {t(errorMessage)}
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
