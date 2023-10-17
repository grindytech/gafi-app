import {
  Box,
  Button,
  Center,
  Flex,
  Icon,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react';
import AvatarJazzicon from 'components/Avatar/AvatarJazzicon';
import Clipboard from 'components/Clipboard';
import { colors } from 'theme/theme';
import { InjectedAccount } from 'types/polkadot.type';
import { convertHex, formatCurrency, shorten } from 'utils';
import ConnectWalletSwitch from './ConnectWalletSwitch';
import GafiTokenIcon from 'public/assets/token/gafi-token.svg';
import useBalance from 'hooks/useBalance';
import { useSubstrateContext } from 'contexts/contexts.substrate';
import useSignAndSend from 'hooks/useSignAndSend';

interface ConnectWalletProfileProps {
  account: InjectedAccount;
  accounts: InjectedAccount[];
}

export default ({ account, accounts }: ConnectWalletProfileProps) => {
  const { api } = useSubstrateContext();

  const { mutation, isLoading } = useSignAndSend({
    key: ['faucet', account.address],
    address: account.address,
  });

  const { balance } = useBalance({
    account: account.address,
  });

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Button variant="unstyled">
          <AvatarJazzicon value={account.address} />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        border="0.0625rem solid"
        borderColor="shader.a.800"
        bg="shader.a.900"
        borderRadius="2xl"
      >
        <PopoverBody padding={4}>
          <Center
            px={4}
            py={3}
            borderRadius="xl"
            bg={convertHex(colors.shader.a[800], 0.25)}
            border="0.0625rem solid"
            borderColor="shader.a.800"
            justifyContent="space-between"
          >
            <Flex gap={3}>
              <AvatarJazzicon value={account.address} />

              <Box fontSize="sm">
                <Text color="white" fontWeight="medium">
                  {account.name}
                </Text>

                <Flex gap={2}>
                  <Text as="span" color="shader.a.300">
                    {shorten(account.address)}
                  </Text>

                  <Clipboard value={account.address} />
                </Flex>
              </Box>
            </Flex>

            <ConnectWalletSwitch accounts={accounts} />
          </Center>

          <Center flexDirection="column" textAlign="center" mt={8} gap={4}>
            <Icon as={GafiTokenIcon} width={8} height={8} />

            <Box>
              <Text as={Center} fontSize="2xl" fontWeight="bold" color="white">
                {balance}&nbsp;
                <Text
                  as="span"
                  fontSize="sm"
                  color="primary.a.400"
                  fontWeight="normal"
                >
                  GAFI
                </Text>
              </Text>

              <Text mt={1} fontSize="sm" color="shader.a.500">
                ({formatCurrency(Number(balance?.replaceAll(',', '')))})
              </Text>
            </Box>
          </Center>

          <Button
            mt={4}
            variant="primary"
            width="full"
            isLoading={isLoading}
            onClick={() => {
              if (api) {
                mutation(api.tx.faucet.faucet());
              }
            }}
          >
            Paucet
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
