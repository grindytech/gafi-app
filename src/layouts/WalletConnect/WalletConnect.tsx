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
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useSubstrate } from 'contexts/substrateContext';

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
              connectWalletButtons.map(button => [
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
                  disabled={!window.injectedWeb3[button.extensionName]}
                >
                  {button.title}
                </Button>,
              ])
            )}
            <FormControl isInvalid={!!errorMessage}>
              <FormErrorMessage textAlign="center">
                {t(errorMessage)}
              </FormErrorMessage>
            </FormControl>
          </ButtonGroup>
        </ModalBody>

        <ModalFooter justifyContent="center" letterSpacing={1}>
          FAQ: why we need connect to wallet? <Link ml={2}>here</Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
