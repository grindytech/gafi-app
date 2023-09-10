import {
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import GafiTokenIcon from 'public/assets/token/gafi-token.svg';

import useSignAndSend from 'hooks/useSignAndSend';

import useBalance from 'hooks/useBalance';

import ConnectWalletSwitch from './ConnectWalletSwitch';
import { useAppSelector } from 'hooks/useRedux';

import { convertHex, formatCurrency, shorten } from 'utils/utils';

import ConnectSubstrate from 'components/ConnectSubstrate';
import AvatarJazzicon from 'components/Avatar/AvatarJazzicon';
import ButtonCopy from 'components/ButtonCopy';
import { colors } from 'theme/theme';
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

  return (
    <>
      {account && account.address ? (
        <Button onClick={onToggle} variant="unstyled">
          <AvatarJazzicon address={account.address} />
        </Button>
      ) : (
        <ConnectSubstrate />
      )}

      {account?.address && account?.name && allAccount ? (
        <Drawer isOpen={isOpen} onClose={onClose} size="xs">
          <DrawerOverlay />

          <DrawerContent
            border="0.0625rem solid "
            borderColor="shader.a.800"
            bg="shader.a.900"
            height="fit-content"
            borderRadius="2xl"
            margin={6}
          >
            <DrawerBody
              padding={0}
              sx={{
                '> div': {
                  padding: 6,
                },
              }}
              overflow="unset"
            >
              <Box position="relative">
                <Center
                  justifyContent="space-between"
                  borderRadius="xl"
                  border="0.0625rem solid"
                  borderColor="shader.a.800"
                  bg={convertHex(colors.shader.a[800], 0.25)}
                  px={4}
                  py={2}
                  gap={3}
                >
                  <Flex gap={3}>
                    <Box>
                      <AvatarJazzicon
                        address={account.address}
                        sx={{ width: '2.25rem', height: '2.25rem' }}
                      />
                    </Box>

                    <Box>
                      <Text mb={0.5} color="white" fontWeight="medium">
                        {account?.name || 'unknown'}
                      </Text>

                      <Text
                        gap={2}
                        display="flex"
                        color="shader.a.500"
                        fontSize="sm"
                      >
                        {shorten(account.address, 6)}

                        <ButtonCopy
                          value={account.address}
                          sx={{
                            'aria-label': 'copy-icon',

                            sx: { svg: { width: 4, height: 4 } },
                          }}
                        />
                      </Text>
                    </Box>
                  </Flex>

                  <ConnectWalletSwitch
                    accounts={allAccount.filter(
                      meta => meta.address !== account.address
                    )}
                  />
                </Center>
              </Box>

              {balance ? (
                <Box bg="transparent" textAlign="center" py={10}>
                  <Icon as={GafiTokenIcon} width={8} height={8} />

                  <Box mt={2}>
                    <Text
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      color="white"
                      fontSize="2xl"
                      fontWeight="bold"
                    >
                      {balance}&nbsp;
                      <Text
                        as="span"
                        color="primary.a.400"
                        fontWeight="normal"
                        fontSize="sm"
                      >
                        GAFI
                      </Text>
                    </Text>

                    <Text fontSize="sm" color="shader.a.500">
                      {formatCurrency(Number(balance.replaceAll(',', '')))}
                    </Text>
                  </Box>
                </Box>
              ) : null}

              <Box>
                <Button
                  width="full"
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
              </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      ) : null}
    </>
  );
}
