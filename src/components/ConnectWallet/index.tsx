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
} from '@chakra-ui/react';
import AccountJazzicon from 'components/AccountJazzicon/AccountJazzicon';

import GafiTokenIcon from 'public/assets/token/gafi-token.svg';

import Swap02Icon from 'public/assets/line/swap-02.svg';
import NFTIcon from 'public/assets/line/nfts.svg';
import ChartIcon from 'public/assets/line/chart-02.svg';
import CartIcon from 'public/assets/line/cart-02.svg';
import LoveIcon from 'public/assets/line/heart.svg';
import SettingIcon from 'public/assets/line/setting.svg';
import useSignAndSend from 'hooks/useSignAndSend';
import ConnectWalletProfile from './ConnectWalletProfile';
import useBalance from 'hooks/useBalance';
import GafiAmount from 'components/GafiAmount';
import ConnectWalletSwitch from './ConnectWalletSwitch';
import ConnectWalletLogOut from './ConnectWalletLogOut';
import { useAppSelector } from 'hooks/useRedux';
import { Link } from 'react-router-dom';
import { formatCurrency } from 'utils/utils';
import React from 'react';
import ConnectSubstrate from 'components/ConnectSubstrate';

export default function ConnectWallet() {
  const { api } = useAppSelector(state => state.substrate);

  const { account, allAccount } = useAppSelector(
    state => state.injected.polkadot
  );

  const ListProfileData = [
    {
      icon: NFTIcon,
      title: 'My Profile',
      link: `/account/${account?.address}`,
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

  const { isLoading, mutation } = useSignAndSend({
    address: account?.address as string,
    key: ['faucet'],
  });

  const { balance } = useBalance({
    account: account?.address as string,
  });

  const { isOpen, onClose, onToggle } = useDisclosure();
  const {
    isOpen: isOpenSwitch,
    onClose: onCloseSwitch,
    onToggle: onToggleSwitch,
  } = useDisclosure();

  return (
    <>
      {account && account.address ? (
        <Button onClick={onToggle} variant="unstyled">
          <AccountJazzicon address={account.address} />
        </Button>
      ) : (
        <ConnectSubstrate />
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
                          {formatCurrency(
                            Number(balance.replaceAll(',', '')),
                            'usd'
                          )}
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
                <Flex gap={6} flexDirection="column">
                  {React.Children.toArray(
                    ListProfileData.map(item => (
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
                    ))
                  )}
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
