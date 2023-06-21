import React from 'react';

import CardBox from 'components/CardBox';
import {
  Box,
  BoxProps,
  Divider,
  Flex,
  Heading,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react';
import AccountJazzicon from 'components/AccountJazzicon/AccountJazzicon';
import ButtonCopy from 'components/ButtonCopy';
import { shorten } from 'utils/utils';
import Balance from 'components/Balance/Balance';
import { useConnectWallet } from 'components/ConnectWallet/ConnectWalletProvider';

interface GameOwnerProps {
  sx?: BoxProps;
}

export default function GameOwner({ sx }: GameOwnerProps) {
  const { account, allAccount } = useConnectWallet();
  const [currentAccount, setCurrentAccount] = React.useState<{
    address?: string;
    name?: string;
  }>({});

  React.useEffect(() => {
    if (account && allAccount) {
      const [{ address, name }] = allAccount.filter(item => {
        return item.address === account;
      });

      setCurrentAccount({ address, name });
    }
  }, [account, allAccount]);

  return (
    <>
      {currentAccount.address && currentAccount.name ? (
        <CardBox variant="createGames" {...sx}>
          <Box>
            <Heading variant="switch">Owner</Heading>

            <Flex
              mt={4}
              flexWrap="wrap"
              gap={{
                base: 2,
                md: 4,
              }}
            >
              <AccountJazzicon address={currentAccount.address} />

              <Box>
                <Heading
                  className="account-name"
                  fontSize="md"
                  fontWeight="semibold"
                  color="shader.a.900"
                >
                  {currentAccount.name}
                </Heading>

                <Text
                  className="account-hash"
                  fontSize="sm"
                  fontWeight="medium"
                  color="shader.a.600"
                  gap={1}
                  display="flex"
                  alignItems={{
                    base: 'flex-start',
                    sm: 'center',
                  }}
                >
                  {shorten(currentAccount.address, 12)}
                  <ButtonCopy value={currentAccount.address} />
                </Text>
              </Box>
            </Flex>
          </Box>

          <Divider borderColor="shader.a.300" my={4} />

          <Balance currentAccount={currentAccount.address} />
        </CardBox>
      ) : (
        <CardBox variant="createGames" as={Stack}>
          <Skeleton height={4} />
          <Skeleton height={4} />
          <Skeleton height={4} />
        </CardBox>
      )}
    </>
  );
}
