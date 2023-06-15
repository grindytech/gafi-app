import { Box, Center, Divider, Heading } from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import GafiAmount from 'components/GafiAmount';
import NewGamesProfile from 'layouts/NewGames/components/NewGamesProfile';
import React from 'react';

interface OwnerProfileProps {
  account: string;
  hash: string;
  balance: number | string;
}

export default function OwnerProfile({
  account,
  hash,
  balance,
}: OwnerProfileProps) {
  return (
    <CardBox variant="createGames" padding={6}>
      <Box>
        <Heading
          as="h3"
          color="primary.a.500"
          fontSize="sm"
          fontWeight="semibold"
          mb={4}
        >
          Owner
        </Heading>

        <NewGamesProfile account={account} hash={hash} />
      </Box>

      <Divider borderColor="shader.a.300" my={4} />

      <Center justifyContent="space-between">
        <Heading as="h6">Balance</Heading>

        <GafiAmount amount={balance} sx={{ fontSize: 'xl' }} />
      </Center>
    </CardBox>
  );
}
