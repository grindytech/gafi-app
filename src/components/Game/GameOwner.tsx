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
import { useAppSelector } from 'hooks/useRedux';
import React from 'react';
import { UseFormSetValue } from 'react-hook-form';

export type TypeGameOwner = {
  owner: {
    address: string;
    name: string;
  };
};

interface GameOwnerProps {
  sx?: BoxProps;
  setValue: UseFormSetValue<TypeGameOwner>;
}

export default function GameOwner({ setValue, sx }: GameOwnerProps) {
  const { account } = useAppSelector(state => state.injected.polkadot);

  React.useEffect(() => {
    if (account && account.address && account.name) {
      setValue('owner', {
        address: account.address,
        name: account.name,
      });
    }
  }, [account]);

  return (
    <>
      <CardBox variant="createGames" {...sx}>
        <Heading variant="switch" mb={4}>
          Owner
        </Heading>

        {account && account.address ? (
          <>
            <Flex
              flexWrap="wrap"
              gap={{
                base: 2,
                md: 4,
              }}
            >
              <AccountJazzicon address={account.address} />

              <Box>
                <Heading
                  fontSize="md"
                  fontWeight="semibold"
                  color="shader.a.900"
                >
                  {account.name}
                </Heading>

                <Text
                  wordBreak="break-all"
                  fontSize="sm"
                  color="shader.a.600"
                  gap={1}
                  display="flex"
                  alignItems={{
                    base: 'flex-start',
                    sm: 'center',
                  }}
                >
                  {shorten(account.address, 12)}
                  <ButtonCopy value={account.address} />
                </Text>
              </Box>
            </Flex>

            <Divider borderColor="shader.a.300" my={4} />

            <Balance currentAccount={account.address} />
          </>
        ) : (
          <Stack>
            <Skeleton height={4} />
            <Skeleton height={4} />
            <Skeleton height={4} />
          </Stack>
        )}
      </CardBox>
    </>
  );
}
