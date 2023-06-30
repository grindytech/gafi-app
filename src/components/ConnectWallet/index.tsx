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

import Swap02Icon from 'public/assets/line/swap-02.svg';
import { GAFI_WALLET_ACCOUNT_KEY } from 'utils/constants';

import useSignAndSend from 'hooks/useSignAndSend';
import ConnectWalletProfile from './ConnectWalletProfile';
import useBalance from 'hooks/useBalance';
import GafiAmount from 'components/GafiAmount';
import ConnectWalletSwitch from './ConnectWalletSwitch';
import ConnectWalletLogOut from './ConnectWalletLogOut';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { injectedAccount } from 'redux/injected';

export default function ConnectWallet() {
  const { api } = useAppSelector(state => state.substrate);

  const { account, allAccount } = useAppSelector(
    state => state.injected.polkadot
  );

  const dispatch = useAppDispatch();

  const { isLoading, mutation } = useSignAndSend({
    address: account?.address as string,
    key: ['faucet'],
  });

  const { balance } = useBalance({
    account: account?.address as string,
  });

  const toast = useToast();
  const { isOpen, onClose, onToggle } = useDisclosure();

  return (
    <>
      <Menu closeOnSelect={false} onClose={onClose} placement="bottom-end">
        {account && account.address ? (
          <MenuButton>
            <AccountJazzicon address={account.address} />
          </MenuButton>
        ) : (
          <MenuButton
            onClick={() => {
              if (allAccount && allAccount.length) {
                const { address, name } = allAccount[0];

                localStorage.setItem(
                  GAFI_WALLET_ACCOUNT_KEY,
                  JSON.stringify({ address, name })
                );

                return dispatch(
                  injectedAccount({
                    polkadot: {
                      account: { address, name },
                    },
                  })
                );
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

        {account && account.address && account.name && allAccount ? (
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
                <ConnectWalletProfile
                  address={account.address}
                  name={account.name}
                  sx={{ padding: 0 }}
                />

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

              <ConnectWalletSwitch
                isOpen={isOpen}
                onClose={onClose}
                accounts={allAccount.filter(
                  item => item.address !== account.address
                )}
              >
                <ConnectWalletLogOut onClose={onClose} />
              </ConnectWalletSwitch>
            </MenuItem>

            {balance ? (
              <MenuItem
                bg="transparent"
                textAlign="center"
                mt={8}
                flexDirection="column"
              >
                <Icon as={GafiTokenIcon} width={8} height={8} />

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
    </>
  );
}
