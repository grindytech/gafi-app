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

interface GameOwnerProps {
  sx?: BoxProps;
}

export default function GameOwner({ sx }: GameOwnerProps) {
  const { account } = useAppSelector(state => state.injected.polkadot);

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
                  className="account-name"
                  fontSize="md"
                  fontWeight="semibold"
                  color="shader.a.900"
                >
                  {account.name}
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
