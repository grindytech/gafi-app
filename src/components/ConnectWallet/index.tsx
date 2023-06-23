import {
  Box,
  Button,
  Center,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import AccountJazzicon from 'components/AccountJazzicon/AccountJazzicon';

import GafiTokenIcon from 'public/assets/token/gafi-token.svg';
import React from 'react';
import Swap02Icon from 'public/assets/line/swap-02.svg';
import { GAFI_WALLET_ACCOUNT_KEY } from 'utils/constants';

import { useConnectWallet } from './ConnectWalletProvider';
import { useSubstrateState } from 'contexts/substrateContext';
import useSignAndSend from 'hooks/useSignAndSend';
import ConnectWalletProfile from './ConnectWalletProfile';
import useBalance from 'hooks/useBalance';
import GafiAmount from 'components/GafiAmount';

export default function ConnectWallet() {
  const { api, apiState } = useSubstrateState();
  const toast = useToast();

  const { isOpen, onClose, onToggle } = useDisclosure();
  const { account, allAccount, setAccount } = useConnectWallet();

  const { isLoading, mutation } = useSignAndSend({
    address: account || '',
    key: ['faucet'],
  });

  const { balance } = useBalance({
    account: account,
  });

  return (
    <Menu closeOnSelect={false} placement="bottom-end">
      {account ? (
        <MenuButton>
          <AccountJazzicon address={account} />
        </MenuButton>
      ) : (
        <MenuButton
          onClick={() => {
            if (apiState !== 'READY') {
              return toast({
                title: `please wait api`,
                position: 'top-right',
                status: 'warning',
                isClosable: true,
              });
            }

            if (allAccount && allAccount.length) {
              const getAccount = allAccount[0].address;

              localStorage.setItem(GAFI_WALLET_ACCOUNT_KEY, getAccount);

              return setAccount(prev => ({
                ...prev,
                account: getAccount,
              }));
            }

            toast({
              title: 'not found account ',
              position: 'top-right',
              status: 'warning',
              isClosable: true,
            });
          }}
        >
          Connect Wallet
        </MenuButton>
      )}

      {account && allAccount ? (
        <MenuList
          borderRadius="2xl"
          bg="white"
          borderColor="shader.a.400"
          padding={4}
        >
          <MenuItem bg="transparent" as="div" padding={0} position="relative">
            <Center
              justifyContent="space-between"
              gap={4}
              px={4}
              py={2}
              border="0.0625rem solid"
              borderColor="shader.a.300"
              borderRadius="xl"
            >
              {allAccount
                .filter(item => item.address === account)
                .map(item => (
                  <ConnectWalletProfile
                    key={item.address}
                    address={item.address}
                    name={item.name}
                    sx={{ padding: 0 }}
                  />
                ))}

              <IconButton
                onClick={onToggle}
                aria-label="switch-account"
                variant="unstyled"
                bg="primary.a.100"
                color="primary.a.500"
                borderRadius="2xl"
                minWidth="auto"
                height="auto"
                width="auto"
                _hover={{}}
                padding={1.5}
                icon={<Swap02Icon />}
              />
            </Center>

            <Box
              zIndex="dropdown"
              pointerEvents={isOpen ? undefined : 'none'}
              opacity={isOpen ? undefined : 0}
              transitionDuration="ultra-slow"
              position="absolute"
              transform="translateY(100%)"
              bg="white"
              border="0.0625rem solid"
              borderColor="shader.a.300"
              bottom="-10%"
              borderRadius="xl"
              right={0}
              left={0}
            >
              {allAccount
                .filter(item => item.address !== account)
                .map(item => (
                  <Box
                    key={item.address}
                    onClick={() => {
                      onClose();
                      setAccount(prev => ({
                        ...prev,
                        account: item.address,
                      }));
                    }}
                  >
                    <ConnectWalletProfile
                      address={item.address}
                      name={item.name}
                      sx={{
                        _hover: {
                          bg: 'shader.a.200',
                        },
                        sx: {
                          button: {
                            display: 'none',
                          },
                        },
                      }}
                    />
                  </Box>
                ))}
            </Box>
          </MenuItem>

          {balance ? (
            <MenuItem
              bg="transparent"
              textAlign="center"
              mt={8}
              flexDirection="column"
            >
              <Icon as={GafiTokenIcon as any} width={8} height={8} />

              <Box mt={4}>
                <GafiAmount
                  amount={balance}
                  sx={{
                    sx: {
                      fontSize: '2xl',
                      span: {
                        fontSize: 'sm',
                      },
                    },
                  }}
                />

                <Text fontSize="sm" color="shader.a.500">
                  {Intl.NumberFormat(undefined, {
                    style: 'currency',
                    currencyDisplay: 'narrowSymbol',
                    currency: 'usd',
                  })
                    .format(Number(balance.replaceAll(',', '')))
                    .toString()}
                </Text>
              </Box>
            </MenuItem>
          ) : null}

          <MenuItem as="div" padding={0} mt={4}>
            <Button
              bg="primary.a.500"
              color="white"
              width="full"
              borderRadius="lg"
              isLoading={isLoading}
              onClick={() => {
                if (api) {
                  mutation(api.tx.faucet.faucet());
                }
              }}
              _hover={{}}
            >
              Faucet
            </Button>
          </MenuItem>
        </MenuList>
      ) : null}
    </Menu>
  );
}
