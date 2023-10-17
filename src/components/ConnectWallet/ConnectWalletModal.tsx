import {
  Button,
  Icon,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import React, { useState } from 'react';

import PolkadotIcon from 'public/assets/wallet/polkadot-js.svg';
import SubWalletIcon from 'public/assets/wallet/subwallet.svg';
import CloverWallet from 'public/assets/wallet/clover.svg';

import { getInjectedWeb3 } from 'utils';

import { InjectedAccount } from 'types/polkadot.type';
import { Signer } from '@polkadot/types/types';
import { setCookie } from 'utils/utils.cookie';
import { INJECTED_EXTENSION_CONNECTED } from 'utils/utils.injected';

interface ConnectWalletModalProps {
  setAccount: (account: InjectedAccount) => void;
  onClose: () => void;
}

export default ({ setAccount, onClose }: ConnectWalletModalProps) => {
  const [isError, setIsError] = useState('');

  const [isLoading, setIsLoading] = useState<string | undefined>('');

  const ListWallet = [
    {
      extension: 'polkadot-js',
      name: 'polkadot{.js}',
      icon: <Icon as={PolkadotIcon} width={6} height={6} />,
      link: 'https://polkadot.js.org/extension/',
    },
    {
      name: 'SubWallet',
      icon: <Icon as={SubWalletIcon} width={6} height={6} />,
      link: 'https://metamask.io/download/',
    },
    {
      name: 'CloverWallet',
      icon: <Icon as={CloverWallet} width={6} height={6} />,
      link: 'https://www.coinbase.com/wallet/downloads',
    },
  ];

  const Login = async (account: string, signer: Signer) => {
    console.log({ account, signer });

    setIsLoading(undefined);
  };

  return (
    <Modal isOpen={true} size="xs" onClose={onClose}>
      <ModalOverlay />

      <ModalContent
        padding={0}
        bg="shader.a.900"
        border="0.0625rem solid"
        borderColor="shader.a.800"
      >
        <ModalHeader
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          fontSize="lg"
          fontWeight="semibold"
          color="white"
          padding={4}
          borderBottom="0.0625rem solid"
          borderColor="shader.a.800"
        >
          Connect wallet
          <ModalCloseButton position="unset" width={5} height={5} />
        </ModalHeader>

        <ModalBody padding={4}>
          {React.Children.toArray(
            ListWallet.map(meta => (
              <Button
                variant="unstyled"
                bg="transparent"
                width="full"
                justifyContent="flex-start"
                fontWeight="medium"
                color="white"
                transitionDuration="ultra-slow"
                padding={3}
                //
                isLoading={isLoading === meta.name}
                loadingText={meta.name}
                isDisabled={!meta.extension}
                sx={{
                  '.chakra-button__spinner': { width: 6, height: 6, margin: 0 },
                }}
                //
                leftIcon={meta.icon}
                _notFirst={{ mt: 2 }}
                onClick={async () => {
                  try {
                    setIsLoading(meta.name);

                    const injected = await getInjectedWeb3(
                      meta.extension as string
                    );

                    if (injected?.accounts) {
                      const getDate = new Date();
                      getDate.setFullYear(getDate.getFullYear() + 1);
                      const accounts = await injected.accounts.get();

                      const address = accounts[0].address;
                      const name = accounts[0].name;

                      await Login(accounts[0].address, injected.signer);

                      onClose();
                      setAccount({ address, name });

                      // update cookie for extension injected
                      setCookie({
                        expires: getDate,
                        key: INJECTED_EXTENSION_CONNECTED,
                        value: meta.extension as string,
                      });
                    }
                  } catch (error: any) {
                    if (error.message !== 'Cancelled') {
                      setIsError(meta.link);
                    }

                    throw new Error(error);
                  } finally {
                    setIsLoading(undefined);
                  }
                }}
              >
                {meta.name}
              </Button>
            ))
          )}

          {isError?.length ? (
            <Link
              color="red.500"
              fontWeight="semibold"
              fontSize="sm"
              textAlign="center"
              mt={4}
              display="block"
              href={isError}
              target="_blank"
            >
              Please install extension to use this feature (click here)
            </Link>
          ) : null}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
