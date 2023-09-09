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
  Icon,
  IconButton,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import GafiTokenIcon from 'public/assets/token/gafi-token.svg';

import Swap02Icon from 'public/assets/line/swap-02.svg';
import useSignAndSend from 'hooks/useSignAndSend';
import ConnectWalletProfile from './ConnectWalletProfile';
import useBalance from 'hooks/useBalance';
import GafiAmount from 'components/GafiAmount';
import ConnectWalletSwitch from './ConnectWalletSwitch';
import ConnectWalletLogOut from './ConnectWalletLogOut';
import { useAppSelector } from 'hooks/useRedux';

import { formatCurrency } from 'utils/utils';

import ConnectSubstrate from 'components/ConnectSubstrate';
import AvatarJazzicon from 'components/Avatar/AvatarJazzicon';
export default function ConnectWallet() {
  const { api } = useAppSelector(state => state.substrate);

  const { account, allAccount } = useAppSelector(
    state => state.injected.polkadot
  );

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
          <AvatarJazzicon address={account.address} />
        </Button>
      ) : (
        <ConnectSubstrate />
      )}

      {account && account.address && account.name && allAccount ? (
        <Drawer isOpen={isOpen} onClose={onClose} size="sm">
          <DrawerOverlay />

          <DrawerContent height="fit-content" borderRadius="2xl" margin={6}>
            <DrawerBody padding={6} overflow="unset">
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

                            span: { fontSize: 'sm' },
                          },
                        }}
                      />

                      <Text fontSize="sm" color="shader.a.500">
                        {formatCurrency(Number(balance.replaceAll(',', '')))}
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
