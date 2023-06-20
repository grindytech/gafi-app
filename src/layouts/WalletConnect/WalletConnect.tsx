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
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';

import { useConnectWallet } from 'contexts/connectWalletContext/connectWalletContext';
import { useSubstrate } from 'contexts/substrateContext';
import { CHROME_EXT_URL, FIREFOX_ADDON_URL, wallets } from 'utils/constants';

export default function WalletConnect() {
  const [errorMessage, setErrorMessage] = useState('');
  const { isOpen, onClose } = useDisclosure();

  const { setAccounts } = useSubstrate();

  console.log(isOpen);

  return (
    <Modal isOpen={!isOpen} onClose={onClose} closeOnOverlayClick={false}>
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

                    onClose();

                    if (message) {
                      return setErrorMessage(message);
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
