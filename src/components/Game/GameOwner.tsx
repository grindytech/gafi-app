import React from 'react';

import { FieldValues, UseFormSetValue } from 'react-hook-form';

import useAccount from 'hooks/useAccount';
import CardBox from 'components/CardBox';
import { Box, BoxProps, Divider, Flex, Heading, Text } from '@chakra-ui/react';
import AccountJazzicon from 'components/AccountJazzicon/AccountJazzicon';
import ButtonCopy from 'components/ButtonCopy';
import { shorten } from 'utils/utils';
import Balance from 'components/Balance/Balance';

interface GameOwnerProps {
  setValue: UseFormSetValue<FieldValues>;
  type: 'Owner' | 'Admin';
  sx?: BoxProps;
}

export default function GameOwner({ setValue, type, sx }: GameOwnerProps) {
  const { getAccount } = useAccount();

  React.useEffect(() => {
    if (getAccount) {
      setValue('owner', {
        address: getAccount.address,
        name: getAccount.name,
      });
    }
  }, [getAccount]);

  return (
    <>
      {getAccount && (
        <CardBox variant="createGames" padding={6} {...sx}>
          <Box>
            <Heading variant="switch">{type}</Heading>

            <Flex
              mt={4}
              flexWrap="wrap"
              gap={{
                base: 2,
                md: 4,
              }}
            >
              <AccountJazzicon address={getAccount.address} />

              <Box>
                <Heading
                  className="account-name"
                  fontSize="md"
                  fontWeight="semibold"
                  color="shader.a.900"
                >
                  {getAccount.name}
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
                  {shorten(getAccount.address, 12)}
                  <ButtonCopy value={getAccount.address} />
                </Text>
              </Box>
            </Flex>
          </Box>

          <Divider borderColor="shader.a.300" my={4} />

          <Balance />
        </CardBox>
      )}
    </>
  );
}
