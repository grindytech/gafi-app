import {
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Flex,
  HStack,
  Icon,
  IconButton,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import AccountJazzicon from 'components/AccountJazzicon/AccountJazzicon';

import GafiTokenIcon from 'public/assets/token/gafi-token.svg';

import Swap02Icon from 'public/assets/line/swap-02.svg';
import NFTIcon from 'public/assets/line/nfts.svg';
import ChartIcon from 'public/assets/line/chart-02.svg';
import CartIcon from 'public/assets/line/cart-02.svg';
import LoveIcon from 'public/assets/line/heart.svg';
import SettingIcon from 'public/assets/line/setting.svg';

import { GAFI_WALLET_ACCOUNT_KEY } from 'utils/constants';

import useSignAndSend from 'hooks/useSignAndSend';
import ConnectWalletProfile from './ConnectWalletProfile';
import useBalance from 'hooks/useBalance';
import GafiAmount from 'components/GafiAmount';
import ConnectWalletSwitch from './ConnectWalletSwitch';
import ConnectWalletLogOut from './ConnectWalletLogOut';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { injectedAccount } from 'redux/injected';
import useForceMount from 'hooks/useForceMount';
import { Link } from 'react-router-dom';

export const ListProfileData = [
  {
    icon: NFTIcon,
    title: 'My NFTs',
    link: '/account',
  },
  {
    icon: ChartIcon,
    title: 'Activity',
    link: '#',
  },
  {
    icon: CartIcon,
    title: 'My Cart',
    link: '#',
  },
  {
    icon: LoveIcon,
    title: 'Favourited',
    link: '#',
  },
  {
    icon: SettingIcon,
    title: 'Settings',
    link: '#',
  },
];
export default function ConnectWallet() {
  const { api } = useAppSelector(state => state.substrate);
  const { setMounting, mounting } = useForceMount();

  const { account, allAccount } = useAppSelector(
    state => state.injected.polkadot
  );

  const dispatch = useAppDispatch();

  const { isLoading, mutation } = useSignAndSend({
    address: account?.address as string,
    key: ['faucet'],
    onSuccess() {
      setMounting();
    },
  });

  const { balance } = useBalance({
    account: account?.address as string,
    refetch: mounting,
  });

  const toast = useToast();
  const { isOpen, onClose, onToggle } = useDisclosure();
  const {
    isOpen: isOpenSwitch,
    onClose: onCloseSwitch,
    onToggle: onToggleSwitch,
  } = useDisclosure();

  return (
    <>
      {/* <Menu closeOnSelect={false} onClose={onClose} placement="bottom-end"> */}
      {account && account.address ? (
        <Button onClick={onToggle} variant="unstyled">
          <AccountJazzicon address={account.address} />
        </Button>
      ) : (
        <Button
          variant="baseStyle"
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
        </Button>
      )}

      {account && account.address && account.name && allAccount ? (
        <Drawer isOpen={isOpen} onClose={onClose} size="sm">
          <DrawerOverlay />
          <DrawerContent
            my={{ lg: 6, base: 0 }}
            borderRadius={{ lg: '2xl', base: 0 }}
            mr={{ lg: 3, base: 0 }}
          >
            <DrawerBody padding={0}>
              <Box padding={6}>
                <Flex
                  flexDirection="column"
                  padding={4}
                  borderRadius="xl"
                  border="0.063rem solid "
                  borderColor="shader.a.400"
                >
                  <Box position="relative">
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
                        onClick={onToggleSwitch}
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
                      isOpen={isOpenSwitch}
                      onClose={onCloseSwitch}
                      accounts={allAccount.filter(
                        item => item.address !== account.address
                      )}
                    >
                      <ConnectWalletLogOut
                        onClose={() => {
                          onClose();
                          onCloseSwitch();
                        }}
                      />
                    </ConnectWalletSwitch>
                  </Box>

                  {balance ? (
                    <Box
                      bg="transparent"
                      textAlign="center"
                      flexDirection="column"
                      pt={10}
                      mb={6}
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
                    </Box>
                  ) : null}

                  <Button
                    variant="primary"
                    isLoading={isLoading}
                    onClick={() => {
                      if (api) {
                        mutation(api.tx.faucet.faucet());
                      }
                    }}
                  >
                    Faucet
                  </Button>
                </Flex>
              </Box>
              <Box
                padding={6}
                borderTop="0.063rem solid"
                borderTopColor="shader.a.200"
              >
                <Text color="shader.a.400">My profile</Text>
                <Flex gap={6} flexDirection="column" mt={6}>
                  {ListProfileData.map(item => (
                    <>
                      <Link to={item.link} onClick={onClose}>
                        <HStack
                          cursor="pointer"
                          gap={3}
                          color="shader.a.500"
                          _hover={{
                            color: 'shader.a.900',
                          }}
                        >
                          <Icon as={item.icon} height={6} width={6} />
                          <Text fontSize="lg" fontWeight="medium">
                            {item.title}
                          </Text>
                        </HStack>
                      </Link>
                    </>
                  ))}
                </Flex>
              </Box>
            </DrawerBody>

            <DrawerFooter>
              <Button
                variant="baseStyle"
                width="full"
                onClick={onClose}
                _hover={{
                  borderColor: 'shader.a.900',
                }}
              >
                Close
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : null}
    </>
  );
}
